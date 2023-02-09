"use strict";
var Rockets;
(function (Rockets) {
    window.addEventListener("load", () => { hdlLoad(); });
    let explosion = false;
    Rockets.canvas = document.querySelector("#canvas");
    Rockets.ctx = Rockets.canvas.getContext("2d");
    let x = 0;
    let interval;
    const colorWheel = document.querySelector("#color");
    const speedRange = document.querySelector("#speed");
    const sizeRange = document.querySelector("#size");
    const particleRange = document.querySelector("#particle");
    const lifespanRange = document.querySelector("#lifespan");
    const presetText = document.querySelector("#name");
    const loadText = document.querySelector("#load");
    const loadButton = document.querySelector("#loadButton");
    const anzeige = document.querySelector("#Anzeige");
    const showButton = document.querySelector("#showButton");
    //ROCKET PARAMETER
    let color;
    let size;
    let particleAmount;
    let speed;
    let lifespan;
    let rName;
    function hdlLoad() {
        instListener();
        updateValues();
        //Resize
        Rockets.canvas.height = 600;
        Rockets.canvas.width = 700;
    }
    function instListener() {
        Rockets.canvas.addEventListener("click", (e) => { startExplosion(e); });
        colorWheel.addEventListener("change", updateValues);
        speedRange.addEventListener("change", updateValues);
        particleRange.addEventListener("change", updateValues);
        lifespanRange.addEventListener("change", updateValues);
        sizeRange.addEventListener("change", updateValues);
        presetText.addEventListener("change", updateValues);
    }
    function updateValues() {
        color = colorWheel.value;
        size = parseInt(sizeRange.value);
        rName = presetText.value + "";
        speed = parseInt(speedRange.value);
        particleAmount = parseInt(particleRange.value);
        lifespan = parseInt(lifespanRange.value);
    }
    function startExplosion(e) {
        let rect = Rockets.canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        let spawnpoint = { x, y };
        let rocket = new Rockets.Rocket(spawnpoint, color, size, particleAmount, speed, lifespan);
        rocket.launch();
    }
})(Rockets || (Rockets = {}));
