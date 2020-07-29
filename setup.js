const canvas = document.getElementById("canvas1");
const ctx1 = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 900;

const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas.getContext("2d");
canvas2.width = 600;
canvas2.height = 900;

const canvas3 = document.getElementById("canvas3");
const ctx3 = canvas.getContext("2d");
canvas3.width = 600;
canvas3.height = 900;

const grid = 80;
let keys = [];
let score = 0;
let collisionCount = 0;
let frame = 0;
let gameSpeed = 1;

const logsArray = [];