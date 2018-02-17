'use strict';

/**
  *	@Default Canvas Properties: 
  *	@ -width	: 800px
  *	@ -height	: 600px
  *	@ -id		: null
**/
window.onload = function () {
	if (typeof setup === "function") {
		DEBUG.log("window> onload()> #setup() exists, calling.");
		setup(); //call setup if present.
	}
}
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

var public_ctx;

function createCanvas (w = 800, h = 600, id = 0) {
	this.canvas 				= document.createElement("canvas");
	this.canvas.style.width 	= w + "px";
	this.canvas.style.height 	= h + "px";
	this.canvas.width 			= w * PIXEL_RATIO;
	this.canvas.height 			= h * PIXEL_RATIO;
	this.canvas.style.cursor = "arrow";
	if (id != 0) this.canvas.id = id;
	if (typeof getCursorPosition === "function") this.canvas.addEventListener("mousemove", getCursorPosition, false);
	this.canvas.addEventListener("click", clickHandler, false);
	this.ctx = this.canvas.getContext("2d");
	this.ctx.setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0);
	public_ctx = this.ctx;
  	//Append the canvas into the body
	document.body.appendChild(this.canvas);
	DEBUG.log("Canvas> createCanvas()> #Appended canvas into document body.");
	
	animateCanvas();
}

function animateCanvas () {
	if (typeof draw === "function") { //check if draw function (main call function on every frame) is present
		DEBUG.log("Canvas> animateCanvas()> #Started game cycle through tick() function.");
		requestAnimationFrame(tick);
	}
	else {
		DEBUG.log("Canvas> animateCanvas()> #Could not found draw() public function. Call animateCanvas again after canvas creation.");
	}
}

var now,
	delta,
	last = performance.now();

function tick() { //Called every framem
	now = performance.now();
	delta = now - last;
	
	clean();
	if (typeof update === "function") update();
	drawObjects();
	draw();

	last = now;

	requestAnimationFrame(tick);
}

function fps() { //returns current FPS
	if (!arguments.length) return parseInt(1000 / delta);
}


function clean() {
	return public_ctx.clearRect(0, 0, public_ctx.canvas.width, public_ctx.canvas.height);
}