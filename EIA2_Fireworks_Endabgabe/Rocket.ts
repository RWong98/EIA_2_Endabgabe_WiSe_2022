namespace Rockets {

    export class Rocket {

        spawnpoint: Vector;
        color: string;
        size: number;
        particleAmount: number;
        speed: number;
        lifespan: number;
        time: number;

        constructor(_spawnpoint: Vector, _color: string, _size: number, _particleAmount: number, _speed: number, _lifespan: number) {
        this.spawnpoint = _spawnpoint
        this.color = _color
        this.size = _size
        this.particleAmount = _particleAmount
        this.speed = _speed
        this.lifespan = _lifespan
        this.time = 0;
        }

        launch(): void {
            let interval: number;
            interval = setInterval(() => this.draw(interval), 100/this.speed);
            ctx.resetTransform();
        }

        draw(interval: number): void {
                this.time += 10
                ctx.fillStyle = "rgba(40, 37, 56, 0.4)";
                ctx.fillRect(0, 0, 700, 600);
                ctx.fillStyle = this.color;
                for (let x: number = 0; x < this.particleAmount; x ++) {
                ctx.fillRect(this.spawnpoint.x + this.time* Math.random(), this.spawnpoint.y + this.time* Math.random(), this.size, this.size)
                ctx.fillRect(this.spawnpoint.x + this.time* Math.random(), this.spawnpoint.y - this.time* Math.random(), this.size, this.size)
                ctx.fillRect(this.spawnpoint.x - this.time* Math.random(), this.spawnpoint.y + this.time* Math.random(), this.size, this.size)
                ctx.fillRect(this.spawnpoint.x - this.time* Math.random(), this.spawnpoint.y - this.time* Math.random(), this.size, this.size)
                }
                if(this.time > this.lifespan) {
                    clearInterval(interval);
                    ctx.clearRect(0, 0, 700, 600);
                }
            }
        }

    }