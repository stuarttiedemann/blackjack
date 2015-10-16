var playerWins = 0;
var dealerWins = 0;
var deck = [];
var placeInDeck=0;
var playerTotalCards=2;
var dealerTotalCards=2;
var playerHand;
var dealerHand;
function shuffleDeck(){
	//fill our deck in order(for now) &  creat suit and card #
	var suit = "";
	for(s=1; s <= 4; s++){
		if(s === 1){
			suit = "h";
		}else if(s === 2){
			suit = "s";
		}else if(s === 3){
			suit = "d";
		}else if(s === 4){
			suit = "c";
		}
		for(i=1; i <= 13; i++){
			deck.push(i+suit)
		}
	}
	var numberOfTimesToShuffle = Math.floor(Math.random() * 500 + 500);
	for(i=0; i<numberOfTimesToShuffle; i++){
		//pick 2 random cards from the deck and switch them.
		var card1 = Math.floor(Math.random()*52);
		var card2 = Math.floor(Math.random()*52);
		var temp = deck[card2];
		deck[card2] = deck[card1];
		deck[card1] = temp;
	}
	return(deck);
}
function calculateTotal(hand, who){
	var total = 0;
	for(i=0; i<hand.length; i++){
		var cardValue = Number(hand[i].slice(0, -1));
		if(Number(cardValue)>10){
			total = total+10;
		}else{
		total = total + Number(cardValue);
	}		
}
	var idWhoToGet = who + '-total';
	document.getElementById(idWhoToGet).innerHTML = total;
	//check for bust
	if(total > 21){
		bust(who);
	}
	return total;
}
function placeCard(card, who, slot){
	var suit = card.slice(-1)[0];
	var highCard = Number(card.slice(0,-1));
	if(highCard===13){
		if(suit==="h"){
			suit=("<img src='hearts.png' height='100px' width='100px' border=0/>")
		}else if(suit==="c"){
			suit=("<img src='club.png' height='100px' width='100px' border=0/>")
		}else if(suit==="d"){
			suit=("<img src='diamond.png' height='100px' width='100px' border=0/>")
		}else if(suit==="s"){
			suit=("<img src='spade.png' height='100px' width='100px' border=0/>")
		}
		highCard=("K"+ suit);
		// highCard=("<img src='spade.png' border=0/>")
		card = highCard;
	}else if(highCard===12){
		if(suit==="h"){
			suit=("<img src='hearts.png' height='100px' width='100px' border=0/>")
		}else if(suit==="c"){
			suit=("<img src='club.png' height='100px' width='100px' border=0/>")
		}else if(suit==="d"){
			suit=("<img src='diamond.png' height='100px' width='100px' border=0/>")
		}else if(suit==="s"){
			suit=("<img src='spade.png' height='100px' width='100px' border=0/>")
		}
		highCard=("K"+ suit);
		// highCard=("<img src='spade.png' border=0/>")
		card = highCard;
	}else if(highCard===11){
		if(suit==="h"){
			suit=("<img src='hearts.png' height='100px' width='100px' border=0/>")
		}else if(suit==="c"){
			suit=("<img src='club.png' height='100px' width='100px' border=0/>")
		}else if(suit==="d"){
			suit=("<img src='diamond.png' height='100px' width='100px'border=0/>")
		}else if(suit==="s"){
			suit=("<img src='spade.png' height='100px' width='100px' border=0/>")
		}
		highCard=("K"+ suit);
		// highCard=("<img src='spade.png' border=0/>")
		card = highCard;
	}else{
		highCard=highCard;
		card = highCard;
	}
	// card = highCard;
	var currId = who +'-card-'+slot;
	document.getElementById(currId).className = "card";
	document.getElementById(currId).innerHTML = card;
}
function deal(){
	reset();
	//Shuffled deck from function shuffleDeck
	deck = shuffleDeck();
	playerHand = [ deck[0], deck[2] ];
	dealerHand = [ deck[1], deck[3] ];
	placeInDeck = 4;
	placeCard(playerHand[0], 'player', 'one');
	placeCard(dealerHand[0], 'dealer', 'one');
	placeCard(playerHand[1], 'player', 'two');
	placeCard(dealerHand[1], 'dealer', 'two');
	calculateTotal(playerHand, 'player');
	calculateTotal(dealerHand, 'dealer');
}
function hit(){
	var slot;
	if(playerTotalCards === 2){ slot = "three";}
	else if(playerTotalCards === 3){ slot = "four";}
	else if(playerTotalCards === 4){ slot = "five";}
	else if(playerTotalCards === 5){ slot = "six";}
	placeCard(deck[placeInDeck],'player',slot);
	playerHand.push(deck[placeInDeck]);
	playerTotalCards++;
	placeInDeck++;
	calculateTotal(playerHand, 'player');
}
function reset(){
	deck = [];
	placeInDeck=0;
	playerTotalCards=2;
	dealerTotalCards=2;
	playerHand =[];
	dealerHand=[];
	document.getElementById("hit-button").disabled=false;
	document.getElementById("stand-button").disabled=false;	
	document.getElementById("message").innerHTML = " ";
	var cards = document.getElementsByClassName("card");
	for(i=0; i<cards.length; i++){
		cards[i].innerHTML = "-";
		cards[i].className = "card empty";
	}
}
function stand(){
	var dealerHas = Number(document.getElementById('dealer-total').innerHTML);
	var slot;
	while(dealerHas < 17){
		//keep hitting ... keep drawing ... get more cards
		if(dealerTotalCards === 2){ slot = "three";}
		else if(dealerTotalCards === 3){ slot = "four";}
		else if(dealerTotalCards === 4){ slot = "five";}
		else if(dealerTotalCards === 5){ slot = "six";}
		placeCard(deck[placeInDeck], 'dealer', slot);
		dealerHand.push(deck[placeInDeck]);
		dealerHas = calculateTotal(dealerHand, 'dealer');
		placeInDeck++;
		dealerTotalCards++;
	}
	//WE KNOW the dealer has more than 17
	checkWin(Number(document.getElementById('dealer-total').innerHTML),Number(document.getElementById('player-total').innerHTML));
}
function checkWin(dealerScore,playerScore){
	if((dealerScore>=playerScore) && (dealerScore< 22) && (playerScore<22)){
		document.getElementById("message").innerHTML = "Dealer Wins!";
		dealerWins++;
		console.log("Value of dealerWins is: " +dealerWins);
		document.getElementById("dealer-win-count").innerHTML = dealerWins;
	}else if((playerScore>dealerScore) && (dealerScore<22) && (playerScore<22)){
		document.getElementById("message").innerHTML = "Player Wins!";	
		playerWins++;
		console.log("Value of playerWins is: " +playerWins);
		document.getElementById("player-win-count").innerHTML = playerWins;
	}
}
function bust(who){
	if(who==="player"){
		document.getElementById("message").innerHTML = "You have busted! The Dealer Wins";
		document.getElementById("hit-button").disabled=true;
		dealerWins++;
		console.log("Value of dealerWins is: " +dealerWins);
		document.getElementById("dealer-win-count").innerHTML = dealerWins;

	}else{
		document.getElementById("message").innerHTML = "Dealer busted! Player Wins!";
		document.getElementById("stand-button").disabled=true;
		playerWins++;
		console.log("Value of playerWins is: " +playerWins);
		document.getElementById("player-win-count").innerHTML = playerWins;
	}
}	














