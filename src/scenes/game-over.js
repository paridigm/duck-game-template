
function GameOver(data) {
	let elem;
	const store = data.store;
	let el;

	function construct() {
		elem = document.createElement('div');
		elem.id = 'game-over';
		elem.className = 'text-center';
		{
			el = document.createElement('div');
			el.style.marginBottom = '12px';
			el.innerHTML = 'Game Over';
			elem.appendChild(el);

			el = document.createElement('button');
			el.style.fontSize = '16px';
			el.style.padding = '12px 24px';
			el.onclick = gotoGameScene;
			el.innerHTML = 'Play Again';
			elem.appendChild(el);
		}
		store.on('scene', update);
		store.on('buttonDown', onButtonDown);
	}

	function update() {
		if(store.getScene() === 'gameOver') {
			elem.classList.remove('hidden');
		}else{
			elem.classList.add('hidden');
		}
	}

	function enter() {}
	function exit() {}

	function destroy() {}

	function gotoGameScene() {
		store.setScene('game');
	}

	function onButtonDown() {
		if(store.getScene() === 'gameOver') {
			if(store.buttons.ok || store.buttons.fire) {
				gotoGameScene();
			}
		}
	}

	construct();
	return { elem, data, update, enter, exit, destroy };
}
