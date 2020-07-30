class Log {
    constructor(x, y, width, height, speed, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.type = type;
    }
    draw() {
        if (this.type === "bigLogs" || this.type === "smallLogs" || this.type === "tinyLogs") {
            ctx1.drawImage(logPic, this.x, this.y + 18, this.width, this.height / 2);
        } else if (this.type === "lilyPads") {
            ctx1.drawImage(lilyPic, this.x, this.y + 18, this.width, this.height / 2);
        }
    };
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
    }
};

function goLogs() {
    for (let i = 0; i < 3; i++) {
        let x = i * 250;
        logsArray.push(new Log(x, canvas.height - grid * 2 - 20, grid * 1.5, grid, .65, "smallLogs"))
    }
    for (let i = 0; i < 2; i++) {
        let x = i * 550;
        logsArray.push(new Log(x, canvas.height - grid * 3 - 20, grid * 2.5, grid, -1, "bigLogs"))
    }
    for (let i = 0; i < 3; i++) {
        let x = i * 160;
        logsArray.push(new Log(x + 120, canvas.height - grid * 4 - 20, grid / 2, grid, 0, "lilyPads"))
    }
    for (let i = 0; i < 2; i++) {
        let x = i * 450;
        logsArray.push(new Log(x, canvas.height - grid * 5 - 20, grid * 2.5, grid, -2, "bigLogs"))
    }
    for (let i = 0; i < 3; i++) {
        let x = i * 200;
        logsArray.push(new Log(x, canvas.height - grid * 6 - 20, grid * 1.5, grid, .5, "smallLogs"))
    }
    for (let i = 0; i < 2; i++) {
        let x = i * 250;
        logsArray.push(new Log(x, canvas.height - grid * 7 - 20, grid * 1.5, grid, 1.15, "smallLogs"))
    }
    for (let i = 0; i < 2; i++) {
        let x = i * 220;
        logsArray.push(new Log(x + 160, canvas.height - grid * 8 - 20, grid / 2, grid, 0, "lilyPads"))
    }
    for (let i = 0; i < 2; i++) {
        let x = i * 350;
        logsArray.push(new Log(x, canvas.height - grid * 9 - 20, grid, grid, -3, "tinyLogs"))
    }
    for (let i = 0; i < 3; i++) {
        let x = i * 260;
        logsArray.push(new Log(x, canvas.height - grid * 10 - 20, grid * 1.5, grid, .5, "smallLogs"))
    }
};
goLogs();

function checkAlive() {
    if (froggo.x < 0 || froggo.x > canvas.width) {
        froggo.alive = false;
        reset();
    } else if (froggo.y < grid || froggo.y > canvas.height - grid - 20) {
        froggo.alive = true;
        froggo.speed = 0;
    } else {
        for (let i = 0; i < logsArray.length; i++) {
            if (collision(froggo, logsArray[i])) {
                froggo.onALog = true;
                froggo.speed = logsArray[i].speed;
                console.log(logsArray[i].speed);
                console.log(froggo.speed);
                return;
            }
        }
        froggo.alive = false;
        reset();
    }
};

// function frogOnALog() {
//     if (froggo.onALog) {
//          = 
//     }
// }

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