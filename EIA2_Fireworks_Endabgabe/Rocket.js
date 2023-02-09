"use strict";
var Rockets;
(function (Rockets) {
    class Rocket {
        constructor(_spawnpoint, _color, _size, _particleAmount, _speed, _lifespan) {
            this.spawnpoint = _spawnpoint;
            this.color = _color;
            this.size = _size;
            this.particleAmount = _particleAmount;
            this.speed = _speed;
            this.lifespan = _lifespan;
            this.time = 0;
        }
        launch() {
            let interval;
            interval = setInterval(() => this.draw(interval), 100 / this.speed);
            Rockets.ctx.resetTransform();
        }
        draw(interval) {
            this.time += 10;
            Rockets.ctx.fillStyle = "rgba(40, 37, 56, 0.4)";
            Rockets.ctx.fillRect(0, 0, 700, 600);
            Rockets.ctx.fillStyle = this.color;
            for (let x = 0; x < this.particleAmount; x++) {
                Rockets.ctx.fillRect(this.spawnpoint.x + this.time * Math.random(), this.spawnpoint.y + this.time * Math.random(), this.size, this.size);
                Rockets.ctx.fillRect(this.spawnpoint.x + this.time * Math.random(), this.spawnpoint.y - this.time * Math.random(), this.size, this.size);
                Rockets.ctx.fillRect(this.spawnpoint.x - this.time * Math.random(), this.spawnpoint.y + this.time * Math.random(), this.size, this.size);
                Rockets.ctx.fillRect(this.spawnpoint.x - this.time * Math.random(), this.spawnpoint.y - this.time * Math.random(), this.size, this.size);
            }
            if (this.time > this.lifespan) {
                clearInterval(interval);
                Rockets.ctx.clearRect(0, 0, 700, 600);
            }
        }
    }
    Rockets.Rocket = Rocket;
})(Rockets || (Rockets = {}));
