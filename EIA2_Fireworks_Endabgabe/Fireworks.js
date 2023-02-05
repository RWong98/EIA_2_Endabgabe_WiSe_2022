"use strict";
window.addEventListener("load", () => { hdlLoad(); });
let explosion = false;
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let x = 0;
let interval;
let colorWheel = document.querySelector("#color");
let speedRange = document.querySelector("#speed");
let sizeRange = document.querySelector("#size");
let updateRate = 50;
let color = "white";
let size = 50;
function hdlLoad() {
    instListener();
    //Resize
    canvas.height = 600;
    canvas.width = 700;
}
function instListener() {
    canvas.addEventListener("click", (e) => { startExplosion(e); });
    colorWheel.addEventListener("change", updateValues);
    speedRange.addEventListener("change", updateValues);
    sizeRange.addEventListener("change", updateValues);
}
function updateValues() {
    updateRate = parseInt(speedRange.value);
    color = colorWheel.value;
    size = parseInt(sizeRange.value);
}
function startExplosion(e) {
    if (explosion == false) {
        let rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        interval = setInterval(() => { explode(x, y); }, updateRate);
        explosion = true;
    }
    ;
}
function explode(xM, yM) {
    if (x <= 350) {
        x = x + 10;
        ctx.fillStyle = "rgba(40, 37, 56, 0.3)";
        ctx.fillRect(0, 0, 700, 600);
        ctx.fillStyle = color;
        ctx.fillRect(xM, yM + x, size, x);
        ctx.fillRect(xM, yM - x, size, -x);
        ctx.fillRect(xM + x, yM, x, size);
        ctx.fillRect(xM - x, yM, -x, size);
        ctx.fillRect(xM + x, yM + x, size, x);
        ctx.fillRect(xM - x, yM - x, size, -x);
        ctx.fillRect(xM + x, yM + x, x, size);
        ctx.fillRect(xM - x, yM - x, -x, size);
        ctx.fillRect(xM - x, yM + x, size, x);
        ctx.fillRect(xM + x, yM - x, size, -x);
        ctx.fillRect(xM + x, yM - x, x, size);
        ctx.fillRect(xM - x, yM + x, -x, size);
    }
    else {
        ctx.clearRect(0, 0, 700, 600);
        clearInterval(interval);
        x = 0;
        explosion = false;
    }
    ;
}
