
/*
 * Indicates if two rectangles are colliding
 *
 * @param {object} a - An object with properties x, y, width, and height
 * @param {object} b - An object with properties x, y, width, and height
 *
 * @return {boolean} If a and b are colliding
 */
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
