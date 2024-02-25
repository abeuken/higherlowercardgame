let colours = [
  "red",
  "red",
  "blue",
  "blue",
  "green",
  "green",
  "yellow",
  "yellow",
  "purple",
  "purple",
  "pink",
  "pink",
];
let tileObjects = []; //an array that stores all the tile data, element, html etc
let clickedTiles = []; //stores the selected tiles, this array will hold max of 2 tiles
let openTiles = 0; // keeps track of the correctly guessed tiles

// Tile class blueprint(object)
class Tile {
  constructor(_htmlElement, _id) {
    this.index = Math.floor(Math.random() * colours.length);
    this.colour = colours.splice(this.index, 1)[0];
    this.htmlElement = _htmlElement;
    this.id = _id;
  }
}

// creates new tiles and saves in tileObjects array
//instead of using querySelector, use getElementById to pull html elements by their id.

for (let i = 0; i < 12; i++) {
  let tile = new Tile(document.getElementById(`${i}`), i); //getElementbyId takes in a string as a parameter so we use a string literal `` ${}
  tileObjects.push(tile); //pushes tileObjects to the back of the tileObjects arr
}

// adds click event listener to each html tile, (applying eventListener to html element)
for (const e of tileObjects) {
  e.htmlElement.addEventListener("click", function () {
    // opens the tile
    if (clickedTiles.length < 2) {
      let htmlTileElement = e.htmlElement;
      htmlTileElement.style.backgroundColor = e.colour;
      clickedTiles.push(e);
    }

    if (clickedTiles.length === 2) {
      // compares the colour of opened tiles
      if (clickedTiles[0].colour === clickedTiles[1].colour) {
        // clickedTiles.forEach(
        //   (x) => (x.htmlElement.style.border = "#7FFF00 2px solid")
        // );

        // keeping track of correct tiles, see code 51
        openTiles += 2;

        // reset
        clickedTiles = []; //after 2 tiles compared, it resets
      } else {
        // reset tiles after 300ms
        setTimeout(() => {
          //read on setTimeout syntax
          clickedTiles.forEach(
            (element) => (element.htmlElement.style.backgroundColor = "grey")
          );

          //reset
          clickedTiles = [];
        }, 300); //it runs the function after the timer ends in ms
      }
    }

    // check if game is won
    if (openTiles === 12) {
      const node = document.createElement("H1");
      node.textContent = "You won!";
      document.body.appendChild(node);
    }
  });
}
