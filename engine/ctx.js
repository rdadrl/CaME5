'use strict';

/* - - Object Operations - - */
var objects = []; //this will hold any rect, ellipse or image elements with x,y positions.
var id = 0;

function drawObjects() {
	for (var i = 0; i < objects.length; i++) {
		if (typeof objects[i].draw === "function") objects[i].draw();
	}
}
function remove (obj) {
	var index = objects.findIndex(x => x.id == obj.id);
	objects.splice(index, index + 1);
	DEBUG.log("CTX> remove()> #Removed object from objects with id: " + obj.id);
}

function ZtoUpper(obj){
	var index = objects.findIndex(x => x.id == obj.id);
	objects.splice(index, index + 1);
	objects.push(obj);
	DEBUG.log("CTX> ZtoUpper()> #Moved object to top with id: " + obj.id);
}

function ZtoLower(obj){
	var index = objects.findIndex(x => x.id == obj.id);
	objects.splice(index, index + 1);
	objects.unshift(obj);
	DEBUG.log("CTX> ZtoLower()> #Moved object to bottom with id: " + obj.id);
}

function Zby(obj, vol = 0) {
	var index = objects.findIndex(x => x.id == obj.id);
	remove(obj);

	objects.splice(index + vol, 0, obj);
}

/* - End Object Operations - */

function text(text, x, y, maxw = 0) {
	id++;
	objects.push({id: id, type: "text", text: text, x: x, y: y, maxw: maxw, draw: function () {
		if (maxw == 0) public_ctx.fillText(this.text, this.x, this.y);
		else public_ctx.fillText(this.text, this.x, this.y, this.maxw);
	}});
	return objects[objects.length - 1];
}

function rect(x = 0, y = 0, w = 0, h = 0) {
	id++;
	objects.push({id: id, type: "rect", x: x, y: y, w: w, h: h, draw: function () {
		public_ctx.fillRect(this.x, this.y, this.w, this.h); 
	}});
	return objects[objects.length - 1];
}

function circle(x, y, r,) {
	id++;
	objects.push({id: id, type: "circle", x: x, y: y, r: r, draw: function () {
		public_ctx.beginPath();
		public_ctx.ellipse(this.x, this.y, this.r, this.r, 0, 0, 2* Math.PI); 
		public_ctx.closePath();
	}});
	return objects[objects.length - 1];
}

function fill(color) {
	if (typeof color === "string" || typeof color === "number") {
		public_ctx.fillStyle = color;
		public_ctx.fill();
	}

	else return false;
}
