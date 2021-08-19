
function Game(data) {
	let elem;
	const store = data.store;
	const game = data;
	const world = {};

	game.world = world;
	game.addGameObject = addGameObject;
	game.removeGameObject = removeGameObject;
	game.reset = reset;

	let stageElem;

	let zSorter;

	let debugElemContainer;
	let debugElem;

	game.gameOver = false;
	game.numBads = 6;
	game.explosionCounter = 0;
	
	function construct() {

		// elem
		elem = document.createElement('div');
		elem.id = 'game';
		elem.className = 'flex flex-center';
		elem.style.flexDirection = 'column';
		{

			// stage
			stageElem = document.createElement('div');
			stageElem.id = 'stage';
			elem.appendChild(stageElem);
			{

				////////////////////////////////////////////////////////////////
				// HERE (3): add game objects

				// player
				world.player = new Player({ store, game, world, id: 'player', x: 100 });
				stageElem.appendChild(world.player.elem);

				// bads
				for(let i = 0; i < game.numBads; i++) {
					world['bad' + i] = new Bad({ store, game, world, id: 'bad'+ i });
					stageElem.appendChild(world['bad' + i].elem);
				}

				////////////////////////////////////////////////////////////////

			}

			// debug
			debugElemContainer = document.createElement('div');
			debugElemContainer.className = 'debug-container rel';
			debugElemContainer.style.width = 210 + 'px';
			debugElem = document.createElement('span');
			debugElem.className = 'debug abs';
			debugElem.innerHTML = '';
			debugElemContainer.appendChild(debugElem);
			elem.appendChild(debugElemContainer);

		}

		zSorter = new ZSorter({ world, stageElem });

		store.on('scene', update);
		store.on('tick', onTick);
		store.on('postTick', onPostTick);
	}

	function reset() {

		////////////////////////////////////////////////////////////////
		// HERE: reset game logic

		game.gameOver = false;
		game.explosionCounter = 0;

		//// player
		// create player if player missing
		if(!world.player) {
			world.player = new Player({ store, game, world, id: 'player', x: 100 });
			stageElem.appendChild(world.player.elem);
		}
		// reset player position
		world.player.data.x = 70;
		world.player.data.y = 200;
		world.player.data.z = 0;

		//// bads
		for(let i = 0; i < game.numBads; i++) {
			// create bad if bad missing
			if(!world['bad' + i]) {
				world['bad' + i] = new Bad({ store, game, world, id: 'bad'+ i });
				stageElem.appendChild(world['bad' + i].elem);
			}
			// reset bad position
			world['bad' + i].data.x = Math.random() * 200;
			world['bad' + i].data.y = Math.random() * 200;
			world['bad' + i].data.z = 0;
		}

		////////////////////////////////////////////////////////////////

		// manually tick to update view
		store.tick();
	}

	function addGameObject(id, type, data) {
		data.store = store;
		data.game = game;
		data.world = world;
		data.id = id;
		world[id] = new type(data);
		stageElem.appendChild(world[id].elem);
		world[id].enter();
	}
	function removeGameObject(id) {
		if(world[id]) {
			stageElem.removeChild(world[id].elem);
			world[id].destroy();
			delete world[id];
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

	function onTick() {
		updateDebugElem();
	}

	function onPostTick() {
		zSorter.zSort();
	}

	function updateDebugElem() {
		let s = '';
		s += '{ ';
		for(let id in world) { s += id + ' '; }
		s += '}';
		// update DOM only when there is a change
		if(debugElem.innerHTML !== s) { debugElem.innerHTML = s; }
	}

	function enter() {}
	function exit() {}

	function destroy() {}

	construct();
	return { elem, data, update, enter, exit, destroy, world, stageElem };
}
