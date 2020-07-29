const canvas = document.getElementById("canvas1");
const ctx1 = canvas.getContext("2d");
canvas1.width = 600;
canvas1.height = 900;

const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas.getContext("2d");
canvas2.width = 600;
canvas2.height = 900;

const canvas3 = document.getElementById("canvas3");
const ctx3 = canvas.getContext("2d");
canvas3.width = 600;
canvas3.height = 900;

// Global Variables
const grid = 75;
let keys = [];
let score = 0;
let frame = 0;
let gameSpeed = 1;

const logsArray = [];



class Froggo {
    constructor() {
        this.width = 50;
        this.height = 50;
        this.x = canvas.width / 2 - this.height / 2;
        this.y = canvas.height - this.height - 40;
        this.moving = false;
    };
    draw() {
        ctx2.fillStyle = "blueViolet";
        ctx2.fillRect(this.x, this.y, this.width, this.height);

    };
};

const froggo = new Froggo();

function move() {
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    froggo.draw();
    requestAnimationFrame(move);
};

move();
