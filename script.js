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
    enableTouch(tile);   // ✅ รองรับมือถือ
    puzzle.appendChild(tile);
    tiles.push(tile);
  }
}

function shuffle() {
  const shuffled = [...tiles];
  shuffled.sort(() => Math.random() - 0.5);
  puzzle.innerHTML = "";
  shuffled.forEach(tile => puzzle.appendChild(tile));
  tiles = shuffled;
  updateBackground(); // ✅ อัปเดตตำแหน่งภาพหลังสับ
}

function dragStart(e) {
  e.dataTransfer.setData("index", e.target.dataset.index);
}

function drop(e) {
  e.preventDefault();
  const fromIndex = e.dataTransfer.getData("index");
  const toIndex = e.target.dataset.index;

  const fromTile = tiles[fromIndex];
  const toTile = tiles[toIndex];

  if (fromTile && toTile) {
    puzzle.insertBefore(fromTile, toTile);
    tiles = Array.from(puzzle.children);
    updateBackground(); // ✅ อัปเดตตำแหน่งภาพหลังลาก
    checkWin();
  }
}

function dragOver(e) {
  e.preventDefault();
}

// ✅ รองรับมือถือด้วย touch event
function enableTouch(tile) {
  tile.addEventListener("touchstart", e => {
    tile.classList.add("dragging");
  });

  tile.addEventListener("touchend", e => {
    tile.classList.remove("dragging");
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    const target = document.elementFromPoint(endX, endY);
    if (target && target.classList.contains("tile")) {
      puzzle.insertBefore(tile, target);
      tiles = Array.from(puzzle.children);
      updateBackground(); // ✅ อัปเดตตำแหน่งภาพหลังลากบนมือถือ
      checkWin();
    }
  });
}

// ✅ ฟังก์ชันอัปเดตตำแหน่งภาพให้ตรงกับ index ใหม่
function updateBackground() {
  tiles.forEach((tile, i) => {
    tile.style.backgroundPosition = `${-(i % 3) * 100}px ${-Math.floor(i / 3) * 100}px`;
  });
}

// ✅ ตรวจสอบว่าต่อเสร็จหรือยัง
function checkWin() {
  const correct = tiles.every((tile, i) => tile.dataset.index == i);
  if (correct) {
    alert("เก่งมาก ต่อสำเร็จ! 🎉");
  }
}

// โหลดครั้งแรก → สร้าง + สับทันที
createPuzzle();
shuffle();
