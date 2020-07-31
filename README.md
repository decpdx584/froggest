# Froggest!
This is my repo for my Frogger game, built with HTML, CSS, and JavaScript with canvas

## Outline
Very basically, I've emulated a Frogger game. You're a frog from Portland, OR and you're just trying to get back to your beautiful pad in the woods. For some reason, though, you keep ending up back in Vancouver, WA😰. Every time you make it across the Columbia River to the other shore and up into the woods, you score a point but you're brought back to the start. It's like Groundhog Day but with a twist: the currents carrying the logs up and down stream get stronger every time you score. It gets ever harder to make it back again!

## MVP
- render frog and obstacles
- logs move up and down stream (speed depends on size), lily pads are stationary and small
- when frog lands on obstacles s/he moves with them at their speed
- game speeds up every time player scores

## Technology Implemented

### HTML
Early on in the development of this game I learned that I needed to separate my JavaScript into a few different files. I also needed to overlay a few canvases on top of each other.

### CSS
Because I put all my canvases into a div called *shebang* I was able to give them all a single background separate from the body's background image:
```css
body {
    background-image: url("https://i.imgur.com/nPssgwW.jpg");
    background-size: cover;
}

.shebang {
    border: 5px solid brown;
    top: 50%;
    left: 50%;
    position: absolute;
    width: 600px;
    height: 900px;
    transform: translate(-50%, -50%);
    background-image: url("https://i.imgur.com/GXqXwjkb.png?1");
    background-size: cover;
}

canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%
}
```

### JavaScript
My *setup.js* is where I've declared all my global variables, set up empty arrays, and even grabbed image sources (mostly from my personal Imgur account).

My *frog.js* is where I set up my frog with a constructor function:
```javascript
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
```
Earlier on in the development I had a few more variables set up in that cunstructor; I had a stretch goal of using sprite animation that I later abandoned (at least until I have time to revisit this project after the deadline).
The update() function within is where I dictate which keys would move the frog in which direction. It was important to me that WASD work as well as the arrow keys.

My *logs.js* is where I did some of my proudest work. After about 6-7 hours of research (Google-Fu FTW!) I was able to build my goLogs function:
```javascript
function goLogs() {
    for (let i = 0; i < 3; i++) { //a for-loop generates a group of three logs...
        let x = i * 250; //that are 250px apart...
        logsArray.push(new Log(x, canvas.height - grid * 2 - 20, grid * 1.5, grid, .65, "smallLogs")) //using the log constructor function, which gives each log x and y coordinates, width, height, speed, and type
    }
```
The problem after all this work (I did this for each of 9 "lanes" in my river) was that once the logs passed the edge of the screen they were gone, never to return. The hard part was when I went back into the update() section of my log constructor and added this:
```javascript
update() {
        this.x += this.speed * gameSpeed; //links the log's speed to an overall gameSpeed I declared back in setup.js
        if (this.speed > 0) { //if the log speed is positive (moving to the right)...
            if (this.x > canvas.width + this.width) { //when its left end is it's length past the right edge of the canvas...
                this.x = 0 - this.width; //it gets regenerated behind the left edge of the canvas
            }
        } else { //if its speed is negative (going left)...
            if (this.x < 0 - this.width * 1.5) { //when the log's fully off the left edge of the canvas...
                this.x = canvas.width + this.width; // it's regenerated behind the right edge of the canvas
            }
        }
    }
```
I was super proud of that piece! But the pride was short-lived...
This *log.js* is also the site of my HUGEST pain during the development of this game. It's where I call the collision detection into play and try to stick my frog to those logs. After MANY hours of banging my head against the desk and then a couple hours with my instructors' input, we were FINALLY able to bang this out:
```javascript
function checkAlive() {
    if (froggo.x < 0 || froggo.x > canvas.width) { 
        froggo.alive = false;
        reset(); //if the frog goes off-screen to the left or right, he goes back to shore and score goes to zero. GAME OVER, MYAN!
    } else if (froggo.y < grid || froggo.y > canvas.height - grid - 20) {
        froggo.alive = true;
        froggo.speed = 0; //if the frog is on either river bank, he's safe and stays put
    } else {
        for (let i = 0; i < logsArray.length; i++) { //otherwise, check every log on screen...
            if (collision(froggo, logsArray[i])) { //and if the frog connects with any of them...
                froggo.onALog = true;
                froggo.speed = logsArray[i].speed; // he sticks to them and maintains their speed..
                return;
            }
        }
        froggo.alive = false; //if he doesn't connect with one, he's GONZO
        reset();
    }
};
```
The reason it was such a mammoth function to suss out is that the order of these if/else statements was jumbled imperceptibly (to me, at least) AND this whole checkAlive function needed to be called NOT ONLY during the game loop but EVERY TIME the frog jumps (the latter was missing for FAR TOO LONG😅).

And that brings me to *animation.js*. Herein lies my game loop, which I call move():
```javascript
function move() {
    ctx2.clearRect(0, 0, canvas.width, canvas.height); //clear the entire canvas (all three)...
    ctx1.drawImage(forestPic, 0, 0, canvas.width, grid); // draw the goal shore on top...
    ctx1.drawImage(cityPic, 0, canvas.height - grid, canvas.width, grid); //draw the crappy shore the frog's trying to escape on the bottom...
    maintainLogs(); //start manifesting those logs...
    froggo.update(); //tell the frog where to go...
    froggo.draw(); //then draw him there...
    checkAlive(); //see if he's safe (not in the water or off-screen)...
    markScore(); //if frog's jumping into the woods, bump the score and put him back on the crappy shore...
    requestAnimationFrame(move); //rinse and repeat.
}
move(); //get this show on the road.
```
... and this scored function is what speeds the game up incrementally:
```javascript
function scored() {
    score++; //bumpt the score by 1...
    gameSpeed += 0.25; //speed up by 25%...
    froggo.x = canvas.width / 2 - froggo.width / 2;
    froggo.y = canvas.height - froggo.height - 40; //put the frog back in Vancouver (bottom shore)
};
```

## Challenges
There were quite a few, lemme tell ya!
My biggest one may have been knowing when to take a break/call it a night. Sometimes I'm like a dog with a bone when there's a problem I'm trying to solve. Historically I've been pretty efficient at solving problems or figuring out how to avoid them, so I don't have TONS of experience with that "It's not gonna happen right now" feeling. This course is definitely humbling me in that way. I'm CERTAIN I need it, though.

Since I've been slower on the uptake with a lot of this stuff I've struggled with meeting dealines. I MAAAAAY be getting better but I'm not there yet. So, I ended up not having enough time to execute some stretch goals of mine.
- I wanted to incorprate sprite animation for my frog.
- I wanted to add sound effects
- I wanted to have a bug randomly appear on logs throughout and attach some kind of bonus (time or points) to catching them
- I wanted to have a modal onload to explain the story and controls
This last one is the one I was working on just before I decided to throw in the towel for the evening. I still have commented-out code referencing it, hoping I might be able to pull a rabbit out of the hat tomorrow morning before I have to present. But, for my own sanity, I need to call it a night.

## Conclusion
Overall, I'm pretty proud of this game I built, especially considering I had NO IDEA how to do ANY of this a couple weeks ago. I'll say, though: I thought making a game might have been a bit more fun than it was work, but alas...😅
I plan to acheieve each one of these aforementioned stretch goals in the coming days or weeks (or months? let's see how this course goes). I'm a man of integrity, so I'll make an addendum here describing what I've added and when so as not to give the wrong impression later on.