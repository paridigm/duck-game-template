
function Store(data) {
	const events = {};

	let scene = data.scene;
	let tickIntervalId;
	let nippleManager;
	const buttons = {
		right: false,
		left: false,
		down: false,
		up: false,
		fire: false,
		ok: false,
	};
	const joyStickButtonContribution = { x: 0, y: 0 };
	const joyStickNippleContribution = { x: 0, y: 0 };
	const joystick = { x: 0, y: 0 };

	////////////////////////////////////////////////////////////////

	function construct() {
		updateTick();
		document.addEventListener('keydown', onKeyDown);
		document.addEventListener('keyup', onKeyUp);
	}

	////////////////////////////////////////////////////////////////

	function getScene() { return scene; }
	function setScene(value) {
		scene = value;
		emit('scene');
		updateTick();
	}

	function updateTick() {
		if(scene === 'game') {
			startTick();
		}else{
			stopTick();
		}
	}

	function startTick() {
		if(!tickIntervalId) {
			// LATER: try to use requestAnimationFrame instead of setInterval
			// src: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
			tickIntervalId = setInterval(tick, 16);
		}
	}
	function stopTick() {
		if(tickIntervalId) {
			clearInterval(tickIntervalId);
			tickIntervalId = null;
		}
	}

	function tick() {
		emit('tick');
		emit('postTick');
	}

	function onKeyDown(e) {
		let change = false;
		switch (e.key) {
			case 'ArrowRight': case 'd': if(!buttons.right) { buttons.right = true; change = true; } break;
			case 'ArrowLeft':  case 'a': if(!buttons.left)  { buttons.left  = true; change = true; } break;
			case 'ArrowDown':  case 's': if(!buttons.down)  { buttons.down  = true; change = true; } break;
			case 'ArrowUp':    case 'w': if(!buttons.up)    { buttons.up    = true; change = true; } break;
			case ' ':     if(!buttons.fire) { buttons.fire = true; change = true; } break;
			case 'Enter': if(!buttons.ok)   { buttons.ok   = true; change = true; } break;
		}
		updateJoyStickButtonContribution();
		updateJoyStick();
		if(change) {
			emit('buttonDown');
		}
	}
	function onKeyUp(e) {
		switch (e.key) {
			case 'ArrowRight': case 'd': buttons.right = false; break;
			case 'ArrowLeft':  case 'a': buttons.left  = false; break;
			case 'ArrowDown':  case 's': buttons.down  = false; break;
			case 'ArrowUp':    case 'w': buttons.up    = false; break;
			case ' ':     buttons.fire = false; break;
			case 'Enter': buttons.ok   = false; break;
		}
		updateJoyStickButtonContribution();
		updateJoyStick();
		emit('buttonUp');
	}

	function updateJoyStickButtonContribution() {
		joyStickButtonContribution.x = 0;
		joyStickButtonContribution.y = 0;
		if(buttons.right) { joyStickButtonContribution.x += 1; }
		if(buttons.left)  { joyStickButtonContribution.x -= 1; }
		if(buttons.down)  { joyStickButtonContribution.y += 1; }
		if(buttons.up)    { joyStickButtonContribution.y -= 1; }
	}

	function initNipple(zoneElem) {
		if(!nippleManager) {

			nippleManager = nipplejs.create({
		    zone: zoneElem,
		    color: 'DodgerBlue',
				mode: 'semi',
	      catchDistance: 60,
		  });

			nippleManager
				.on('added', (e, nipple) => {
			    nipple.on('start move end dir plain', (e, data) => {
						if(data && data.angle) {
							const r = data.force * 2;
							const a = data.angle.radian;
							let x = r * Math.cos(a);
							let y = r * Math.sin(a) * (-1);
							if(x > 1)  { x = 1; }
							if(x < -1) { x = -1; }
							if(y > 1)  { y = 1; }
							if(y < -1) { y = -1; }
							joyStickNippleContribution.x = x;
							joyStickNippleContribution.y = y;
						}else{
							joyStickNippleContribution.x = 0;
							joyStickNippleContribution.y = 0;
						}
						updateJoyStick();
			    });
				})
				.on('removed', (evt, nipple) => {
					nipple.off('start move end dir plain');
				})
			;

		}
	}

	function updateJoyStick() {
		joystick.x = joyStickNippleContribution.x + joyStickButtonContribution.x;
		joystick.y = joyStickNippleContribution.y + joyStickButtonContribution.y;
		if(joystick.x > 1)  { joystick.x = 1; }
		if(joystick.x < -1) { joystick.x = -1; }
		if(joystick.y > 1)  { joystick.y = 1; }
		if(joystick.y < -1) { joystick.y = -1; }
	}

	////////////////////////////////////////////////////////////////

	construct();
	return {
		getScene,
		setScene,
		buttons,
		joystick,
		initNipple,
		tick,
		on, off
	};

	////////////////////////////////
	// events
	// NOTE: modified to support off() during emit()
	function on(name, handler) {
		if(!events[name]) { events[name] = []; }
		events[name].push(handler);
	}
	function off(name, handler) {
		if(events[name]) {
			const index = events[name].indexOf(handler);
			if(index != -1) { events[name][index] = null; }
		}
	}
	function emit(name, value) {
		if(events[name]) {
			for(let i = 0; i < events[name].length; i++) {
				if(!events[name][i]) { events[name].splice(i, 1); i--; continue; }
				events[name][i](value);
			}
		}
	}
	////////////////////////////////
}
