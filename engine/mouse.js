'use strict';

var mouseX = 0,
    mouseY = 0;

function getCursorPosition(e) {
    if (e.pageX != undefined && e.pageY != undefined) {
	   mouseX = e.pageX;
	   mouseY = e.pageY;
    }
    else {
	   mouseX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
	   mouseY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    mouseX -= public_ctx.canvas.offsetLeft;
    mouseY -= public_ctx.canvas.offsetTop;
}

function getElementClicked() {
    for (var i = objects.length - 1; i >= 0; i--) {
        if (objects[i].type == "rect" &&
            mouseX > objects[i].x &&
            mouseX < objects[i].x + objects[i].w &&
            mouseY > objects[i].y &&
            mouseY < objects[i].y + objects[i].h) {
                
            if (typeof objects[i].onclick === "function")
                return objects[i];
        }
        else if (objects[i].type == "circle" &&
                 Math.sqrt(Math.pow(Math.abs(objects[i].x - mouseX), 2) + Math.pow(Math.abs(objects[i].y - mouseY), 2)) <= objects[i].r) {
            return objects[i];
        }
    }
    return false;
}

function clickHandler() {
    var elem = getElementClicked();
    if (elem != false && typeof elem.onclick === "function") elem.onclick();
    if (typeof mouseClick === "function") mouseClick(); 
}