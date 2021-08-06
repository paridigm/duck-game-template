
function Game(data) {
	let elem;
	const store = data.store;
	const world = {};
	let stageElem;

	const numBads = 6;

	function construct() {
		elem = document.createElement('div');
		elem.id = 'game';
		elem.className = 'flex flex-center';
		{

			// stage
			stageElem = document.createElement('div');
			stageElem.id = 'stage';
			elem.appendChild(stageElem);
			{

				////////////////////////////////////////////////////////////////
				// HERE (3): add game objects

				// player
				world.player = new Player({ store, world, id: 'player', x: 100 });
				stageElem.appendChild(world.player.elem);

				// bads
				for(let i = 0; i < numBads; i++) {
					world['bad' + i] = new Bad({ store, world, id: 'bad'+ i });
					stageElem.appendChild(world['bad' + i].elem);
				}

				////////////////////////////////////////////////////////////////

			}
		}
		store.on('scene', update);
		store.on('removeGameObject', removeGameObject);
	}

	function reset() {

		////////////////////////////////////////////////////////////////
		// HERE: reset game logic

		//// player
		// create player if player missing
		if(!world.player) {
			world.player = new Player({ store, world, id: 'player', x: 100 });
			stageElem.appendChild(world.player.elem);
		}
		// reset player
		world.player.data.x = 70;
		world.player.data.y = 200;

		//// bads
		for(let i = 0; i < numBads; i++) {
			// create bad if bad missing
			if(!world['bad' + i]) {
				world['bad' + i] = new Bad({ store, world, id: 'bad'+ i });
				stageElem.appendChild(world['bad' + i].elem);
			}
			// reset bad
			world['bad' + i].data.x = 100;
			world['bad' + i].data.y = 0;
		}

		////////////////////////////////////////////////////////////////

		// manually tick to update view
		store.tick();
	}

	function removeGameObject(id) {
		const gameObject = world[id];
		if(gameObject) {
			// remove from world and stage
			delete world[id];
			stageElem.removeChild(gameObject.elem);
			// remove from game tick
			// NOTE: wait a tick for game objects to finish the current game tick
			setTimeout(() => { gameObject.destroy(); });
		}
	}

	function update() {
		if(store.getScene() === 'game') {
			reset();
			elem.classList.remove('hidden');
		}else{
			elem.classList.add('hidden');
		}
	}

	function enter() {}
	function exit() {}

	function destroy() {}

	construct();
	return { elem, data, update, enter, exit, destroy, world, stageElem };
}
