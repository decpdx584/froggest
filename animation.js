function move() {
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    maintainLogs();
    froggo.draw();
    froggo.update();
    markScore();
    requestAnimationFrame(move);
}
move();

window.addEventListener("keydown", function(e) {
    keys = [];
    keys[e.keyCode] = true;
    if (keys[37] || keys[38] || keys[39] || keys[40] || keys[65] || keys[87] || keys[68] || keys[83]) {
        froggo.jump();
    }
});

window.addEventListener("keyup", function(e) {
    delete keys[e.keyCode];
    froggo.moving = false;
});

function scored() {
    score ++;
    gameSpeed += 0.25;
    froggo.x = canvas.width/2 - froggo.width/2;
    froggo.y = canvas.height - froggo.height - 40;
};

function markScore () {
    ctx3.fillStyle = "chartreuse";
    ctx3.fillRect(248, 5, grid*1.25, grid/2);
    ctx3.fillStyle = "black";
    ctx3.strokeStyle = "black";
    ctx3.font = "20px solid Times New Roman";
    ctx3.strokeText("Score: " + score, 265, 30);
};

function collision(obj1, obj2) {
    if (obj1.x > obj2.x + obj2.width ||
        obj1.x + obj1.width < obj2.x ||
        obj1.y > obj2.y + obj2.height ||
        obj1.y + obj1.height < obj2.y) {
        return true;
    }
};

function reset() {
    froggo.x = canvas.width/2 - froggo.width/2;
    froggo.y = canvas.height - froggo.height - 40;
    score = 0;
    gameSpeed = 1;
};
