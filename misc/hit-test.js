
function hitTest(a, b) {
  return (
    // a inside b horizontally
    (a.x < b.x + b.width) &&
    (a.x + a.width > b.x) &&
    // a inside b vertically
    (a.y < b.y + b.height) &&
    (a.y + a.height > b.y)
  );
}
