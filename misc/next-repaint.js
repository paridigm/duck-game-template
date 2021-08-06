
/*
 * waits for the next screen repaint
 */
function nextRepaint(handler) {
	requestAnimationFrame(function() {
		requestAnimationFrame(function() {
			handler();
		});
	});
}
