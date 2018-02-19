/*
 *					CaME5
 *	Authors: Arda Ntourali and Sarp Soyal
 *
 *	name		: tick.js
 *	type		: core	
 *	description	:
 *		Handles updating functions other
 *		than draw() function.
 *		tick is meant for physics-like
 *		calculations.
 *		Default TPS: 100
*/
'use strict';

function tick () {
	CaME5_.tick.now = performance.now();
	CaME5_.tick.delta = CaME5_.tick.now - CaME5_.tick.last;
	CaME5_.tick.last = CaME5_.tick.now;

	update();
}

function tick_rate(tps) {
	if (!arguments.length) return parseInt(1000 / CaME5_.tick.delta);
	else if (parseInt(tps) === tps) { //if user submitted a new tps value
		clearInterval(CaME5_.tick.id); //stop old interval
		CaME5_.tick.rate = tps; //change tick rate
		CaME5_.tick.id = setInterval(tick, 1000 / CaME5_.tick.rate); //restart interval

		console.info("Applied tick rate as " + tps + "tps");
		return true;
	}
	console.error("Something wrong happened while changing tick rate");
	return false;
}