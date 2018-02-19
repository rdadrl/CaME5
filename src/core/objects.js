/*
 *				CaME5
 *	Authors: Arda Ntourali and Sarp Soyal
 *
 *	name		: objects.js
 *	type		: core	
 *	description	:
*/
'use strict';

function drawObjects() {
	//For each registered objects, check draw state and draw if true
	for (var i = 0; i < CaME5_.objects.list.length; i++) {
		if (CaME5_.objects.list[i].state){
			//State OK. Draw object on canvas
			switch (CaME5_.objects.list[i].type) {
				//Check object type
				case "text":
					drawText(CaME5_.objects.list[i]);
					break;
				case "rect":
					drawRect(CaME5_.objects.list[i]);
					break;

				case "circle":
					drawCircle(CaME5_.objects.list[i]);
					break;
				default:
					console.warn("Unknown type of object encountered while drawing objects");
					break;
			}
		}
	}
}

function remove (obj) {
	var index = CaME5_.objects.list.findIndex(x => x.id == obj.id);
	CaME5_.objects.list.splice(index, index + 1);
	console.info("Removed object from objects with id: " + obj.id);
}

function ZtoUpper(obj){
	var index = CaME5_.objects.list.findIndex(x => x.id == obj.id);
	CaME5_.objects.list.splice(index, index + 1);
	CaME5_.objects.list.push(obj);
	console.info("Moved object to top with id: " + obj.id);
}

function ZtoLower(obj){
	var index = CaME5_.objects.list.findIndex(x => x.id == obj.id);
	CaME5_.objects.list.splice(index, index + 1);
	CaME5_.objects.list.unshift(obj);
	console.info("Moved object to bottom with id: " + obj.id);
}

function Zby(obj, vol = 0) {
	var index = CaME5_.objects.list.findIndex(x => x.id == obj.id);
	remove(obj);

	CaME5_.objects.list.splice(index + vol, 0, obj);
}

/* - End Object Operations - */

function text(text, x, y, maxw = 0, color = "fff", state = true) {
	CaME5_.objects.last_id++;
	CaME5_.objects.list.push({
		id: CaME5_.objects.last_id,
		state: state,
		type: "text",
		text: text,
		color: color,
		x: x,
		y: y,
		maxw: maxw
	});
	return CaME5_.objects.list[CaME5_.objects.list.length - 1];
}
function drawText(obj) {
	color(obj.color);

	if (obj.maxw == 0) CaME5_.ctx.fillText(obj.text, obj.x, obj.y);
	else CaME5_.ctx.fillText(obj.text, obj.x, obj.y, obj.maxw);
}

function rect(x, y, w, h, color = "fff", state = true) {
	CaME5_.objects.last_id++;
	CaME5_.objects.list.push({
		id: CaME5_.objects.last_id,
		state: state,
		type: "rect",
		color: color,
		x: x,
		y: y,
		w: w,
		h: h
	});
	return CaME5_.objects.list[CaME5_.objects.list.length - 1];
}
function drawRect(obj) {
	color(obj.color);

	CaME5_.ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
}

function circle(x, y, r, color = "fff", state = true) {
	CaME5_.objects.last_id++;
	CaME5_.objects.list.push({
		id: CaME5_.objects.last_id,
		state: state,
		type: "circle",
		color: color,
		x: x,
		y: y,
		r: r
	});
	return CaME5_.objects.list[CaME5_.objects.list.length - 1];
}
function drawCircle(obj) {
	color(obj.color);

	CaME5_.ctx.beginPath();
	CaME5_.ctx.ellipse(obj.x, obj.y, obj.r, obj.r, 0, 0, 2* Math.PI); 
	CaME5_.ctx.closePath();
}

function color(color) {
	if (typeof color === "string" || typeof color === "number") {
		CaME5_.ctx.fillStyle = color;
		CaME5_.ctx.strokeStyle = color;
		return true;
	}
	else {
		console.warn("Unable to set color to '" + color + "'");
		return false;
	}
}