"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Rockets;
(function (Rockets) {
    window.addEventListener("load", () => { hdlLoad(); });
    let explosion = false;
    Rockets.canvas = document.querySelector("#canvas");
    Rockets.ctx = Rockets.canvas.getContext("2d");
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
    //Rocket Parameter
    let color;
    let size;
    let particleAmount;
    let speed;
    let lifespan;
    let rName;
    //Server for Data
    const serverLink = "https://webuser.hs-furtwangen.de/~wongricc/Database/";
    function hdlLoad() {
        instListener();
        updateValues();
        //Resize
        Rockets.canvas.height = 600;
        Rockets.canvas.width = 700;
    }
    function instListener() {
        var _a;
        Rockets.canvas.addEventListener("click", (e) => { startExplosion(e); });
        (_a = document.querySelector("#submit")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => { sendData(e); });
        showButton.addEventListener("click", (e) => { showData(e); });
        loadButton.addEventListener("click", (e) => { loadData(e); });
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
    function sendData(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            updateValues();
            if (presetText.value != "") {
                anzeige.innerHTML = "";
                let response = yield fetch(serverLink + '?command=insert&collection=Rockets&data={"name": "' + rName + '","color":"' + hexToRgb(color) + '","size":' + size + ',"particleAmount":' + particleAmount + ',"speed":' + speed + ',"lifespan":' + lifespan + '}', {
                    method: "get"
                });
                let info = yield response.json();
                console.log(info);
            }
            else {
                anzeige.innerHTML = "Gib bitte einen Namen ein!";
            }
        });
    }
    function showData(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            let response = yield fetch(serverLink + '?command=find&collection=Rockets', {
                method: "get"
            });
            let info = yield response.json();
            let keyArray = Object.keys(info.data);
            let infoTroschka = new Array;
            console.log(info);
            for (let key of keyArray) {
                infoTroschka.push(yield info.data[key]);
            }
            anzeige.innerHTML = "";
            for (let data of infoTroschka) {
                anzeige.innerHTML += "Name: " + data.name + " Color: " + data.color + " Size: " + data.size + " P-Amount: " + data.particleAmount + " P-Speed: " + data.speed + data.lifespan + "<br>";
            }
        });
    }
    function loadData(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            let response = yield fetch(serverLink + '?command=find&collection=Rockets&data={"name":' + loadText.value + '}', {
                method: "get",
            });
            let info = yield response.json();
            let keyArray = Object.keys(info.data);
            let infoTroschka = new Array;
            console.log(info);
            for (let key of keyArray) {
                infoTroschka.push(yield info.data[key]);
            }
            for (let data of infoTroschka) {
                if (data.name == loadText.value) {
                    anzeige.innerHTML = "Name: " + data.name + " Color: " + data.color + " Size: " + data.size + " P-Amount: " + data.particleAmount + " P-Speed: " + data.speed + data.lifespan + "<br>";
                    rName = data.name;
                    color = data.color;
                    size = data.size;
                    particleAmount = data.particleAmount;
                    speed = data.speed;
                    lifespan = data.lifespan;
                    presetText.value = data.name;
                    colorWheel.value = data.color;
                    sizeRange.value = String(data.size);
                    particleRange.value = String(data.particleAmount);
                    speedRange.value = String(data.speed);
                    lifespanRange.value = String(data.lifespan);
                }
            }
        });
    }
    function hexToRgb(hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return "rgb(" + parseInt(result[1], 16) + "," + parseInt(result[2], 16) + "," + parseInt(result[3], 16) + ")";
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
