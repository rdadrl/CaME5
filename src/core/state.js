/*
 *					CaME5
 *	Authors: Arda Ntourali and Sarp Soyal
 *
 *	name		: state.js
 *	type		: core	
 *	description	:
 *		Keeps various states.
 *		Calls setup() function on window.onload
 *		(This makes sure all scripts are loaded)		
*/
'use strict';

const CaME5_ = {
	state: false,
	ctx: undefined,
	tick: {
		id: undefined,
		rate: 100,
		now: undefined,
		delta: undefined,
		last: performance.now()
	},
	animationFrame: {
		now: undefined,
		delta: undefined,
		last: performance.now()
	},
	objects: {
		list: [],
		last_id: 0
	}
};

window.onload = function () { //On window load, call 
	if (typeof setup === "function") { //call setup if present.
		console.info("setup() exists, calling.");
		setup();
	}
	else {
		console.warn("setup() function doesn't exists. Running CaME5 functions outside of setup is not recommended.");
	}
}
