const puzzle = document.getElementById("puzzle");
let tiles = [];

function createPuzzle() {
  puzzle.innerHTML = "";
  tiles = [];
  for (let i = 0; i < 9; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.style.backgroundImage = "url('IMG_20260902_233032_076.jpg')";
    tile.style.backgroundSize = "300px 300px";
    tile.style.backgroundPosition = `${-(i % 3) * 100}px ${-Math.floor(i / 3) * 100}px`;
    tile.dataset.index = i;
    tile.draggable = true;
    tile.addEventListener("dragstart", dragStart);
    tile.addEventListener("drop", drop);
    tile.addEventListener("dragover", dragOver);
    puzzle.appendChild(tile);
    tiles.push(tile);
  }
}

function shuffle() {
  tiles.sort(() => Math.random() - 0.5);
  tiles.forEach(tile => puzzle.appendChild(tile));
}

function dragStart(e) {
  e.dataTransfer.setData("index", e.target.dataset.index);
}

function drop(e) {
  e.preventDefault();
  const fromIndex = e.dataTransfer.getData("index");
  const toIndex = e.target.dataset.index;
  puzzle.insertBefore(tiles[fromIndex], tiles[toIndex]);
}

function dragOver(e) {
  e.preventDefault();
}

createPuzzle();

