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
    mouseX -= CaME5_.ctx.canvas.offsetLeft;
    mouseY -= CaME5_.ctx.canvas.offsetTop;
}

function getElementClicked() {
    for (var i = CaME5_.objects.list.length - 1; i >= 0; i--) {
        if (CaME5_.objects.list[i].type == "rect" &&
            mouseX > CaME5_.objects.list[i].x &&
            mouseX < CaME5_.objects.list[i].x + CaME5_.objects.list[i].w &&
            mouseY > CaME5_.objects.list[i].y &&
            mouseY < CaME5_.objects.list[i].y + CaME5_.objects.list[i].h) {
                
            if (typeof CaME5_.objects.list[i].onclick === "function")
                return CaME5_.objects.list[i];
        }
        else if (CaME5_.objects.list[i].type == "circle" &&
                 Math.sqrt(Math.pow(Math.abs(CaME5_.objects.list[i].x - mouseX), 2) + Math.pow(Math.abs(CaME5_.objects.list[i].y - mouseY), 2)) <= CaME5_.objects.list[i].r) {
            return CaME5_.objects.list[i];
        }
    }
    return false;
}

function clickHandler() {
    var elem = getElementClicked();
    if (elem != false && elem.state && typeof elem.onclick === "function") elem.onclick();
    if (typeof mouseClick === "function") mouseClick(); 
}
