
function Explosion(data) {
	let elem;
	const store = data.store;
	const game = data.game;
	const world = data.world;

	function construct() {
		elem = document.createElement('div');
		elem.className = 'game-object explosion';
		data.x = data.x || 0;
		data.y = data.y || 0;
		data.width = data.width || 10;
		data.height = data.height || 10;

		elem.style.left = data.x - data.width/2 + 'px';
		elem.style.top = data.y - data.height/2 + 'px';
		elem.style.width = data.width + 'px';
		elem.style.height = data.height + 'px';

		store.on('scene', update);
		elem.addEventListener('transitionend', onTransitionEnd);
	}

	function update() {
		onTransitionEnd();
	}

	function enter() {
		nextFrame(() => {
			elem.style.transform = 'scale(6, 6)';
			elem.style.backgroundColor = '#aaa';
			elem.style.opacity = 0;
		});
	}
	function exit() {}

	function destroy() {
		store.off('scene', update);
		elem.removeEventListener('transitionend', onTransitionEnd);
	}

	function onTransitionEnd() {
		if(world) {
			if(world[data.id]) {
				game.removeGameObject(data.id);
			}
		}
	}

	construct();
	return { elem, data, update, enter, exit, destroy };
}
