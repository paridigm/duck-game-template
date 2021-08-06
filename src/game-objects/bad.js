
function Bad(data) {
	let elem;
	const store = data.store;
	const game = data.game;
	const world = data.world;

	function construct() {
		elem = document.createElement('div');
		elem.className = 'game-object bad';
		data.x = data.x || 0;
		data.y = data.y || 0;
		data.width = data.width || 30;
		data.height = data.height || 30;
		store.on('tick', update);
	}

	function update() {

		// move down
		data.y += 1.5;

		// reset
		if(data.y > 200) {
			reset();
		}

		// HERE (5): collisions
		// collision
		if(world) {
			if(world.player) {
				if(hitTest(world.player.data, data)) {
					handlePlayerCollision();
				}
			}
		}

		// update view
		elem.style.left = data.x + 'px';
		elem.style.top = data.y + 'px';
		elem.style.width = data.width + 'px';
		elem.style.height = data.height + 'px';

	}

	function handlePlayerCollision() {

		// add explosion
		game.addGameObject('explosion' + game.explosionCounter, Explosion, {
			x: data.x + data.width/2,
			y: data.y + data.height/2,
		});
		game.explosionCounter++;

		// remove self
		game.removeGameObject(data.id);

		// uncomment the line below to remove player upon collision...
		// store.removeGameObject('player');

		// goto gameOver scene
		setTimeout(() => { store.setScene('gameOver'); }, 1000);

	}

	function reset() {
		data.x = Math.random()*200;
		data.y = 0;
	}

	function enter() {}
	function exit() {}

	function destroy() {
		store.off('tick', update);
	}

	construct();
	return { elem, data, update, enter, exit, destroy };
}
