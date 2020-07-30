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
        ctx1.fillRect(this.x, this.y + 15, this.width, this.height/2);
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
        logsArray.push(new Log(x, canvas.height - grid*2 - 20, grid*1.5, grid, .65, "smallLogs"))
    }
    for (let i = 0; i < 2; i++) {
        let x = i * 550;
        logsArray.push(new Log(x, canvas.height - grid*3 - 20, grid*2.5, grid, -1, "bigLogs"))
    }
    for (let i = 0; i < 3; i++) {
        let x = i * 180;
        logsArray.push(new Log(x + 80, canvas.height - grid*4 - 20, grid, grid, 0, "lilyPads"))
    }
    for (let i = 0; i < 2; i++) {
        let x = i * 450;
        logsArray.push(new Log(x, canvas.height - grid*5 - 20, grid*2.5, grid, -2, "bigLogs"))
    }
    for (let i = 0; i < 3; i++) {
        let x = i * 200;
        logsArray.push(new Log(x, canvas.height - grid*6 - 20, grid*1.5, grid, .5, "smallLogs"))
    }
    for (let i = 0; i < 2; i++) {
        let x = i * 250;
        logsArray.push(new Log(x, canvas.height - grid*7 - 20, grid*1.5, grid, 1.15, "smallLogs"))
    }
    for (let i = 0; i < 2; i++) {
        let x = i * 320;
        logsArray.push(new Log(x + 100, canvas.height - grid*8 - 20, grid, grid, 0, "lilyPads"))
    }
    for (let i = 0; i < 2; i++) {
        let x = i * 350;
        logsArray.push(new Log(x, canvas.height - grid*9 - 20, grid, grid, -3, "tinyLogs"))
    }
    for (let i = 0; i < 3; i++) {
        let x = i * 260;
        logsArray.push(new Log(x, canvas.height - grid*10 - 20, grid*1.5, grid, .5, "smallLogs"))
    }
};
goLogs();

function checkAlive() {
    if (froggo.y < 250 && froggo.y > canvas.height - grid) {
        froggo.alive = true;
    } else {
        for (let i = 0; i < logsArray.length[i]; i++) {
            if (collision(froggo, logsArray[i])) {
                console.log("hit!");
                froggo.x += logsArray[i].speed;
                froggo.alive = true;
            }
        }
        if (froggo.alive === false) {
            reset();
        }
    }
};

function maintainLogs() {
    for (let i = 0; i < logsArray.length; i++) {
        logsArray[i].update();
        logsArray[i].draw();
    // }
    // for (let i = 0; i < logsArray.length; i++) {
    //     let eachLog = logsArray[i]
    //     // console.log(collision(froggo, eachLog));
    // 
    }
};