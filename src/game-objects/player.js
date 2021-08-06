
function Player(data) {
	let elem;
	const store = data.store;
	const game = data.game;
	const world = data.world;

	function construct() {
		elem = document.createElement('div');
		elem.className = 'game-object player';
		data.x = data.x || 0;
		data.y = data.y || 0;
		data.width = data.width || 10;
		data.height = data.height || 30;
		store.on('tick', update);
	}

	function update() {

		////////////////////////////////////////////////////////////////
		// HERE (4): game object update logic

		// movement
		data.x += store.joystick.x;
		data.y += store.joystick.y;

		// boundaries
		if(data.x < 0) {
			data.x = 0;
		}
		if(data.x > 200) {
			data.x = 200;
		}
		if(data.y < 0) {
			data.y = 0;
		}
		if(data.y > 200) {
			data.y = 200;
		}

		// update view
		elem.style.left = data.x + 'px';
		elem.style.top = data.y + 'px';
		elem.style.width = data.width + 'px';
		elem.style.height = data.height + 'px';

		////////////////////////////////////////////////////////////////

	}

	function enter() {}
	function exit() {}

	function destroy() {
		store.off('tick', update);
	}

	construct();
	return { elem, data, update, enter, exit, destroy };
}
