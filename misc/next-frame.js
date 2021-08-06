
/*
 * waits for the next screen render...
 */
function nextFrame(handler) {
	requestAnimationFrame(function() {
		requestAnimationFrame(function() {
			handler();
		});
	});
}
