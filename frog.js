class Froggo {
    constructor() {
        this.spriteWidth = 250;
        this.spriteHeight = 250;
        this.width = this.spriteWidth / 5;
        this.height = this.spriteHeight / 5;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height - 40;
        this.moving = false;
        this.alive = true;
        this.onALog = false;
        this.speed = 0;
        this.frameX = 0;
        this.frameY = 0;
    }
    update() {
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