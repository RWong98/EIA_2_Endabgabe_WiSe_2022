namespace Rockets {

    window.addEventListener("load", () => { hdlLoad() });
    let explosion: Boolean = false;
    export const canvas: HTMLCanvasElement = document.querySelector("#canvas") as HTMLCanvasElement;
    export const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
    let x: number = 0;
    let interval: number;
    const colorWheel: HTMLInputElement = document.querySelector("#color") as HTMLInputElement;
    const speedRange: HTMLInputElement = document.querySelector("#speed") as HTMLInputElement;
    const sizeRange: HTMLInputElement = document.querySelector("#size") as HTMLInputElement;
    const particleRange: HTMLInputElement = document.querySelector("#particle") as HTMLInputElement;
    const lifespanRange: HTMLInputElement = document.querySelector("#lifespan") as HTMLInputElement;
    const presetText: HTMLInputElement = document.querySelector("#name") as HTMLInputElement;
    const loadText: HTMLInputElement = document.querySelector("#load") as HTMLInputElement;
    const loadButton: HTMLInputElement = document.querySelector("#loadButton") as HTMLInputElement;
    const anzeige: HTMLElement = document.querySelector("#Anzeige") as HTMLElement;
    const showButton: HTMLInputElement = document.querySelector("#showButton") as HTMLInputElement;

    //ROCKET PARAMETER
    let color: string;
    let size: number;
    let particleAmount: number;
    let speed: number;
    let lifespan: number;
    let rName: String;

    // VECTOR INTERFACE
    export interface Vector {
        x: number,
        y: number
    }


    function hdlLoad() {
        instListener();
        updateValues();
        //Resize
        canvas.height = 600;
        canvas.width = 700;
    }

    function instListener() {
        canvas.addEventListener("click", (e) => { startExplosion(e); });
        colorWheel.addEventListener("change", updateValues);
        speedRange.addEventListener("change", updateValues);
        particleRange.addEventListener("change", updateValues);
        lifespanRange.addEventListener("change", updateValues);
        sizeRange.addEventListener("change", updateValues);
        presetText.addEventListener("change", updateValues);

    }
    function updateValues(): void {
        color = colorWheel.value;
        size = parseInt(sizeRange.value);
        rName = presetText.value + "";
        speed = parseInt(speedRange.value);
        particleAmount = parseInt(particleRange.value);
        lifespan = parseInt(lifespanRange.value)
    }

    function startExplosion(e: MouseEvent): void{
        let rect = canvas.getBoundingClientRect();
        let x: number = e.clientX - rect.left;
        let y: number = e.clientY - rect.top;
        let spawnpoint: Vector = {x, y};
        let rocket: Rocket = new Rocket(spawnpoint, color, size, particleAmount, speed, lifespan);
        rocket.launch();
    }

}