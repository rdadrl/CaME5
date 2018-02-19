var canvas;
var fpsText,
	tickText,
	myMouse;


function setup () {
	canvas = new createCanvas();

	fpsText = text("FPS:", 5,10);
	tickText = text("Tick:", 5, 25);
	myMouse =  text("Mouse Positions", 5,40);
	rect(100,100,50,50).onclick = function() {
		remove(this);
	}
}

function update() {
	fpsText.text = "FPS: " + fps();
	tickText.text = "Tick: " + tick_rate();
 	myMouse.text = "Mouse Pos:\nx:" + mouseX + "\ny:" + mouseY;
}

function draw () {
	color("red");
}

function mouseClick() {
}
