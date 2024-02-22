//creating variables here that can relate JS+HTMl and also create functions here using variable names
const message = document.querySelector(".message");
const score = document.querySelector(".score");
const button = document.querySelectorAll("button");
const gameplay = document.querySelector(".gameplay");

let curCardValue = 0; //this contains whatever the existing card is, can be seen by player
let scoreValue = 0;
let deck = []; //default variables to be used to produce deck by JS
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, "J", "Q", "K", "A"];
const suits = ["hearts", "diams", "clubs", "spades"]; //these data is needed to produce the deck
for (let i = 0; i < button.length; i++) {
  console.log(button[i]);
  button[i].addEventListener("click", playGame); //add eventlisteners to buttons to make buttons functional
}
//default fn for buttons, one view is when start clicked, it hides and shows higher/lower and again
function toggleButtons() {
  button[0].classList.toggle("hideButton"); //refer to hidebutton display on css
  button[1].classList.toggle("hideButton");
  button[2].classList.toggle("hideButton");
}
//create a fn triggered by an event(button click), this is where gameplay starts
function playGame(e) {
  let temp = e.target.innerText;
  let myCard = drawCard(); //calls drawCard fn to get random card from deck(seen by player),myCard is waiting to be drawn
  if (temp == "Start") {
    message.innerHTML = "Higher or Lower";
    gameplay.innerHTML = ""; //used to clear game area
    scoreValue = 0; //this and line below resets the score to 0 only when 'start' is clicked
    score.innerHTML = scoreValue;
    makeCard(myCard); //this generates the visuals of the card
    toggleButtons();
    return;
  }
  console.log(myCard);
  if (myCard.value == curCardValue) {
    message.innerHTML = "Draw";
  } else {
    if (
      (temp == "Higher" && myCard.value > curCardValue) ||
      (temp == "Lower" && myCard.value < curCardValue)
    ) {
      scoreValue++;
      score.innerHTML = scoreValue;
      message.innerHTML = "Correct, Next?";
    } else {
      message.innerHTML = "Wrong Game Over";
      toggleButtons();
    }
  }
  makeCard(myCard);
}
//this fn randomly selects card from deck and removes it
function drawCard() {
  if (deck.length > 0) {
    let randIndex = Math.floor(Math.random() * deck.length); //math function reeturns a random integer from 0 to deck length:
    let card = deck.splice(randIndex, 1)[0]; //item removed from deck, until zero, splice() to remove elements without leaving "holes" in the array
    return card;
  } else {
    makeDeck(); //will come down to this and  when deck empties it calls makeDeck to create
    return drawCard();
  }
}
//this function initialise the deck, iterates over each suit and length, card has suit and rank
function makeDeck() {
  deck = [];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < ranks.length; j++) {
      let card = {};
      card.suit = suits[i]; //this is an object
      card.rank = ranks[j]; //this is an object
      card.value = j + 1; // this is an object
      deck.push(card);
    }
  }
  console.log(deck);
}
//this codeblock below are for the visuals of the card
function makeCard(card) {
  console.log(card);

  let html2 = card.rank + "&" + card.suit + ";";
  let curCards = document.querySelectorAll(".card");

  let div = document.createElement("div"); //div created here
  div.setAttribute("class", "card");
  div.style.left = curCards.length * 25 + "px";
  curCardValue = card.value;
  if (card.suit === "hearts" || card.suit === "diams") {
    div.classList.add("red");
  }
  //93-95 is span1
  let span1 = document.createElement("span");
  span1.setAttribute("class", "tiny");
  span1.innerHTML = html2;
  div.appendChild(span1); //span 1 in to div line 85

  //create span2 and append to line 85
  let span2 = document.createElement("span");
  span2.setAttribute("class", "big");
  let html1 = card.rank + "<br>&" + card.suit + ";";
  span2.innerHTML = html1;
  span2.innerHTML = card.rank + "<br>&" + card.suit + ";";
  div.appendChild(span2);

  gameplay.appendChild(div);
}
