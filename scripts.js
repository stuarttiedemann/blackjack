var playerWins = 0;
var dealerWins = 0;
var deck = [];
var placeInDeck=0;
var playerTotalCards=2;
var dealerTotalCards=2;
var playerHand;
var dealerHand;
var betIncrementer = 0;
var dollarsWon=0;
var dealerDollarsWon = 0;
var playerDollarsWon = 0;


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
function decrementWager(){
	if(betIncrementer > 0){
	betIncrementer--;
	}else{
		alert("You can't place a negative bet!");
	}
	$("#dollars-bet-count").html(betIncrementer);
}
function incrementWager(){
	betIncrementer++;
	$("#dollars-bet-count").html(betIncrementer);
	$("#decrement-bet").prop('disabled',false);
	
}
function placeBet(){
	if(betIncrementer > 0){
	$("#decrement-bet").prop('disabled', true);
	$("#increment-bet").prop('disabled', true);
	$("#draw-button").prop('disabled',false);
	
	dollarsWon = betIncrementer;
	console.log("the dollars won is: "+dollarsWon);
	}else{
		alert("You must place a bet greater than $0 before you can play!");
	}
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
	$("#"+idWhoToGet).html(total);
	
	//check for bust
	if(total > 21){
		bust(who);
	}
	return total;
}
function placeCard(card, who, slot){
	var suit = card.slice(-1)[0];
	var highCard = Number(card.slice(0,-1));	
		if(suit==="h"){
				suit=("<img src='hearts.png' height='100px' width='100px' border=0/>")
					if(highCard===13){
						highCard=("K"+suit);
						card=highCard;
					}else if(highCard===12){
						highCard=("Q"+suit);
						card=highCard;
					}else if(highCard===11){
						highCard=("J"+suit);
						card=highCard;
					}else{
						card=highCard+suit;
					}
			}else if(suit==="c"){
				suit=("<img src='club.png' height='100px' width='100px' border=0/>")
				if(highCard===13){
						highCard=("K"+suit);
						card=highCard;
					}else if(highCard===12){
						highCard=("Q"+suit);
						card=highCard;
					}else if(highCard===11){
						highCard=("J"+suit);
						card=highCard;
					}else{
						card=highCard+suit;
					}
			}else if(suit==="d"){
				suit=("<img src='club.png' height='100px' width='100px' border=0/>")
				if(highCard===13){
						highCard=("K"+suit);
						card=highCard;
					}else if(highCard===12){
						highCard=("Q"+suit);
						card=highCard;
					}else if(highCard===11){
						highCard=("J"+suit);
						card=highCard;
					}else{
						card=highCard+suit;
					}
			}else{
				suit=("<img src='spade.png' height='100px' width='100px' border=0/>")
				if(highCard===13){
						highCard=("K"+suit);
						card=highCard;
					}else if(highCard===12){
						highCard=("Q"+suit);
						card=highCard;
					}else if(highCard===11){
						highCard=("J"+suit);
						card=highCard;
					}else{
						card=highCard+suit;
					}
			}			
	var currId = '#'+ who +'-card-'+slot;
	$(currId).removeClass('empty');
	$(currId).html(card);
}
function deal(){
	deck = shuffleDeck();
	playerHand = [ deck[0], deck[2] ];
	dealerHand = [ deck[1], deck[3] ];
	placeInDeck = 4;
	placeCard(playerHand[0], 'player', 'one');
	placeCard(dealerHand[0], 'dealer', 'one');
	placeCard(playerHand[1], 'player', 'two');
	
	calculateTotal(playerHand, 'player');
	calculateTotal(dealerHand, 'dealer');
	$("#hit-button").prop('disabled',false);
	
	$("#stand-button").prop('disabled',false);
	
	$("#place-bet").prop('disabled',true);
	
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
	betIncrementer = 0;
	dollarsWon = 0;
	$("#decrement-bet").prop('disabled',false);	
	$("#increment-bet").prop('disabled',false);	
	$("#place-bet").prop('disabled',false);		
	$("#message").html(" ");
	$("#dollars-bet-count").html("0");
	$("#dealer-total").html("0");
	$("#player-total").html("0");
	
	var cards = $(".card");
	for(i=0; i<cards.length; i++){
		cards[i].innerHTML = "-";
		cards[i].className = "card empty";
	}
}
function stand(){
	placeCard(dealerHand[1], 'dealer', 'two');
	var dealerHas = $('#dealer-total').html();
	console.log("var dealerHas "+dealerHas);
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
	checkWin(Number($('#dealer-total').html),Number($('#player-total').html));
}
function checkWin(dealerScore,playerScore){
	if((dealerScore>=playerScore) && (dealerScore< 22) && (playerScore<22)){
		dealerWins++;
		dealerDollarsWon = dollarsWon+dealerDollarsWon;
		$("#message").html("Dealer Wins!");	
		$("#dealer-win-count").html(dealerWins);
		$("#dealer-dollar-win-count").html(dealerDollarsWon);
		$("#draw-button").prop('disabled',true);
		$("#hit-button").prop('disabled',true);
		$("#stand-button").prop('disabled',true);
	}else if((playerScore>dealerScore) && (dealerScore<22) && (playerScore<22)){
		playerDollarsWon = dollarsWon+playerDollarsWon;
		playerWins++;
		$("#message").html("Player Wins!");	
		$("#player-win-count").html(playerWins);	
		$("#player-dollar-win-count").html(playerDollarsWon);
		$("#draw-button").prop('disabled',true);
		$("#hit-button").prop('disabled',true);
		$("#stand-button").prop('disabled',true);
	}
}
function bust(who){
	if(who==="player"){
		dealerDollarsWon = dollarsWon+dealerDollarsWon;
		dealerWins++;
		$("#message").html("You have busted! The Dealer Wins");	
		$("#dealer-win-count").html(dealerWins);
		$("#dealer-dollar-win-count").html(dealerDollarsWon);
		$("#draw-button").prop('disabled',true);
		$("#hit-button").prop('disabled',true);
		$("#stand-button").prop('disabled',true);
	}else{
		playerWins++;
		playerDollarsWon = dollarsWon+playerDollarsWon;
		$("#message").html("Dealer busted! Player Wins!");	
		$("#player-win-count").html(playerWins);	
		$("#player-dollar-win-count").html(playerDollarsWon);
		$("#draw-button").prop('disabled',true);
		$("#stand-button").prop('disabled',true);	
		$("#hit-button").prop('disabled',true);
	}
}	














