var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class ScoringObject {
    constructor(canvas) {
        this.canvas = canvas;
        this.leftLane = this.canvas.width / 6;
        this.middleLane = this.canvas.width / 2;
        this.rightLane = this.canvas.width / 6 * 5;
        const random = this.randomInteger(1, 3);
        if (random === 1) {
            this.positionX = this.leftLane;
        }
        if (random === 2) {
            this.positionX = this.middleLane;
        }
        if (random === 3) {
            this.positionX = this.rightLane;
        }
        this.positionY = 60;
    }
    move() {
        this.positionY += this.speed;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.positionX - this.image.width / 2, this.positionY);
    }
    collidesWithCanvasBottom() {
        if (this.positionY + this.image.height > this.canvas.height) {
            return true;
        }
        return false;
    }
    getPositionX() {
        return this.positionX;
    }
    getPositionY() {
        return this.positionY;
    }
    getImageWidth() {
        return this.image.width;
    }
    getImageHeight() {
        return this.image.height;
    }
    getPoints() {
        return this.points;
    }
    getLives() {
        return this._lives;
    }
    setSpeed(v) {
        this.speed += v;
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    randomInteger(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
class Box extends ScoringObject {
    constructor(canvas) {
        super(canvas);
        this.image = this.loadNewImage("assets/img/objects/box1.png");
        this.speed = 7;
        this.points = 0;
        this._lives = -1;
    }
}
class Screens {
    constructor() {
    }
    draw() {
    }
    writeTextToCanvas(ctx, text, xCoordinate, yCoordinate, fontSize = 20, color = "red", alignment = "center") {
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
class DeathScreen extends Screens {
    constructor(canvas, level) {
        super();
    }
    draw() {
        super.draw();
    }
}
class Game {
    constructor(canvas) {
        this.levelIndex = 0;
        this.step = () => {
            this.pause();
            if (this.paused === false && this.level.getTotalLives() > 0 && this.level.isComplete() === false) {
                this.level.logic(this.frameIndex);
                this.frameIndex = this.level.getFrameIndex();
                this.frameIndex++;
                this.player.move();
                this.level.collision();
                if (this.level.isComplete()) {
                    this.advanceToNextLevel();
                }
            }
            this.draw();
            requestAnimationFrame(this.step);
        };
        this.canvas = canvas;
        this.canvas.width = 650;
        this.canvas.height = window.innerHeight;
        this.player = new Player(this.canvas);
        this.levelArray = [
            new Level1(this.canvas, this.player),
            new Level2(this.canvas, this.player),
            new Level3(this.canvas, this.player),
            new Level4(this.canvas, this.player),
            new Level5(this.canvas, this.player),
            new Level6(this.canvas, this.player),
            new Level7(this.canvas, this.player),
            new Level8(this.canvas, this.player)
        ];
        this.advanceToNextLevel();
        this.frameIndex = 0;
        this.paused = true;
        this.keyListener = new KeyListener();
        console.log('start animation');
        requestAnimationFrame(this.step);
    }
    advanceToNextLevel() {
        this.level = this.levelArray[this.levelIndex];
        this.levelIndex++;
    }
    pause() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.keyListener.isKeyDown(KeyListener.KEY_ESC)) {
                this.paused = true;
            }
            else if (this.keyListener.isKeyDown(KeyListener.KEY_P)) {
                yield this.delay(1000);
                this.paused = false;
            }
        });
    }
    draw() {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, ` Level: ${this.levelIndex}`, this.canvas.width / 2, 20, 18);
        this.writeTextToCanvas(ctx, `Press ESC to pause`, this.canvas.width / 2 - 250, 20, 16);
        this.writeTextToCanvas(ctx, `Lives: ${this.level.getTotalLives()}`, this.canvas.width / 2 + 250, 20, 16);
        if (this.level.isComplete() === true) {
            this.writeTextToCanvas(ctx, `You Won!`, this.canvas.width / 2, 200, 40);
        }
        if (this.level.getTotalLives() <= 0) {
            this.writeTextToCanvas(ctx, `You Lost`, this.canvas.width / 2, 200, 40);
        }
        else if (this.paused === true) {
            this.writeTextToCanvas(ctx, `Paused`, this.canvas.width / 2, 200, 40);
            this.writeTextToCanvas(ctx, `Press P to start`, this.canvas.width / 2, 250, 35);
        }
        this.drawScore(ctx);
        this.player.draw(ctx);
        this.level.drawObjects(ctx);
    }
    drawScore(ctx) {
        this.writeTextToCanvas(ctx, `Score: ${this.level.getTotalScore()}`, this.canvas.width / 2, 80, 16);
    }
    writeTextToCanvas(ctx, text, xCoordinate, yCoordinate, fontSize = 20, color = "red", alignment = "center") {
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
class GoldTrophy extends ScoringObject {
    constructor(canvas) {
        super(canvas);
        this.image = this.loadNewImage("assets/img/objects/goldcoin.png");
        this.speed = 5;
        this.points = 10;
        this._lives = 0;
    }
}
class GreenCross extends ScoringObject {
    constructor(canvas) {
        super(canvas);
        this.image = this.loadNewImage("assets/img/objects/tilted_plus_health.png");
        this.speed = 9;
        this.points = 0;
        this._lives = 1;
    }
}
class KeyListener {
    constructor() {
        this.keyCodeStates = new Array();
        this.keyCodeTyped = new Array();
        this.previousState = new Array();
        window.addEventListener("keydown", (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
        });
        window.addEventListener("keyup", (ev) => {
            this.keyCodeStates[ev.keyCode] = false;
        });
    }
    onFrameStart() {
        this.keyCodeTyped = new Array();
        this.keyCodeStates.forEach((val, key) => {
            if (this.previousState[key] != val && !this.keyCodeStates[key]) {
                this.keyCodeTyped[key] = true;
                this.previousState[key] = val;
            }
        });
    }
    isKeyDown(keyCode) {
        return this.keyCodeStates[keyCode] == true;
    }
    isKeyTyped(keyCode) {
        return this.keyCodeTyped[keyCode] == true;
    }
}
KeyListener.KEY_ENTER = 13;
KeyListener.KEY_SHIFT = 16;
KeyListener.KEY_CTRL = 17;
KeyListener.KEY_ALT = 18;
KeyListener.KEY_ESC = 27;
KeyListener.KEY_SPACE = 32;
KeyListener.KEY_LEFT = 37;
KeyListener.KEY_UP = 38;
KeyListener.KEY_RIGHT = 39;
KeyListener.KEY_DOWN = 40;
KeyListener.KEY_DEL = 46;
KeyListener.KEY_1 = 49;
KeyListener.KEY_2 = 50;
KeyListener.KEY_3 = 51;
KeyListener.KEY_4 = 52;
KeyListener.KEY_5 = 53;
KeyListener.KEY_6 = 54;
KeyListener.KEY_7 = 55;
KeyListener.KEY_8 = 56;
KeyListener.KEY_9 = 57;
KeyListener.KEY_0 = 58;
KeyListener.KEY_A = 65;
KeyListener.KEY_B = 66;
KeyListener.KEY_C = 67;
KeyListener.KEY_D = 68;
KeyListener.KEY_E = 69;
KeyListener.KEY_F = 70;
KeyListener.KEY_G = 71;
KeyListener.KEY_H = 72;
KeyListener.KEY_I = 73;
KeyListener.KEY_J = 74;
KeyListener.KEY_K = 75;
KeyListener.KEY_L = 76;
KeyListener.KEY_M = 77;
KeyListener.KEY_N = 78;
KeyListener.KEY_O = 79;
KeyListener.KEY_P = 80;
KeyListener.KEY_Q = 81;
KeyListener.KEY_R = 82;
KeyListener.KEY_S = 83;
KeyListener.KEY_T = 84;
KeyListener.KEY_U = 85;
KeyListener.KEY_V = 86;
KeyListener.KEY_W = 87;
KeyListener.KEY_X = 88;
KeyListener.KEY_Y = 89;
KeyListener.KEY_Z = 90;
class Level {
    constructor(canvas, player) {
        this.scoringObject = new Array();
        this.speedSwitch = true;
        this.won = false;
        this.canvas = canvas;
        this.player = player;
        this.totalLives = 5;
        this.speedBoost = 0;
        this.totalScore = 0;
    }
    getTotalLives() {
        return this.totalLives;
    }
    getFrameIndex() {
        return this.frameIndex;
    }
    getTotalScore() {
        return this.totalScore;
    }
    isComplete() {
        return this.won;
    }
    logic(frameIndex) {
        this.frameIndex = frameIndex;
        if (this.totalScore >= this.maxPoints) {
            this.won = true;
        }
        if (this.totalScore < 0) {
            this.totalLives = 0;
        }
        const number = this.totalScore / 20;
        let difficultyVariable = this.baseSpawnRate - number;
        if (difficultyVariable < 15) {
            difficultyVariable = 15;
        }
        if (this.speedBoost < 5 && this.speedSwitch === true) {
            this.speedBoost = this.totalScore * 0.015;
        }
        else {
            this.speedSwitch = false;
            this.speedBoost = 5 - this.speedMultiplier + this.totalScore * 0.005;
        }
        if (frameIndex >= difficultyVariable) {
            console.log(difficultyVariable);
            this.createRandomScoringObject();
            this.frameIndex = 0;
        }
    }
    drawObjects(ctx) {
        this.scoringObject.forEach((object) => {
            if (object !== null) {
                object.draw(ctx);
            }
        });
    }
    collision() {
        this.scoringObject.forEach((object, index) => {
            if (object !== null) {
                object.move();
                if (this.player.collidesWith(object)) {
                    this.totalScore += object.getPoints();
                    this.totalLives += object.getLives();
                    this.scoringObject.splice(index, 1);
                }
                else if (object.collidesWithCanvasBottom()) {
                    this.scoringObject.splice(index, 1);
                }
            }
        });
    }
    createRandomScoringObject() {
        const random = this.randomInteger(1, 5);
        const plusLife = this.randomInteger(1, 40);
        if (plusLife === 6) {
            this.scoringObject.push(new GreenCross(this.canvas));
        }
        else if (random === 1) {
            this.scoringObject.push(new GoldTrophy(this.canvas));
        }
        else if (random === 2) {
            this.scoringObject.push(new SilverTrophy(this.canvas));
        }
        else if (random === 3) {
            this.scoringObject.push(new RedCross(this.canvas));
        }
        else if (random === 4) {
            this.scoringObject.push(new LightningBolt(this.canvas));
        }
        else if (random === 5) {
            this.scoringObject.push(new Box(this.canvas));
        }
        const last_element = this.scoringObject.length - 1;
        console.log(this.speedBoost + this.speedMultiplier);
        this.scoringObject[last_element].setSpeed(this.speedBoost + this.speedMultiplier);
    }
    randomInteger(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
class Level1 extends Level {
    constructor(canvas, player) {
        super(canvas, player);
        this.baseSpawnRate = 100;
        this.maxPoints = 100;
        this.speedMultiplier = 0, 5;
    }
}
class Level2 extends Level {
    constructor(canvas, player) {
        super(canvas, player);
        this.baseSpawnRate = 90;
        this.maxPoints = 200;
        this.speedMultiplier = 1;
    }
}
class Level3 extends Level {
    constructor(canvas, player) {
        super(canvas, player);
        this.baseSpawnRate = 75;
        this.maxPoints = 400;
        this.speedMultiplier = 1;
    }
}
class Level4 extends Level {
    constructor(canvas, player) {
        super(canvas, player);
        this.baseSpawnRate = 70;
        this.maxPoints = 800;
        this.speedMultiplier = 1.5;
    }
}
class Level5 extends Level {
    constructor(canvas, player) {
        super(canvas, player);
        this.baseSpawnRate = 65;
        this.maxPoints = 1000;
        this.speedMultiplier = 2;
    }
}
class Level6 extends Level {
    constructor(canvas, player) {
        super(canvas, player);
        this.baseSpawnRate = 60;
        this.maxPoints = 1200;
        this.speedMultiplier = 2.5;
    }
}
class Level7 extends Level {
    constructor(canvas, player) {
        super(canvas, player);
        this.baseSpawnRate = 55;
        this.maxPoints = 1400;
        this.speedMultiplier = 3;
    }
}
class Level8 extends Level {
    constructor(canvas, player) {
        super(canvas, player);
        this.baseSpawnRate = 50;
        this.maxPoints = 1600;
        this.speedMultiplier = 3.5;
    }
}
class LightningBolt extends ScoringObject {
    constructor(canvas) {
        super(canvas);
        this.image = this.loadNewImage("assets/img/objects/titled_yellow_power_icon.png");
        this.speed = 7;
        this.points = -10;
        this._lives = 0;
    }
}
class Player {
    constructor(canvas) {
        this.canvas = canvas;
        this.leftLane = this.canvas.width / 6;
        this.middleLane = this.canvas.width / 2;
        this.rightLane = this.canvas.width / 6 * 5;
        this.keyListener = new KeyListener();
        this.keyUp = true;
        this.image = this.loadNewImage("./assets/img/players/carplayer.png");
        this.positionX = this.canvas.width / 2;
    }
    move() {
        if (this.keyUp == false) {
            this.keyUp = true;
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT) && this.keyUp == true) {
            console.log("pressed");
            this.keyUp = false;
        }
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.positionX - this.image.width / 2, this.canvas.height - 150);
    }
    collidesWith(scoringObject) {
        if (this.positionX < scoringObject.getPositionX() + scoringObject.getImageWidth()
            && this.positionX + this.image.width > scoringObject.getPositionX()
            && this.canvas.height - 150 < scoringObject.getPositionY() + scoringObject.getImageHeight()
            && this.canvas.height - 150 + this.image.height > scoringObject.getPositionY()) {
            return true;
        }
        return false;
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
class RedCross extends ScoringObject {
    constructor(canvas) {
        super(canvas);
        this.image = this.loadNewImage("assets/img/objects/cone.png");
        this.speed = 6;
        this.points = 0;
        this._lives = -1;
    }
}
class SilverTrophy extends ScoringObject {
    constructor(canvas) {
        super(canvas);
        this.image = this.loadNewImage("assets/img/objects/silvercoin.png");
        this.speed = 5;
        this.points = 5;
        this._lives = 0;
    }
}
<<<<<<< HEAD
=======
class BlueLightningBolt extends ScoringObject {
    constructor(canvas) {
        super(canvas);
        this.image = this.loadNewImage("assets/img/objects/box1.png");
        this.speed = 7;
        this.points = 0;
        this._lives = -1;
    }
}
>>>>>>> 8e7f0a3ad5638ecbd2d0d7433c01bef36c60a05e
console.log("Javascript is working!");
window.addEventListener('load', () => {
    console.log("Handling the Load event");
    const game = new Game(document.getElementById('canvas'));
});
//# sourceMappingURL=app.js.map