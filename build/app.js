var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Game {
    constructor(canvas) {
        this.frameCount = 0;
        this.animate = () => {
            requestAnimationFrame(this.animate);
            this.now = Date.now();
            this.elapsed = this.now - this.then;
            if (this.elapsed > this.fpsInterval) {
                this.then = this.now - (this.elapsed % this.fpsInterval);
                this.currentScreen.gameLogic();
                if (this.currentScreen.getState() == ScreenState.NEXT_SCREEN) {
                    this.advanceToNextLevel();
                }
                else if (this.currentScreen.getState() == ScreenState.RESTART) {
                    this.load(1);
                }
                else if (this.currentScreen.getState() == ScreenState.DIED) {
                    this.screenIndex = this.screenArray.length - 1;
                    this.advanceToNextLevel();
                }
                this.draw();
                let sinceStart = this.now - this.startTime;
                let currentFps = Math.round(1000 / (sinceStart / ++this.frameCount) * 100) / 100;
            }
        };
        this.canvas = canvas;
        this.canvas.width = window.innerHeight * 1.77777777778;
        this.canvas.height = window.innerHeight;
        this.load(0);
    }
    load(screenIndex) {
        this.screenIndex = screenIndex;
        this.player = new Player(this.canvas);
        this.screenArray = [
            new StartScreen(this.canvas),
            new Level1(this.canvas, this.player),
            new QLevel1(this.canvas, this.player),
            new LevelWon(this.canvas),
            new Level2(this.canvas, this.player),
            new LevelWon(this.canvas),
            new Level3(this.canvas, this.player),
            new LevelWon(this.canvas),
            new Level4(this.canvas, this.player),
            new LevelWon(this.canvas),
            new Level5(this.canvas, this.player),
            new LevelWon(this.canvas),
            new Level6(this.canvas, this.player),
            new LevelWon(this.canvas),
            new Level7(this.canvas, this.player),
            new LevelWon(this.canvas),
            new Level8(this.canvas, this.player),
            new GameWon(this.canvas),
            new DeathScreen(this.canvas)
        ];
        this.advanceToNextLevel();
        console.log('start animation');
        this.startAnimating(70);
    }
    advanceToNextLevel() {
        this.currentScreen = this.screenArray[this.screenIndex];
        this.screenIndex++;
    }
    startAnimating(fps) {
        this.fpsInterval = 1000 / fps;
        this.then = Date.now();
        this.startTime = this.then;
        console.log(this.startTime);
        this.animate();
    }
    draw() {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.currentScreen.draw(ctx);
        this.player.draw(ctx);
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
class Player {
    constructor(canvas) {
        this.Left = 0;
        this.Right = 0;
        this.canvas = canvas;
        this.leftLane = this.canvas.width / 24 * 9;
        this.middleLane = this.canvas.width / 2;
        this.rightLane = this.canvas.width / 24 * 15;
        this.keyListener = new KeyListener();
        this.image = this.loadNewImage("./assets/img/players/carplayer.png");
        this.positionX = this.middleLane;
    }
    move() {
        this.animatePlayer();
        if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT)) {
            this.Left += 1;
        }
        else {
            this.Left = 0;
        }
        if (this.Left === 1) {
            if (this.positionX == this.rightLane) {
                this.toGoLane = this.middleLane;
                this.goLeft = true;
            }
            else if (this.positionX == this.middleLane) {
                this.toGoLane = this.leftLane;
                this.goLeft = true;
            }
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT)) {
            this.Right += 1;
            if (this.Right === 1) {
                if (this.positionX == this.leftLane) {
                    this.toGoLane = this.middleLane;
                    this.goLeft = false;
                }
                else if (this.positionX == this.middleLane) {
                    this.toGoLane = this.rightLane;
                    this.goLeft = false;
                }
            }
        }
        else {
            this.Right = 0;
        }
    }
    animatePlayer() {
        if (this.goLeft == true) {
            if (this.positionX >= this.toGoLane) {
                this.positionX = this.positionX - 22;
                if (this.positionX < this.toGoLane) {
                    this.positionX = this.toGoLane;
                }
            }
        }
        else if (this.goLeft == false) {
            if (this.positionX <= this.toGoLane) {
                this.positionX = this.positionX + 22;
                if (this.positionX > this.toGoLane) {
                    this.positionX = this.toGoLane;
                }
            }
        }
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.positionX - this.image.width / 2, this.canvas.height - 175);
    }
    collidesWith(scoringObject) {
        if (this.positionX < scoringObject.getPositionX() + scoringObject.getImageWidth()
            && this.positionX + this.image.width > scoringObject.getPositionX()
            && this.canvas.height - 175 < scoringObject.getPositionY() + scoringObject.getImageHeight()
            && this.canvas.height - 175 + this.image.height > scoringObject.getPositionY()) {
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
class ScoringObject {
    constructor(canvas) {
        this.canvas = canvas;
        this.leftLane = this.canvas.width / 24 * 9;
        this.middleLane = this.canvas.width / 2;
        this.rightLane = this.canvas.width / 24 * 15;
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
        this.positionY = window.innerHeight - (window.innerHeight + 50);
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
var ScreenState;
(function (ScreenState) {
    ScreenState[ScreenState["PLAYING"] = 0] = "PLAYING";
    ScreenState[ScreenState["NEXT_SCREEN"] = 1] = "NEXT_SCREEN";
    ScreenState[ScreenState["DIED"] = 2] = "DIED";
    ScreenState[ScreenState["PAUSED"] = 3] = "PAUSED";
    ScreenState[ScreenState["QUESTION"] = 4] = "QUESTION";
    ScreenState[ScreenState["RESTART"] = 5] = "RESTART";
})(ScreenState || (ScreenState = {}));
class Screens {
    constructor() {
        this.state = ScreenState.PLAYING;
        this.keyListener = new KeyListener;
        this.state = ScreenState.PLAYING;
    }
    getState() {
        return this.state;
    }
    writeTextToCanvas(ctx, text, xCoordinate, yCoordinate, fontSize = 20, color = "red", alignment = "center") {
        ctx.font = `${fontSize}px sans-serif`;
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        ctx.strokeText(text, xCoordinate, yCoordinate);
        ctx.fillStyle = color;
        ctx.stroke();
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
    randomInteger(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
console.log("Javascript is working!");
window.addEventListener('load', () => {
    console.log("Handling the Load event");
    const game = new Game(document.getElementById('canvas'));
});
class Questions extends Screens {
    constructor(canvas, player) {
        super();
        this.questionCounter = 0;
        this.player = player;
        this.canvas = canvas;
        this.reset(0);
    }
    reset(resetNumber) {
        if (resetNumber == 1) {
            this.questionArray.splice(this.questionI, 1);
            this.leftOrRight = undefined;
            this.questionIsRight = undefined;
        }
        this.questionConfirmed = false;
        this.pickedQuestion = false;
    }
    gameLogic() {
        this.player.move();
        if (this.pickedQuestion == false) {
            this.questionI = this.randomInteger(0, this.questionArray.length);
            this.currentQuestion = this.questionArray[this.questionI].question;
            this.currentOptions = this.questionArray[this.questionI].choices;
            this.currentAnswer = this.questionArray[this.questionI].answer;
            this.currentExplanation = this.questionArray[this.questionI].explanation;
            this.pickedQuestion = true;
        }
        console.log(this.leftOrRight, this.questionConfirmed);
        if (this.questionConfirmed == false) {
            if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT) || this.leftOrRight == 1) {
                this.leftOrRight = 1;
            }
            if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT) || this.leftOrRight == 2) {
                this.leftOrRight = 2;
            }
        }
        this.questionCheck();
        if (this.questionConfirmed == true && this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
            this.questionCounter++;
            if (this.questionCounter == 2) {
                this.state = ScreenState.NEXT_SCREEN;
                this.questionCounter = 0;
            }
            else {
                this.reset(1);
            }
        }
    }
    questionCheck() {
        if (this.leftOrRight == 1 || this.leftOrRight == 2) {
            if (this.keyListener.isKeyDown(KeyListener.KEY_UP) || this.questionConfirmed == true) {
                this.questionConfirmed = true;
                if (this.currentAnswer == this.leftOrRight) {
                    this.questionIsRight = true;
                }
                else {
                    this.questionIsRight = false;
                }
            }
        }
    }
    draw(ctx) {
        if (this.questionConfirmed == false) {
            for (let i = 0; i < this.currentQuestion.length; i++) {
                this.writeTextToCanvas(ctx, this.currentQuestion[i], this.canvas.width / 2, 50 + i * 50, 40);
            }
            this.writeTextToCanvas(ctx, this.currentOptions[0], this.canvas.width / 2 - 350, 170, 40);
            this.writeTextToCanvas(ctx, this.currentOptions[1], this.canvas.width / 2 + 350, 170, 40);
        }
        else {
            this.writeTextToCanvas(ctx, "Press ENTER for the next question!", this.canvas.width / 2, 150, 45);
        }
        if (this.questionIsRight != undefined) {
            for (let i = 0; i < this.currentExplanation.length; i++) {
                this.writeTextToCanvas(ctx, this.currentExplanation[i], this.canvas.width / 2, 400 + 50 * i, 40);
            }
        }
        if (this.questionIsRight == true) {
            this.writeTextToCanvas(ctx, "That was the correct answer!", this.canvas.width / 2, 250, 40, "white");
        }
        else if (this.questionIsRight == false) {
            this.writeTextToCanvas(ctx, "That was not the correct answer!", this.canvas.width / 2, 250, 40, "white");
        }
    }
}
class QLevel1 extends Questions {
    constructor(canvas, player) {
        super(canvas, player);
        this.questionArray = [
            {
                question: ["Wat moet je doen wanneer je een vreemde email krijgt van een onbekende?"],
                choices: ["verwijder de email ", " rapporteer en blokkeer "],
                answer: 2,
                explanation: [["Je kan zo zorgen dat google  er iets tegen kan doen."],
                    "Ook krijg je dan geen emails meer."]
            }, {
                question: ["Wat is een goed wachtwoord?"],
                choices: ["1234", " W0nderwa11$"],
                answer: 2,
                explanation: ["1234 is heel makkelijk om voor hackers achter te komen.",
                    "W0nderwa11$ is dat niet door de tekens"]
            }, {
                question: ["Tegen welke mensen vertel je inloggegevens"],
                choices: ["Niemand of je ouders", "Je vrienden"],
                answer: 1,
                explanation: [" Je kan  je ouders vertrouwen",
                    "En je vrienden niet perse."]
            }, {
                question: ["Je krijgt van iemand die je niet kent een sms",
                    "en hij stelt persoonlijke vragen wat doe je?"],
                choices: ["Blokkeer diegene en vertel het aan je ouders ", " ga met de persoon in gesprek"],
                answer: 1,
                explanation: ["Je moet nooit beantwoorden.",
                    "Hierdoor weten ze niks"]
            }, {
                question: ["Welke gegevens deel je niet op je sociale media?"],
                choices: ["je adres en je persoonlijke telefoonnummer ", "je naam"],
                answer: 1,
                explanation: ["Deze info is voor vrienden niet iedereen."]
            }, {
                question: ["Is het oké om je je ouders betalings informatie op het internet te delen?"],
                choices: ["ja", "nee"],
                answer: 2,
                explanation: ["Nooit Betalingsgegevens delen."]
            }, {
                question: ["Je zit op een chatbox website iemand stelt wat rare persoonlijk vragen.",
                    "wat doe je?"],
                choices: ["rapporteer en blokkeer en vertel je ouders", " je beantwoordt de vragen"],
                answer: 1,
                explanation: ["Je moet nooit beantwoorden.",
                    "Hierdoor weten ze niks"]
            }, {
                question: ["Je krijgt een berichtje van een familie lid die vraagt of je",
                    "even de betalingsgegevens kan sturen omdat ze die vergeten zijn. Wat doe je?"],
                choices: ["je belt of vraagt je ouders persoonlijk", " je geeft hem de betalingsinformatie"],
                answer: 1,
                explanation: ["Nooit betaalinformatie aan mensen uitgeven.",
                    "Ze kunnen gehacked zijn of het kan een nep nummer zijn."]
            },
        ];
    }
}
class Level extends Screens {
    constructor(canvas, player, levelIndex) {
        super();
        this.totalScore = 0;
        this.scoringObject = new Array();
        this.speedSwitch = true;
        this.frameIndex = 0;
        this.canvas = canvas;
        this.player = player;
        this.levelIndex = levelIndex;
        this.totalLives = 5;
        this.speedBoost = 0;
        this.totalScore = 0;
    }
    gameLogic() {
        this.pause();
        if (this.getState() === ScreenState.PLAYING) {
            this.frameIndex++;
            this.player.move();
            this.collision();
            if (this.totalScore >= this.maxPoints) {
                this.state = ScreenState.NEXT_SCREEN;
            }
            if (this.totalScore < 0 || this.totalLives <= 0) {
                this.state = ScreenState.DIED;
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
            if (this.frameIndex >= difficultyVariable) {
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
                if (this.frameIndex >= difficultyVariable) {
                    console.log(difficultyVariable);
                    this.createRandomScoringObject();
                    this.frameIndex = 0;
                }
            }
        }
    }
    pause() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.keyListener.isKeyDown(KeyListener.KEY_ESC)) {
                this.state = ScreenState.PAUSED;
            }
            else if (this.keyListener.isKeyDown(KeyListener.KEY_P)) {
                yield this.delay(1000);
                this.state = ScreenState.PLAYING;
            }
        });
    }
    draw(ctx) {
        this.writeTextToCanvas(ctx, ` Level: ${this.levelIndex}`, this.canvas.width / 2, 20, 18);
        this.writeTextToCanvas(ctx, `Druk op ESC om te pauzeren`, this.canvas.width / 2 - 250, 20, 16);
        this.writeTextToCanvas(ctx, `Levens: ${this.totalLives}`, this.canvas.width / 2 + 250, 20, 16);
        if (this.getState() == ScreenState.PAUSED) {
            this.writeTextToCanvas(ctx, `Gepauzeerd`, this.canvas.width / 2, 200, 40);
            this.writeTextToCanvas(ctx, `Druk op P om door te gaan`, this.canvas.width / 2, 250, 35);
        }
        this.drawScore(ctx);
        this.drawObjects(ctx);
    }
    drawObjects(ctx) {
        this.scoringObject.forEach((object) => {
            if (object !== null) {
                object.draw(ctx);
            }
        });
    }
    drawScore(ctx) {
        this.writeTextToCanvas(ctx, `Score: ${this.totalScore}`, this.canvas.width / 2, 45, 18);
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
            this.scoringObject.push(new Heart(this.canvas));
        }
        else if (random === 1) {
            this.scoringObject.push(new GoldCoin(this.canvas));
        }
        else if (random === 2) {
            this.scoringObject.push(new SilverCoin(this.canvas));
        }
        else if (random === 3) {
            this.scoringObject.push(new Cone(this.canvas));
        }
        else if (random === 4) {
            this.scoringObject.push(new Banana(this.canvas));
        }
        else if (random === 5) {
            this.scoringObject.push(new Box(this.canvas));
        }
        const last_element = this.scoringObject.length - 1;
        this.scoringObject[last_element].setSpeed(this.speedBoost + this.speedMultiplier);
    }
    changeTheme(img) {
        document.body.style.backgroundImage = img;
    }
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
class Level1 extends Level {
    constructor(canvas, player) {
        super(canvas, player, 1);
        this.baseSpawnRate = 100;
        this.maxPoints = 10;
        this.speedMultiplier = 0.5;
    }
}
class Level2 extends Level {
    constructor(canvas, player) {
        super(canvas, player, 2);
        this.baseSpawnRate = 90;
        this.maxPoints = 200;
        this.speedMultiplier = 1;
    }
}
class Level3 extends Level {
    constructor(canvas, player) {
        super(canvas, player, 3);
        this.baseSpawnRate = 75;
        this.maxPoints = 300;
        this.speedMultiplier = 1;
    }
}
class Level4 extends Level {
    constructor(canvas, player) {
        super(canvas, player, 4);
        this.baseSpawnRate = 70;
        this.maxPoints = 400;
        this.speedMultiplier = 1.5;
    }
}
class Level5 extends Level {
    constructor(canvas, player) {
        super(canvas, player, 5);
        this.baseSpawnRate = 65;
        this.maxPoints = 600;
        this.speedMultiplier = 2;
    }
}
class Level6 extends Level {
    constructor(canvas, player) {
        super(canvas, player, 6);
        this.baseSpawnRate = 60;
        this.maxPoints = 800;
        this.speedMultiplier = 2.5;
    }
}
class Level7 extends Level {
    constructor(canvas, player) {
        super(canvas, player, 7);
        this.baseSpawnRate = 55;
        this.maxPoints = 1000;
        this.speedMultiplier = 3;
    }
}
class Level8 extends Level {
    constructor(canvas, player) {
        super(canvas, player, 8);
        this.baseSpawnRate = 50;
        this.maxPoints = 1200;
        this.speedMultiplier = 3.5;
    }
}
class Banana extends ScoringObject {
    constructor(canvas) {
        super(canvas);
        this.image = this.loadNewImage("assets/img/objects/banana.png");
        this.speed = 7;
        this.points = -10;
        this._lives = 0;
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
class Cone extends ScoringObject {
    constructor(canvas) {
        super(canvas);
        this.image = this.loadNewImage("assets/img/objects/cone.png");
        this.speed = 6;
        this.points = 0;
        this._lives = -1;
    }
}
class GoldCoin extends ScoringObject {
    constructor(canvas) {
        super(canvas);
        this.image = this.loadNewImage("assets/img/objects/goldcoin.png");
        this.speed = 5;
        this.points = 10;
        this._lives = 0;
    }
}
class Heart extends ScoringObject {
    constructor(canvas) {
        super(canvas);
        this.image = this.loadNewImage("assets/img/objects/heart.png");
        this.speed = 9;
        this.points = 0;
        this._lives = 1;
    }
}
class SilverCoin extends ScoringObject {
    constructor(canvas) {
        super(canvas);
        this.image = this.loadNewImage("assets/img/objects/silvercoin.png");
        this.speed = 5;
        this.points = 5;
        this._lives = 0;
    }
}
class DeathScreen extends Screens {
    constructor(canvas) {
        super();
        this.canvas = canvas;
    }
    gameLogic() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_P)) {
            this.state = ScreenState.RESTART;
        }
    }
    draw() {
        const ctx = this.canvas.getContext('2d');
        this.writeTextToCanvas(ctx, `Helaas, je hebt verloren`, this.canvas.width / 2, 200, 40);
        this.writeTextToCanvas(ctx, `Druk op P om opnieuw te proberen`, this.canvas.width / 2, 250, 40);
    }
}
class GameWon extends Screens {
    constructor(canvas) {
        super();
        this.canvas = canvas;
    }
    gameLogic() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_P)) {
            this.state = ScreenState.RESTART;
        }
    }
    draw() {
        const ctx = this.canvas.getContext('2d');
        this.writeTextToCanvas(ctx, `Gefeliciteerd! Je hebt alle levels gehaald!`, this.canvas.width / 2, 200, 40);
        this.writeTextToCanvas(ctx, `Druk op P om opnieuw te spelen`, this.canvas.width / 2, 250, 40);
    }
}
class LevelWon extends Screens {
    constructor(canvas) {
        super();
        this.canvas = canvas;
    }
    gameLogic() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_CTRL)) {
            this.state = ScreenState.NEXT_SCREEN;
        }
    }
    draw() {
        const ctx = this.canvas.getContext('2d');
        this.writeTextToCanvas(ctx, `Gefeliciteerd, je hebt het level gehaald!`, this.canvas.width / 2, 200, 40);
        this.writeTextToCanvas(ctx, `Druk op CTRL om de volgende level te starten`, this.canvas.width / 2, 250, 40);
    }
}
class StartScreen extends Screens {
    constructor(canvas) {
        super();
        this.canvas = canvas;
    }
    gameLogic() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_CTRL)) {
            this.state = ScreenState.NEXT_SCREEN;
        }
    }
    draw() {
        const ctx = this.canvas.getContext('2d');
        this.writeTextToCanvas(ctx, `Welkom bij ~naam hier~`, this.canvas.width / 2, 200, 40);
        this.writeTextToCanvas(ctx, `Druk op CTRL om de game te starten!`, this.canvas.width / 2, 250, 40);
    }
}
//# sourceMappingURL=app.js.map