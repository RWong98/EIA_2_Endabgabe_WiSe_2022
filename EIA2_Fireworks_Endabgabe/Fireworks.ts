namespace Rockets {

    window.addEventListener("load", () => { hdlLoad() });
    export const canvas: HTMLCanvasElement = document.querySelector("#canvas") as HTMLCanvasElement;
    export const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
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

    //Rocket Parameter
    let color: string;
    let size: number;
    let particleAmount: number;
    let speed: number;
    let lifespan: number;
    let rName: string;

    //Server for Data
    const serverLink: string = "https://webuser.hs-furtwangen.de/~wongricc/Database/";


    // Vector Interface
    export interface Vector {
        x: number,
        y: number
    }

    interface DataQuerry {
        status: string;
        data: { [key: string]: MainData };
    }
    interface MainData {
        name: string;
        color: string;
        size: number;
        particleAmount: number;
        speed: number;
        lifespan: number;
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

        document.querySelector("#submit")?.addEventListener("click", (e) => { sendData(e) });
        showButton.addEventListener("click", (e) => { showData(e) });
        loadButton.addEventListener("click", (e) => { loadData(e) });

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


    async function sendData(e: Event): Promise<void> {
        e.preventDefault();
        updateValues();
        if (presetText.value != "") {
            anzeige.innerHTML = "";
            let response: Response = await fetch(serverLink + '?command=insert&collection=Rockets&data={"name": "' + rName + '","color":"' + hexToRgb(color) + '","size":' + size + ',"particleAmount":' + particleAmount + ',"speed":' + speed + ',"lifespan":' + lifespan + '}', {
                method: "get"
            });
            let info: string = await response.json();
            console.log(info);
        }
        else {
            anzeige.innerHTML = "DE: Gib bitte einen Namen ein! <br>" + "GB: Please enter a name! <br>" + "WS: Fa'amolemole tu'u se igoa!";
        }
    }

    async function showData(e: Event): Promise<void> {
        e.preventDefault();
        let response: Response = await fetch(serverLink + '?command=find&collection=Rockets', {
            method: "get"
        });
        let info: DataQuerry = await response.json();
        let keyArray: string[] = Object.keys(info.data);
        let infoTroschka: Array<MainData> = new Array;
        console.log(info);
        for (let key of keyArray) {
            infoTroschka.push(await info.data[key]);
        }
        anzeige.innerHTML = "";
        for (let data of infoTroschka) {
            anzeige.innerHTML += "Name: " + data.name + " Color: " + data.color + "<br>" + " Size: " + data.size + " P-Amount: " + data.particleAmount + "<br>" + " P-Speed: " + data.speed + data.lifespan + "<br>" + "<br>";
        }

    }

    async function loadData(e: Event): Promise<void> {
        e.preventDefault();
        let response: Response = await fetch(serverLink + '?command=find&collection=Rockets&data={"name":' + loadText.value + '}', {
            method: "get",
        })
        let info: DataQuerry = await response.json();
        let keyArray: string[] = Object.keys(info.data);
        let infoTroschka: Array<MainData> = new Array;
        console.log(info);
        for (let key of keyArray) {
            infoTroschka.push(await info.data[key]);
        }

        for (let data of infoTroschka) {
            if (data.name == loadText.value) {
                anzeige.innerHTML = "Name: " + data.name + " Color: " + data.color + "<br>" + " Size: " + data.size + " P-Amount: " + data.particleAmount + "<br>" + " P-Speed: " + data.speed + data.lifespan + "<br>" + "<br>";
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

    }


    function hexToRgb(hex: string): string {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        let result: RegExpExecArray = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex) as RegExpExecArray;
        return "rgb(" + parseInt(result[1], 16) + "," + parseInt(result[2], 16) + "," + parseInt(result[3], 16) + ")";
    }


    function startExplosion(e: MouseEvent): void {
        let rect = canvas.getBoundingClientRect();
        let x: number = e.clientX - rect.left;
        let y: number = e.clientY - rect.top;
        let spawnpoint: Vector = { x, y };
        let rocket: Rocket = new Rocket(spawnpoint, color, size, particleAmount, speed, lifespan);
        rocket.launch();
    }

}