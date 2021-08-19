
function ZSorter(data) {
	const world = data.world;
	const stageElem = data.stageElem;

	const objects = {};
	const unsorted = [];
	const sorted = [];

	function zSort() {

		// move unsorted things into unsorted list, handle removed game objects
		let zg;  // greatest z seen so far
		for(let i = 0; i < sorted.length; i++) {
			const o = sorted[i];
			const z = o.data.z;
			const id = o.data.id;

			// remove if removed from world
			if(!world[id]) {
				sorted.splice(i, 1);
				delete objects[id];
				i--;
				continue;
			}

			// first iteration
			if(zg == null) {
				zg = o.data.z;
			}

			// other iterations
			else{

				// good, update zg
				if(z >= zg) {
					zg = z;
				}

				// bad, move to unsorted
				else{
					unsorted.push(sorted.splice(i, 1)[0]);
					i--;
				}

			}

		}

		// add objects that aren't added yet
		for(let id in world) {
			if(!objects[id]) {
				unsorted.push(world[id]);
				objects[id] = world[id];
			}
		}

		// place unsorted into sorted
		while(unsorted.length > 0) {
			const o = unsorted.pop();
			const z = o.data.z;

			let placed = false;
			for(let i = 0; i < sorted.length; i++) {
				const zi = sorted[i].data.z;
				if(zi > z) {
					sorted.splice(i, 0, o);
					placed = true;
					break;
				}
			}
			if(!placed) {
				sorted.push(o);
				placed = true;
				// console.log(sorted);
			}

		}

		// move stuff in DOM
		for(let i = 0; i < sorted.length; i++) {
			const o = sorted[i];
			if(stageElem.childNodes[i] != o.elem) {
				stageElem.insertBefore(o.elem, stageElem.childNodes[i+1]);
			}
		}

	}

	return { zSort };
}
