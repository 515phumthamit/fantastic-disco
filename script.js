function checkWin() {
  let correct = true;
  tiles.forEach((tile, i) => {
    if (tile.dataset.index != i) correct = false;
  });
  if (correct) alert("เก่งมากเลยที่รัก 💖 ต่อภาพสำเร็จแล้ว!");
}
