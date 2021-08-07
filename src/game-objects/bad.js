
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
		data.y += 1.8;

		// reset
		if(data.y > 240) {
			reset();
		}

		// HERE (5): collisions
		// collision
		if(world.player) {
			if(hitTest(world.player.data, data)) {
				handlePlayerCollision();
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
		if(!game.gameOver) {
			setTimeout(() => { store.setScene('gameOver'); }, 2000);
			game.gameOver = true;
		}

	}

	function reset() {
		data.x = Math.random()*260 - 30;
		data.y = -30;
	}

	function enter() {}
	function exit() {}

	function destroy() {
		store.off('tick', update);
	}

	construct();
	return { elem, data, update, enter, exit, destroy };
}
