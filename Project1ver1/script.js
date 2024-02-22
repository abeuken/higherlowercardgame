const message = document.querySelector(".message");
const score = document.querySelector(".score");
const button = document.querySelectorAll("button");
const gameplay = document.querySelector(".gameplay");

let curCardValue = 0; //this contains whatever the existing card is
let scoreValue = 0;
let deck = []; //global variable which will produce a deck of cards in JS
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, "J", "Q", "K", "A"];
const suits = ["hearts", "diams", "clubs", "spades"];

for (let i = 0; i < button.length; i++) {
  console.log(button[i]);
  button[i].addEventListener("click", playGame);
}

function toggleButtons() {
  button[0].classList.toggle("hideButton");
  button[1].classList.toggle("hideButton");
  button[2].classList.toggle("hideButton");
}

function playGame(e) {
  let temp = e.target.innerText;
  let myCard = drawCard();

  if (temp == "Start") {
    message.innerHTML = "Higher or Lower";
    gameplay.innerHTML = "";
    makeCard(myCard);
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
function drawCard() {
  if (deck.length > 0) {
    let randIndex = Math.floor(Math.random() * deck.length);
    let card = deck.splice(randIndex, 1)[0]; //item removed from deck, until zero, continously shrinking
    return card;
  } else {
    makeDeck(); //will come down to this and create new deck, infinity
    return drawCard();
  }
}
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
//this is the visuals of the card
function makeCard(card) {
  console.log(card);
  let html1 = card.rank + "<br>&" + card.suit + ";";
  let html2 = card.rank + "&" + card.suit + ";";
  let curCards = document.querySelectorAll(".card");

  let div = document.createElement("div");
  div.setAttribute("class", "card");
  div.style.left = curCards.length * 25 + "px";
  curCardValue = card.value;
  if (card.suit === "hearts" || card.suit === "diams") {
    div.classList.add("red");
  }

  let span1 = document.createElement("span");
  span1.setAttribute("class", "tiny");
  span1.innerHTML = html2;
  div.appendChild(span1);

  let span2 = document.createElement("span");
  span2.setAttribute("class", "big");
  span2.innerHTML = html1;
  div.appendChild(span2);

  gameplay.appendChild(div);
}
