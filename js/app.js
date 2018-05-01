CardsList = cardsInitialize();
var shuffledCards = shuffle(CardsList);
var openedCard=[];
var allMatchedCards=0;
var movesCounter=0;
var click=0;
var interval;
var timer=document.querySelector(".timer");
timer.innerHTML=" 0 mins : 0 secs ";//initial time

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

//refresh page of game     
function restartBtn() {
    window.location.reload();
}  

//access to all initial crads through DOM
function cardsInitialize() {
var domCards = document.getElementsByClassName("card"); 
return transformer(domCards);
}

function transformer(object){
var transformed=[];

for(var key in object){
    if(object.hasOwnProperty(key)){
        transformed.push(object[key].innerHTML);
    }  
}

return transformed;
}

//remove all initial cards then display shuffled Cards each time the player wants to play the game
function displayCards(){
    
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

function fireMatcher(card) {
    if(card.className !== 'card match' && card.className !== 'card show open'){
    click++;
    if(click==1){
        startTimer();
    }
    displayIcon(card); 
    isMatch(card);
    }
}

function startTimer(){
    interval=setInterval(function(){
        timer.innerHTML= minute + " mins " + " : " + second + " secs ";
        second++;
        if(second==60){
            minute++;
            second=0;
        }
    },1000);   
} 

//gives score 3,2 or 1 depends on movesCounter
function starRating(movesCounter){
    let score = 3;
    if(movesCounter <= 19){
        score = 3;
    }   
    else if((movesCounter > 19) && (movesCounter <= 24)){
        score = 2;
    }    
	else{
        score = 1;
    }

    return score;
}

//to show "open" and "show" classes
function displayIcon(card){
    card.className +=" "+"show open";   
}

//comapre between two cards if they matched or not
function isMatch(card){
    
    if(openedCard.length==0){
        openedCard.push(card);
        incrementMoves();
        starCounter();
    }else{
        openedCard.push(card);

        if(openedCard[0].children[0].getAttribute('class')==openedCard[1].children[0].getAttribute('class')){ 
            matched(openedCard);
            openedCard=[];
        }else{
            noMatched(openedCard);
            openedCard=[];
        } 
    }    
}

function incrementMoves(){
    movesCounter++;
    document.getElementsByClassName("moves")[0].innerHTML=movesCounter;
}

function starCounter(){
    if (movesCounter === 20) {
        removeStar();
    }
    else if (movesCounter === 25) {
        removeStar();
    }
}

function removeStar(){
    var star = document.getElementsByClassName("stars")[0];
    var element=star.getElementsByTagName("li");
    star.removeChild(element[0]);  
}

function matched(openedCard){
    setTimeout(function(){
    for(var x=0; x<openedCard.length;x++){
        
        openedCard[x].classList.remove("show","open");
        openedCard[x].classList.add("match");
        allMatchedCards +=1;
    }
    isAllMatched(); 
    
    }, 1000);  
}  

function noMatched(openedCard){
    setTimeout(function(){
        for(var z=0; z<openedCard.length;z++){
            openedCard[z].classList.remove("show","open");
        }
        
    }, 1000);   
} 

//all cards have match class
function isAllMatched(){
    
    if(allMatchedCards==16){
        clearInterval(interval);
        var grade= starRating(movesCounter);
        showInfo(grade);   
    }
}

function showInfo(grade){
  
    swal({ 
        title: 'Congratulation',
        text: "You win with  " + movesCounter +" moves " + " in time " 
        + timer.innerHTML + ", score is :" + grade ,
        type: 'success',
        showCancelButton: true,
        confirmButtonText: 'PLAY AGAIN !?!',
        cancelButtonText: 'No.'
        }).then(result => {
        if (result.value) {
        window.location.reload();
        } else {
        // handle dismissals
        // result.dismiss can be 'cancel', 'overlay', 'esc' or 'timer'
        }
    });
    
}

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
