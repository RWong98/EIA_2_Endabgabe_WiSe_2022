window.addEventListener("load", () => {hdlLoad()});
let explosion: Boolean = false;
const canvas: HTMLCanvasElement = document.querySelector("#canvas") as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
let x: number = 0;
let interval: number;
let colorWheel: HTMLInputElement = document.querySelector("#color") as HTMLInputElement;
let speedRange: HTMLInputElement = document.querySelector("#speed") as HTMLInputElement;
let sizeRange: HTMLInputElement = document.querySelector("#size") as HTMLInputElement;
let updateRate: number = 50;
let color: string = "white";
let size: number = 50;
function hdlLoad() {
    instListener();
    //Resize
    canvas.height = 600;
    canvas.width = 700;
}

function instListener() {
    canvas.addEventListener("click", (e)=>{startExplosion(e);});
    colorWheel.addEventListener("change", updateValues);
    speedRange.addEventListener("change", updateValues);
    sizeRange.addEventListener("change", updateValues);
}
function updateValues(): void {
    updateRate = parseInt(speedRange.value);
    color = colorWheel.value;
    size = parseInt(sizeRange.value);
}

function startExplosion(e: MouseEvent): void{
    if(explosion == false){
    let rect = canvas.getBoundingClientRect();
    let x: number = e.clientX - rect.left;
    let y: number = e.clientY - rect.top;
    interval = setInterval(()=>{explode(x,y)}, updateRate);
    explosion = true;
    };
}

function explode(xM: number, yM: number): void {
    if (x<=350) {
        x = x + 10;
        ctx.fillStyle = "rgba(40, 37, 56, 0.3)";
        ctx.fillRect(0, 0, 700, 600);
        ctx.fillStyle = color;
        ctx.fillRect(xM,yM + x, size, x)
        ctx.fillRect(xM,yM - x, size, -x)
        ctx.fillRect(xM + x,yM, x, size)
        ctx.fillRect(xM - x,yM, -x, size)
        ctx.fillRect(xM + x,yM + x, size, x)
        ctx.fillRect(xM - x,yM - x, size, -x)
        ctx.fillRect(xM + x,yM + x, x, size)
        ctx.fillRect(xM - x,yM - x, -x, size)
        ctx.fillRect(xM - x,yM + x, size, x)
        ctx.fillRect(xM + x,yM - x, size, -x)
        ctx.fillRect(xM + x,yM - x, x, size)
        ctx.fillRect(xM - x,yM + x, -x, size)
    }
    else{
        ctx.clearRect(0, 0, 700, 600);
        clearInterval(interval);
        x=0;
        explosion = false;
    };
}