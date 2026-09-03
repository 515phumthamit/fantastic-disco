const puzzle = document.getElementById("puzzle");

function createPuzzle() {
  puzzle.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    // เปลี่ยนชื่อไฟล์ภาพตามที่คุณต้องการ
    tile.style.backgroundImage = "url('IMG_20260902_233032_076.jpg')";
    tile.style.backgroundSize = "300px 300px";
    tile.style.backgroundPosition = `${-(i % 3) * 100}px ${-Math.floor(i / 3) * 100}px`;
    tile.dataset.index = i; // เก็บ Index ที่ถูกต้องเพื่อเช็คตอนจบ
    tile.draggable = true;
    
    tile.addEventListener("dragstart", dragStart);
    tile.addEventListener("dragover", dragOver);
    tile.addEventListener("drop", drop);
    
    enableTouch(tile); // รองรับมือถือ
    puzzle.appendChild(tile);
  }
}

// ฟังก์ชันสับเปลี่ยนภาพ
function shuffle() {
  const tiles = Array.from(puzzle.children);
  tiles.sort(() => Math.random() - 0.5);
  puzzle.innerHTML = "";
  tiles.forEach(tile => puzzle.appendChild(tile));
}

function dragStart(e) {
  // เก็บ "ตำแหน่งปัจจุบัน" ใน Grid ไม่ใช่ Index ของภาพ
  const currentIndex = Array.from(puzzle.children).indexOf(e.target);
  e.dataTransfer.setData("text/plain", currentIndex);
}

function dragOver(e) {
  e.preventDefault(); // จำเป็นต้องมีเพื่อให้เกิดอีเวนต์ Drop
}

function drop(e) {
  e.preventDefault();
  const fromIndex = e.dataTransfer.getData("text/plain");
  const toIndex = Array.from(puzzle.children).indexOf(e.target);

  if (fromIndex !== "" && fromIndex != toIndex) {
    swapTiles(fromIndex, toIndex);
  }
}

// ✅ ฟังก์ชันสำหรับ "สลับตำแหน่ง" 2 ชิ้น (แก้ปัญหาภาพโดนดันรวน)
function swapTiles(index1, index2) {
  const tiles = Array.from(puzzle.children);
  const tile1 = tiles[index1];
  const tile2 = tiles[index2];

  // สร้าง Element เปล่าๆ มาคั่นไว้เพื่อสลับตำแหน่งใน DOM ได้อย่างสมบูรณ์
  const temp = document.createElement("div");
  puzzle.insertBefore(temp, tile1);
  puzzle.insertBefore(tile1, tile2);
  puzzle.insertBefore(tile2, temp);
  puzzle.removeChild(temp);

  checkWin();
}

// ✅ รองรับมือถือ (ใช้ touchstart เพื่อจำชิ้นที่เริ่มลาก และ touchend เพื่อสลับ)
let draggedTileIndex = null;
function enableTouch(tile) {
  tile.addEventListener("touchstart", e => {
    draggedTileIndex = Array.from(puzzle.children).indexOf(tile);
  }, { passive: true });

  tile.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const target = document.elementFromPoint(endX, endY);

    if (target && target.classList.contains("tile")) {
      const targetIndex = Array.from(puzzle.children).indexOf(target);
      if (draggedTileIndex !== null && draggedTileIndex !== targetIndex) {
        swapTiles(draggedTileIndex, targetIndex);
      }
    }
    draggedTileIndex = null;
  });
}

// ✅ ตรวจสอบว่าต่อเสร็จหรือยัง
function checkWin() {
  const tiles = Array.from(puzzle.children);
  const isWin = tiles.every((tile, index) => tile.dataset.index == index);
  
  if (isWin) {
    // หน่วงเวลาเล็กน้อยเพื่อให้ภาพสลับเสร็จก่อนแสดง Alert
    setTimeout(() => {
      alert("เก่งมาก ต่อสำเร็จ! 🎉");
    }, 150);
  }
}

// โหลดครั้งแรก → สร้าง + สับทันที
createPuzzle();
shuffle();