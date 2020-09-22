function move() {
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    ctx1.drawImage(forestPic, 0, 0, canvas.width, grid);
    ctx1.drawImage(cityPic, 0, canvas.height - grid, canvas.width, grid);
    maintainLogs();
    froggo.update();
    froggo.draw();
    checkAlive();
    markScore();
    requestAnimationFrame(move);
}
move();

window.addEventListener("keydown", function (e) {
    keys = [];
    keys[e.keyCode] = true;
    if (keys[37] || keys[38] || keys[39] || keys[40] || keys[65] || keys[87] || keys[68] || keys[83]) {
        froggo.jump();
    }
});

window.addEventListener("keyup", function (e) {
    delete keys[e.keyCode];
    froggo.moving = false;
});

function scored() {
    score++;
    gameSpeed += 0.25;
    froggo.x = canvas.width / 2 - froggo.width / 2;
    froggo.y = canvas.height - froggo.height - 40;
};

function markScore() {
    ctx3.fillStyle = "chartreuse"; //Sarah would flip her lid about this 🤮 lol
    ctx3.fillRect(248, 5, grid * 1.25, grid / 2);
    ctx3.fillStyle = "black";
    ctx3.strokeStyle = "black";
    ctx3.font = "20px solid Times New Roman";
    ctx3.strokeText("Score: " + score, 265, 30);
};

// if you wanted your edge case(where the frog looks like it is floating) to be less visible
// you could edit this to make the logs "harder to land on"
// this of course would only make it more difficult to win soooooo 🤷‍♂️
function collision(froggo, log) {
    return !(froggo.x > log.x + log.width ||
        froggo.x + froggo.width < log.x ||
        froggo.y > log.y + log.height ||
        froggo.y + froggo.height < log.y)
};

function reset() {
    froggo.x = canvas.width / 2 - froggo.width / 2;
    froggo.y = canvas.height - froggo.height - 40;
    score = 0;
    froggo.speed = 0;
    gameSpeed = 1;
};
