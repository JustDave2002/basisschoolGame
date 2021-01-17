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
                this.advanceToNextLevel();
                this.currentScreen.gameLogic();
                if (this.currentScreen.getState() == ScreenState.NEXT_SCREEN) {
                    this.advanceToNextLevelSwitch = true;
                }
                else if (this.currentScreen.getState() == ScreenState.RESTART) {
                    this.load(1);
                }
                else if (this.currentScreen.getState() == ScreenState.DIED) {
                    this.screenIndex = this.screenArray.length - 2;
                    this.advanceToNextLevelSwitch = true;
                }
                else {
                    this.advanceToNextLevelSwitch = false;
                }
                let sinceStart = this.now - this.startTime;
                let currentFps = Math.round(1000 / (sinceStart / ++this.frameCount) * 100) / 100;
                if (currentFps == 60) {
                    currentFps = 60.10;
                }
                this.draw(currentFps);
            }
        };
        this.canvas = canvas;
        this.canvas.width = window.innerHeight * 1.77777777778;
        this.canvas.height = window.innerHeight;
        this.load(19);
    }
    load(screenIndex) {
        this.screenIndex = screenIndex;
        this.player = new Player(this.canvas);
        this.frameCount = 0;
        this.screenArray = [
            new StartScreen(this.canvas, this.player),
            new Level1(this.canvas, this.player),
            new QLevel1(this.canvas, this.player),
            new LevelWon(this.canvas, this.player),
            new Level2(this.canvas, this.player),
            new QLevel2(this.canvas, this.player),
            new LevelWon(this.canvas, this.player),
            new Level3(this.canvas, this.player),
            new QLevel3(this.canvas, this.player),
            new LevelWon(this.canvas, this.player),
            new Level4(this.canvas, this.player),
            new QLevel4(this.canvas, this.player),
            new LevelWon(this.canvas, this.player),
            new Level5(this.canvas, this.player),
            new LevelWon(this.canvas, this.player),
            new Level6(this.canvas, this.player),
            new LevelWon(this.canvas, this.player),
            new Level7(this.canvas, this.player),
            new LevelWon(this.canvas, this.player),
            new Level8(this.canvas, this.player),
            new GameWon(this.canvas, this.player),
            new DeathScreen(this.canvas, this.player)
        ];
        this.advanceToNextLevelSwitch = false;
        this.currentScreen = this.screenArray[this.screenIndex];
        console.log('start animation');
        this.startAnimating(70);
    }
    advanceToNextLevel() {
        if (this.advanceToNextLevelSwitch == true) {
            if (this.currentScreen.getState() == ScreenState.DIED) {
                this.screenIndex++;
                this.currentScreen = this.screenArray[this.screenIndex];
                this.advanceToNextLevelSwitch = false;
                this.player.goUp(false, true);
            }
            if (this.player.goUp(true, false)) {
                this.screenIndex++;
                this.currentScreen = this.screenArray[this.screenIndex];
                this.advanceToNextLevelSwitch = false;
                this.player.goUp(false, true);
            }
        }
    }
    startAnimating(fps) {
        this.fpsInterval = 1000 / fps;
        this.then = Date.now();
        this.startTime = this.then;
        console.log(this.startTime);
        this.animate();
    }
    draw(fps) {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.currentScreen.draw(ctx, fps);
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
        this.velocityY = 2;
        this.Left = 0;
        this.Right = 0;
        this.canvas = canvas;
        this.leftLane = this.canvas.width / 24 * 9;
        this.middleLane = this.canvas.width / 2;
        this.rightLane = this.canvas.width / 24 * 15;
        this.keyListener = new KeyListener();
        this.image = this.loadNewImage("./assets/img/players/carplayer.png");
        this.positionX = this.middleLane;
        this.positionY = this.canvas.height - 175;
    }
    move() {
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
        this.animatePlayer();
    }
    questionMove() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT) && this.positionX != this.leftLane) {
            console.log("going left");
            this.goLeft = true;
            this.toGoLane = this.leftLane;
        }
        else if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT) && this.positionX != this.rightLane) {
            console.log("going right");
            this.goLeft = false;
            this.toGoLane = this.rightLane;
        }
        this.animatePlayer();
    }
    goUp(activate, reset) {
        if (reset == true) {
            this.positionX = this.middleLane;
            this.goLeft = undefined;
        }
        if (activate == true) {
            this.velocityY += 1, 5;
            if (this.positionY >= -200) {
                this.positionY -= this.velocityY;
                return false;
            }
            else {
                return true;
            }
        }
        else {
            this.positionY = this.canvas.height - 175;
            this.velocityY = 2;
            return false;
        }
    }
    animatePlayer() {
        if (this.goLeft == true) {
            if (this.positionX >= this.toGoLane) {
                this.positionX = this.positionX - 25;
                if (this.positionX < this.toGoLane) {
                    this.positionX = this.toGoLane;
                }
            }
        }
        else if (this.goLeft == false) {
            if (this.positionX <= this.toGoLane) {
                this.positionX = this.positionX + 25;
                if (this.positionX > this.toGoLane) {
                    this.positionX = this.toGoLane;
                }
            }
        }
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.positionX - this.image.width / 2, this.positionY);
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
        this.setSpeedSwitch = true;
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
        this.positionY = -100;
    }
    move() {
        this.positionY += this.speed;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.positionX - this.image.width / 2, this.positionY);
    }
    collidesWithCanvasBottom() {
        if (this.positionY > this.canvas.height) {
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
        if (this.setSpeedSwitch == true) {
            this.setSpeedSwitch = false;
            this.speed += v;
        }
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
    constructor(player) {
        this.state = ScreenState.PLAYING;
        this.keyListener = new KeyListener;
        this.player = player;
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
        super(player);
        this.firstStart = true;
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
        this.player.goUp(false, true);
    }
    gameLogic() {
        if (this.firstStart == true) {
            this.reset(0);
            this.firstStart = false;
        }
        this.player.goUp(this.questionConfirmed, false);
        this.player.questionMove();
        if (this.pickedQuestion == false) {
            this.questionI = this.randomInteger(0, this.questionArray.length);
            this.currentQuestion = this.questionArray[this.questionI].question;
            this.currentOptions = this.questionArray[this.questionI].choices;
            this.currentAnswer = this.questionArray[this.questionI].answer;
            this.currentExplanation = this.questionArray[this.questionI].explanation;
            this.pickedQuestion = true;
        }
        if (this.questionConfirmed == false) {
            if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT) || this.leftOrRight == 1) {
                this.leftOrRight = 1;
            }
            if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT) || this.leftOrRight == 2) {
                this.leftOrRight = 2;
            }
        }
        this.questionCheck();
        if (this.questionConfirmed == true && this.keyListener.isKeyDown(KeyListener.KEY_CTRL)) {
            this.questionCounter++;
            if (this.questionCounter >= 2) {
                if (this.player.goUp(true, true)) {
                    this.state = ScreenState.NEXT_SCREEN;
                    this.questionCounter = 0;
                }
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
            this.writeTextToCanvas(ctx, "Druk op CTRL om door te gaan!", this.canvas.width / 2, 150, 45);
        }
        if (this.questionIsRight != undefined) {
            for (let i = 0; i < this.currentExplanation.length; i++) {
                this.writeTextToCanvas(ctx, this.currentExplanation[i], this.canvas.width / 2, 400 + 50 * i, 40);
            }
        }
        if (this.questionIsRight == true) {
            this.writeTextToCanvas(ctx, "Dat was het goede antwoord!", this.canvas.width / 2, 250, 40, "white");
        }
        else if (this.questionIsRight == false) {
            this.writeTextToCanvas(ctx, "Dat was niet het goede antwoord!", this.canvas.width / 2, 250, 40, "white");
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
                explanation: [" Je kan je ouders vertrouwen",
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
                question: ["Is het oké om je ouders hun betalings informatie op het internet te delen?"],
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
            }, {
                question: ["Welke gegevens deel je niet op je sociale media?"],
                choices: ["je adres en je persoonlijke telefoonnummer ", " je naam"],
                answer: 1,
                explanation: ["Deze info is voor vrienden niet iedereen."]
            }, {
                question: ["Is het oké om je je ouders betalings informatie op het internet te delen?"],
                choices: ["ja", "nee"],
                answer: 2,
                explanation: ["Nooit Betalingsgegevens delen."]
            }
        ];
    }
}
class QLevel2 extends Questions {
    constructor(canvas, player) {
        super(canvas, player);
        this.questionArray = [
            {
                question: [" Je krijgt een e-mail met een hilarisch onderwerp dat duidelijk een scam is wat doe je?"],
                choices: ["Vermijd te klikken op de links en markeer ze als spam", " Stuur de e-mail door naar je vrienden maar zeg er niet op te klikken "],
                answer: 1,
                explanation: ["links zijn gevaarlijk "]
            }, {
                question: [" Welk e-mailadres lijkt echt?"],
                choices: ["HenkBakplaat@gmal.com", "KarelVisser@gmail.com"],
                answer: 2,
                explanation: ["gmal is fout want het is gmail"]
            }, {
                question: [" Je krijgt een e-mail van je neef in de bijlage staat een bestand in",
                    "de e-mail staat “je zal nooit geloven wat er is gebeurt” wat doe je?"],
                choices: ["Verwijder de E-mail en vertel je ouders dat je neef gehackt is ", " Open hem hij is toch familie"],
                answer: 1,
                explanation: ["Nooit rare emails vertouwen"]
            }, {
                question: [" Een site vraagt voor je bankgegevens wat moet je doen?"],
                choices: ["vul het in ", " negeer het en ga weg van de site"],
                answer: 2,
                explanation: ["Het is nooit slim om zomaar je bankgegevens te geven, hiermee kunnen slechte mensen",
                    "deze gebruiken om je geld te stelen."]
            }, {
                question: [" Je wil een product kopen op een site waar kijk je naar?"],
                choices: ["de reviews bekijken", "Alleen naar het product zelf"],
                answer: 1,
                explanation: ["altijd kijken naar reviews zodat je niet word opgelicht"]
            }, {
                question: [" Je wilt een computerprogramma downloaden waar kijk je naar?"],
                choices: ["lijkt het officieel", "Alleen naar het product zelf"],
                answer: 1,
                explanation: ["Altijd kijken of het de goede site is."]
            },
        ];
    }
}
class QLevel3 extends Questions {
    constructor(canvas, player) {
        super(canvas, player);
        this.questionArray = [
            {
                question: ["Je zit al 5 uur achter de computer", "Wat doe je?"],
                choices: ["Stoppen", "Doorgaan"],
                answer: 1,
                explanation: ["Normale lengte achter de computer", "Want dat is goed"],
            }, {
                question: [" Je krijgt een vriendschapsverzoek van iemand die je niet kent wat doe je?"],
                choices: ["je accepteert het vriendschapsverzoek", " je weigert het vriendschapsverzoek "],
                answer: 2,
                explanation: ["Als je iemand niet kent doe het niet"]
            }, {
                question: [" Je krijgt een link naar je toegestuurd",
                    "waarvan je niet van weet wat het doet wat doe je?"],
                choices: ["Je klikt erop om te kijken waar het naartoe gaat", " je klikt er niet op "],
                answer: 2,
                explanation: ["Kan een virus bevatten doe het niet"]
            }, {
                question: ["je word gecyberpest wat doe je"],
                choices: ["je negeert het ", "Rappoteren en Blokkeren"],
                answer: 2,
                explanation: ["Altijd rapporteren en blokkeren. Dan kan er iets tegen worden gedaan."]
            }, {
                question: ["Een site zegt dat je iets hebt gewonnen",
                    "Je bent de duizendste klant wat doe je."],
                choices: ["vetrouw het niet", "Doe wat er word gevraagd"],
                answer: 1,
                explanation: ["Dit is altijd nep trap er niet in."]
            }, {
                question: [" Je krijgt een link naar je toegestuurd waarvan je niet van weet wat het doet",
                    "wat doe je?"],
                choices: ["Je klikt erop om te kijken waar het naartoe gaat", " je klikt er niet op "],
                answer: 2,
                explanation: ["Kan een virus bevatten doe het niet"]
            }
        ];
    }
}
class QLevel4 extends Questions {
    constructor(canvas, player) {
        super(canvas, player);
        this.questionArray = [
            {
                question: ["Iemand gebruikt foute worden op het internet wat doe je?"],
                choices: ["Doe niks ", "Rapporteer en blokkeer"],
                answer: 2,
                explanation: ["Altijd rapporteren en blokkeren. Dan kan er iets tegen worden gedaan."]
            }, {
                question: [" Je krijgt een link naar je toegestuurd waarvan je niet van weet wat het doet wat doe je?"],
                choices: ["Je klikt erop om te kijken waar het naartoe gaat", " je klikt er niet op "],
                answer: 2,
                explanation: ["Kan een virus bevatten doe het niet"]
            }, {
                question: [" Je krijgt een berichtje van een familie lid die vraagt of",
                    "je even de betalingsgegevens kan sturen omdat ze die vergeten zijn wat doe je?"],
                choices: [" je vraagt het aan je ouders persoonlijk en blokkeer de persoon", " je geeft hem de betalingsinformatie"],
                answer: 1,
                explanation: ["Nooit delen kan nep zijn"]
            }, {
                question: [" Je zit op een chatbox website iemand stelt wat rare persoonlijk vragen wat doe je?"],
                choices: ["rapporteer en blokkeer en vertel je ouders", " je beantwoordt de vragen"],
                answer: 1,
                explanation: ["Je moet nooit beantwoorden.",
                    "Hierdoor weten ze niks"]
            }, {
                question: ["Wat is een goed wachtwoord?"],
                choices: ["1234", " W0nderwa11$"],
                answer: 2,
                explanation: ["1234 is heel makkelijk om voor hackers achter te komen.",
                    "W0nderwa11$ is dat niet door de tekens"]
            }, {
                question: ["Wat is een betere game"],
                choices: ["Minecraft", "Fortnite"],
                answer: 1,
                explanation: ["Minecraft is een veel beter spel"]
            }
        ];
    }
}
class Level extends Screens {
    constructor(canvas, player, levelIndex) {
        super(player);
        this.scoringObject = new Array();
        this.backgroundArray = new Array();
        this.totalLives = 5;
        this.totalScore = 0;
        this.frameIndex = 0;
        this.canvas = canvas;
        this.player = player;
        this.levelIndex = levelIndex;
        this.backgroundArray.push(new Background(this.canvas, levelIndex, -20));
    }
    gameLogic() {
        this.pause();
        if (this.getState() === ScreenState.PLAYING) {
            this.frameIndex++;
            this.spawnInterval = this.baseSpawnRate;
            this.gameSpeed = this.baseSpeed;
            this.player.goUp(false, false);
            this.player.move();
            this.collision();
            this.backgroundLogic();
            if (this.totalScore >= this.maxPoints) {
                this.state = ScreenState.NEXT_SCREEN;
            }
            if (this.totalScore < 0 || this.totalLives <= 0) {
                this.state = ScreenState.DIED;
            }
            this.spawnRateSetter();
            this.speedSetter();
            console.log(`${this.spawnInterval} spawnFrems, ${this.gameSpeed} speed`);
        }
    }
    spawnRateSetter() {
        const pointStep = this.totalScore / 20;
        this.spawnInterval = this.baseSpawnRate - pointStep;
        if (this.spawnInterval < 30) {
            this.spawnInterval = 30;
        }
        if (this.frameIndex >= this.spawnInterval) {
            this.createRandomScoringObject();
            this.frameIndex = 0;
        }
    }
    speedSetter() {
        let speedBooster = this.totalScore / 85;
        this.gameSpeed = speedBooster + this.baseSpeed;
        this.scoringObject.forEach(object => {
            object.setSpeed(this.gameSpeed);
        });
        this.backgroundArray.forEach(BG => {
            BG.setSpeed(this.gameSpeed);
        });
    }
    pause() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.keyListener.isKeyDown(KeyListener.KEY_SHIFT)) {
                this.state = ScreenState.PAUSED;
            }
            else if (this.keyListener.isKeyDown(KeyListener.KEY_CTRL)) {
                yield this.delay(1000);
                this.state = ScreenState.PLAYING;
            }
        });
    }
    draw(ctx, fps) {
        this.backgroundArray.forEach(background => {
            ctx.drawImage(background.backgroundImage, background.getPositionX(), background.getPositionY(), this.canvas.width, this.canvas.height * 2);
        });
        this.writeTextToCanvas(ctx, ` fps: ${fps}`, 50, 20, 18);
        this.writeTextToCanvas(ctx, ` Level: ${this.levelIndex}`, this.canvas.width / 2, 20, 18);
        this.writeTextToCanvas(ctx, `Druk op SHIFT om te pauzeren`, this.canvas.width / 2 - 250, 20, 16);
        this.writeTextToCanvas(ctx, `Levens: ${this.totalLives}`, this.canvas.width / 2 + 250, 20, 16);
        if (this.getState() == ScreenState.PAUSED) {
            this.writeTextToCanvas(ctx, `Gepauzeerd`, this.canvas.width / 2, 200, 40);
            this.writeTextToCanvas(ctx, `Druk op CTRL om door te gaan`, this.canvas.width / 2, 250, 35);
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
    backgroundLogic() {
        this.backgroundArray.forEach((background, index) => {
            if (background.backgroundCollision()) {
                this.backgroundArray.push(new Background(this.canvas, this.levelIndex));
            }
            if (background !== null) {
                background.move();
                if (background.collidesWithCanvasBottom()) {
                    this.backgroundArray.splice(index, 1);
                }
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
    }
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
class Level1 extends Level {
    constructor(canvas, player) {
        super(canvas, player, 1);
        this.baseSpawnRate = 80;
        this.maxPoints = 100;
        this.baseSpeed = 1.5;
    }
}
class Level2 extends Level {
    constructor(canvas, player) {
        super(canvas, player, 2);
        this.baseSpawnRate = 90;
        this.maxPoints = 200;
        this.baseSpeed = 2.5;
    }
}
class Level3 extends Level {
    constructor(canvas, player) {
        super(canvas, player, 3);
        this.baseSpawnRate = 75;
        this.maxPoints = 300;
        this.baseSpeed = 3.5;
    }
}
class Level4 extends Level {
    constructor(canvas, player) {
        super(canvas, player, 4);
        this.baseSpawnRate = 70;
        this.maxPoints = 400;
        this.baseSpeed = 4;
    }
}
class Level5 extends Level {
    constructor(canvas, player) {
        super(canvas, player, 5);
        this.baseSpawnRate = 65;
        this.maxPoints = 600;
        this.baseSpeed = 4.5;
    }
}
class Level6 extends Level {
    constructor(canvas, player) {
        super(canvas, player, 6);
        this.baseSpawnRate = 60;
        this.maxPoints = 800;
        this.baseSpeed = 5;
    }
}
class Level7 extends Level {
    constructor(canvas, player) {
        super(canvas, player, 7);
        this.baseSpawnRate = 55;
        this.maxPoints = 1000;
        this.baseSpeed = 5.5;
    }
}
class Level8 extends Level {
    constructor(canvas, player) {
        super(canvas, player, 8);
        this.baseSpawnRate = 50;
        this.maxPoints = 1200;
        this.baseSpeed = 6;
    }
}
class Background extends ScoringObject {
    constructor(canvas, currentLevel, yPos = canvas.height * -2) {
        super(canvas);
        this.collidedSwitch = false;
        this.speed = 7;
        this.points = 0;
        this._lives = 0;
        this.positionX = 0;
        this.positionY = yPos;
        this.currentLevel = currentLevel;
        this.imageChanger();
    }
    imageChanger() {
        switch (this.currentLevel) {
            case 1:
            case 2:
                this.backgroundImage = this.loadNewImage("assets/img/street1.jpg");
                break;
            case 3:
            case 4:
                this.backgroundImage = this.loadNewImage("assets/img/street2.jpg");
                break;
            case 5:
            case 6:
                this.backgroundImage = this.loadNewImage("assets/img/street3.jpg");
                break;
            case 7:
            case 8:
                this.backgroundImage = this.loadNewImage("assets/img/street4.jpg");
                break;
            default:
                break;
        }
    }
    backgroundCollision() {
        if (this.positionY + this.backgroundImage.height > this.canvas.height && this.collidedSwitch == false) {
            this.collidedSwitch = true;
            return true;
        }
        return false;
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
        this.speed = 7;
        this.points = 0;
        this._lives = -1;
    }
}
class GoldCoin extends ScoringObject {
    constructor(canvas) {
        super(canvas);
        this.image = this.loadNewImage("assets/img/objects/goldcoin.png");
        this.speed = 7;
        this.points = 10;
        this._lives = 0;
    }
}
class Heart extends ScoringObject {
    constructor(canvas) {
        super(canvas);
        this.image = this.loadNewImage("assets/img/objects/heart.png");
        this.speed = 10;
        this.points = 0;
        this._lives = 1;
    }
}
class SilverCoin extends ScoringObject {
    constructor(canvas) {
        super(canvas);
        this.image = this.loadNewImage("assets/img/objects/silvercoin.png");
        this.speed = 7;
        this.points = 5;
        this._lives = 0;
    }
}
class DeathScreen extends Screens {
    constructor(canvas, player) {
        super(player);
        this.canvas = canvas;
    }
    gameLogic() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_CTRL)) {
            this.state = ScreenState.RESTART;
        }
    }
    draw() {
        const ctx = this.canvas.getContext('2d');
        this.writeTextToCanvas(ctx, `Helaas, je hebt verloren`, this.canvas.width / 2, 200, 40);
        this.writeTextToCanvas(ctx, `Druk op CTRL om opnieuw te proberen`, this.canvas.width / 2, 250, 40);
    }
}
class GameWon extends Screens {
    constructor(canvas, player) {
        super(player);
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
    constructor(canvas, player) {
        super(player);
        this.keyWasPressed = true;
        this.canvas = canvas;
    }
    gameLogic() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_CTRL) != true) {
            this.keyWasPressed = false;
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_CTRL) && this.keyWasPressed == false) {
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
    constructor(canvas, player) {
        super(player);
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