class Froggo {
    constructor() {
        this.spriteWidth = 250;
        this.spriteHeight = 250;
        this.width = this.spriteWidth/5;
        this.height = this.spriteHeight/5;
        this.x = canvas.width/2 - this.width/2;
        this.y = canvas.height - this.height - 40;
        this.moving = false;
        this.frameX = 0;
        this.frameY = 0;
    }
    update() {
        if (keys[38] || keys[87]) {
            if (this.moving === false) {
                this.y -= grid;
                this.moving = true;
            }
        }
        if (keys[83] || keys[40]) {
            if (this.moving === false) {
                this.y += grid;
                this.moving = true;
            }
        }
        if (keys[37] || keys[65]) {
            if (this.moving === false) {
                this.x -= grid;
                this.moving = true;
            }
        }
        if (keys[39] || keys[68]) {
            if (this.moving === false) {
                this.x += grid;
                this.moving = true;
            }
        }
    }
    draw() {
        ctx2.fillStyle = "blueviolet";
        ctx2.fillRect(this.x, this.y, this.width, this.height);
    }
    jump() {
        console.log("jump");
    }
};

const froggo = new Froggo();