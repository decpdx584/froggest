class Log {
    constructor(x,y,width, height, speed, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.type = type;
    }
    draw() {
        ctx1.fillStyle = "brown";
        ctx1.fillRect(this.x, this.y + 15, this.width, this.height*.5);
    }
    update() {
        this.x += this.speed * gameSpeed;
        if (this.speed > 0) {
            if (this.x > canvas.width + this.width) {
            this.x = 0 - this.width;
            }
        } else {
            if (this.x < 0 - this.width*1.5) {
                this.x = canvas.width + this.width;
            }
        }
    }
};

function goLogs() {
    for (let i = 0; i < 3; i++) {
        let x = i * 250;
        logsArray.push(new Log(x, canvas.height - grid*2 - 20, grid*1.5, grid, .75, "smallLog"))
    }
    for (let i = 0; i < 2; i++) {
        let x = i * 550;
        logsArray.push(new Log(x, canvas.height - grid*3 -20, grid*2.5, grid, -1, "bigLog"))
    }
};
goLogs();

function maintainLogs() {
    for (let i = 0; i < logsArray.length; i++) {
        logsArray[i].update();
        logsArray[i].draw();
    }
};