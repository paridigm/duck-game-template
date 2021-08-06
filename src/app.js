
function App(data) {
	let elem;
	const store = data.store;

	const scenes = {};

	function construct() {
		elem = document.createElement('div');
		elem.id = 'app';
		elem.className = 'flex flex-center';
		{

			////////////////////////////////////////////////////////////////
			// HERE (2): add scenes

			// game scene
			scenes.game = new Game({ store });
			elem.appendChild(scenes.game.elem);

			// gameOver scene
			scenes.gameOver = new GameOver({ store });
			elem.appendChild(scenes.gameOver.elem);

			////////////////////////////////////////////////////////////////

		}
	}

	function update() {}

	function enter() {

		// initialize nipple
		// NOTE: comment this out to disable nipple
		store.initNipple(scenes.game.elem);

		// set the initial scene
		store.setScene('game');

	}
	function exit() {}

	function destroy() {}

	construct();
	return { elem, data, update, enter, exit, destroy, scenes };
}
