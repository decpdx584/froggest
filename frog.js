class Froggo {
    constructor() {
        this.width = 50;
        this.height = 50;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height - 40;
        this.moving = false;
        this.alive = true;
        this.onALog = false;
        this.speed = 0;
    }
    update() {
        // I believe this can be a switch statement 
        // would make it even cleaner
        // nested if's can be ugly if you know what I mean
        this.x += this.speed * gameSpeed;
        if (this.speed > 0) {
            if (this.x > canvas.width + this.width) {
                this.x = 0 - this.width;
            }
        } else {
            if (this.x < 0 - this.width * 1.5) {
                this.x = canvas.width + this.width;
            }
        }
        if (keys[38] || keys[87]) {
            if (this.moving === false) {
                this.y -= grid;
                this.moving = true;
            }
        }
        if (keys[83] || keys[40]) {
            if (this.moving === false && this.y < canvas.height - this.height * 2) {
                this.y += grid;
                this.moving = true;
            }
        }
        if (keys[37] || keys[65]) {
            if (this.moving === false && this.x > this.width) {
                this.x -= grid;
                this.moving = true;
            }
        }
        if (keys[39] || keys[68]) {
            if (this.moving === false && this.x < canvas.width - this.width * 2) {
                this.x += grid;
                this.moving = true;
            }
        }
        if (this.y < 0) scored();

    }
    draw() {
        ctx2.drawImage(froggoPic, froggo.x, froggo.y, this.width, this.height);
    }
    jump() {
        console.log("jump");
        froggo.update();
        checkAlive();
    }
};

const froggo = new Froggo();