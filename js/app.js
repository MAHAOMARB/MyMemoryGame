CardsList = cardsInitialize();
var shuffledCards = shuffle(CardsList);
var openedCard=[];
var allMatchedCards=0;
var movesCounter=0;
var click=0;
var interval;
var timer=document.querySelector(".timer");
timer.innerHTML="0 mins : 0 secs";//initial time

//startTimer function uses second and minute variables to calculate the timing
var second=0;
var minute=0;

displayCards();

//Add event listener
//loop to add event listener to each card
var cards =document.getElementsByClassName("card");  
   for(var i=0; i<cards.length; i++){
      cards[i].addEventListener("click" ,function(){fireMatcher(this)});         
   } 

//..........................................................
//bring all cards from DOM
function cardsInitialize() {
var domCards = document.getElementsByClassName("card"); 
return transformer(domCards);
}
//..........................................................
function transformer(object){
var transformed=[];
for(var key in object){
    if(object.hasOwnProperty(key)){
        transformed.push(object[key].innerHTML);
    }  
}
return transformed;
}
//...........................................................
function displayCards(){
    //showInfo();
   
    var ul = document.getElementsByClassName("deck");
    
       for(var i=0; i< ul.length ; i++){
         ul[i].innerHTML='';
       }
       for (var y=0 ; y<shuffledCards.length; y++){
         let elmi = document.createElement("i");
         var li = document.createElement("li");
         li.innerHTML = shuffledCards[y];
         li.classList.add("card");
         li.appendChild(elmi);
         ul[0].appendChild(li);
       }
       
}
/*
for (var i =0 ; i<shuffledCards.length; i++){
 let elmi = document.createElement("i");
   var li = document.createElement("li");
   elmi.className = shuffledCards[i];
   li.classList.add("card");
   li.appendChild(elmi);
   ul[0].appendChild(li); 
}

*/
 //..........................................................
function fireMatcher(card) {
    console.log(card);
    click++;
    if(click==1){startTimer();}
    displayIcon(card); //to show "open" and "show" classes
    isMatch(card);
}
//...........................................................
function startTimer(){
    interval=setInterval(function(){
        timer.innerHTML= minute + "mins" + ":" + second + "secs";
        second++;
        if(second==60){
            minute++;
            second=0;
        }
    },1000);   
 } 
 //...........................................................
 function displayIcon(card){
    
    card.className +=" "+"show open";
    //card.classList.add("show","open");
}
 //...................................................................
function isMatch(card){
    console.log(card);
    if(openedCard.length==0){
        openedCard.push(card);
        incrementMoves();
    }else{
        //incrementMoves();
        console.log()
            openedCard.push(card);
            if(openedCard[0].children[0].getAttribute('class')==openedCard[1].children[0].getAttribute('class')){
              
    
            //and if li[i]!=li[i]     
               matched(openedCard);
               openedCard=[];
            }else{
               noMatched(openedCard);
               openedCard=[];
            } 
        }
       
    
     
}
//.....................................................................
function incrementMoves(){
    movesCounter++;
    document.getElementsByClassName("moves")[0].innerHTML=movesCounter;
}
//.....................................................................
function matched(openedCard){
    setTimeout(function(){
    for(var x=0; x<openedCard.length;x++){
        
        openedCard[x].classList.remove("show","open");
        openedCard[x].classList.add("match");
        allMatchedCards +=1;
    }
    isAllMatched();
    //openedCard=[];
}, 1000);  
}  
//.....................................................................
function noMatched(openedCard){
    setTimeout(function(){
        for(var z=0; z<openedCard.length;z++){
            openedCard[z].classList.remove("show","open");
        }
        //openedCard=[];
      }, 1000);   
} 
//.....................................................................
function isAllMatched(){
    
    if(allMatchedCards==16){
        clearInterval(interval);
        
        showInfo();
        finishGame();
    }
}
//.......................................................................
function showInfo(){
alert("Congratulation , you win with" + movesCounter +"moves" + "with time " + timer.innerHTML + "");
/*swal({
    title: "Congratulation",
    text: "Your will not be able to recover this imaginary file!",
    type: "warning",
    showCancelButton: true,
    confirmButtonClass: "btn-danger",
    confirmButtonText: "play Again",
    closeOnConfirm: false
  },
  function(){
    swal("Deleted!", "Your imaginary file has been deleted.", "success");
 }); */
}
//........................................................................
function finishGame(){

}
//........................................................................


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
