function move() {
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    froggo.draw();
    froggo.update();
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
    gameSpeed += 0.1;
    froggo.x = canvas.width/2 - froggo.width/2;
    froggo.y = canvas.height - froggo.height - 40;
}