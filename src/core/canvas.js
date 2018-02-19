/*
 *					CaME5
 *	Authors: Arda Ntourali and Sarp Soyal
 *
 *	name		: canvas.js
 *	type		: core	
 *	description	:
 *		Calculates pixel ratio for HD canvas,
 *		creates canvas element with createCanvas()
 *			default values:
 *				Context: 2D
 *				Width  : 800
 *				Height : 600
 *				id     : null
 *		calculates FPS
 *		starts canvas animation and tick()
*/
'use strict';

const PIXEL_RATIO = (function () {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
})();

function createCanvas (w = 800, h = 600, id = 0) {
	if (typeof CaME5_ !== "object") {
		console.error("State.JS not loaded. State cannot be modified. Canvas creation halted");
		return false;
	}
	/* Decleration Stage */
	this.canvas 						= document.createElement("canvas");
	this.canvas.style.width 			= w + "px";
	this.canvas.style.height 			= h + "px";
	this.canvas.width 					= w * PIXEL_RATIO;
	this.canvas.height 					= h * PIXEL_RATIO;
	if (id != 0) this.canvas.id 		= id;
	this.ctx 							= this.canvas.getContext("2d");
	this.ctx.setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0); //HDP Display
	/* End Decleration Stage */

	// If mouse library is present, attach events to the canvas
	if (typeof getCursorPosition === "function") {
		this.canvas.addEventListener("mousemove", getCursorPosition, false);
		this.canvas.addEventListener("click", clickHandler, false);
		console.info("HID> Mouse Library is present. Adding mouse event handlers to the canvas");
	}

	//The Context2D element holds the canvas inside it too. This is for the public functions to reach ctx.
	CaME5_.ctx = this.ctx;

  	//Append the canvas into the body
	document.body.appendChild(this.canvas);
	console.info("Appended canvas into document body.");
	
	if(!startCanvas()) console.error("Unable to start canvas animation. Check previous error messages and call startCanvas() manually if unable to resolve.");
}

function startCanvas() {
	if (typeof draw === "function") {
		CaME5_.state = true;
		requestAnimationFrame(animateCanvas);
		console.info("draw() function is on loop according to screen refresh rate");
	}
	else {
		console.error("draw() function doesn't exists. CaME5 state is false.");
		return false;
	}

	tick_rate(CaME5_.tick.rate);
	return true;
}


function animateCanvas() {
	CaME5_.animationFrame.now = performance.now();
	CaME5_.animationFrame.delta = CaME5_.animationFrame.now - CaME5_.animationFrame.last;
	CaME5_.animationFrame.last = CaME5_.animationFrame.now;
	
	cleanCanvas();
	drawObjects();
	//draw();

	requestAnimationFrame(animateCanvas);
}

function fps() { //returns current FPS
	if (!arguments.length) return parseInt(1000 / CaME5_.animationFrame.delta);
}

function cleanCanvas() {
	return CaME5_.ctx.clearRect(0, 0, CaME5_.ctx.canvas.width, CaME5_.ctx.canvas.height);
}
