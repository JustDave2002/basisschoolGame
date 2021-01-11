/// <reference path="../Screens.ts"/>
/**
 * this class is responsible for the state of the level
 */
abstract class Level extends Screens {

    protected totalScore: number = 0;


    // The objects on the canvas
    protected scoringObject: Array<ScoringObject> = new Array()


    protected totalLives: number;
    protected player: Player;

    //has a formula of speeding up the game the more points you have
    protected speedBoost: number;
    protected speedMultiplier: number;
    protected speedSwitch: boolean = true;

    protected baseSpawnRate: number;
    protected maxPoints: number;

    //TODO change when won

    protected levelIndex: number;

    protected frameIndex: number;

    protected canvas: HTMLCanvasElement





    constructor(canvas: HTMLCanvasElement, player: Player, levelIndex: number) {

        super();
        this.frameIndex = 0
        this.canvas = canvas;
        this.player = player;
        this.levelIndex = levelIndex;

        // Score is zero at start
        this.totalLives = 5;

        //upps the speed
        this.speedBoost = 0;

        this.totalScore = 0;


    }



    public gameLogic() {

        //makes sure the pause logic is not frozen when the game is paused
        this.pause();

        //only executes the game when the game is not paused
        if (this.getState() === ScreenState.PLAYING) {
            this.frameIndex++

            this.player.move();
            //console.log(this.frameIndex);



            // checks if player collides
            this.collision();



            if (this.totalScore >= this.maxPoints) {
                this.state = ScreenState.NEXT_SCREEN;
            }
            //makes you lose if you have minus points
            if (this.totalScore < 0 || this.totalLives <= 0) {
                this.state = ScreenState.DIED
            }


            const number = this.totalScore / 20;
            let difficultyVariable: number = this.baseSpawnRate - number;
            if (difficultyVariable < 15) {
                difficultyVariable = 15;
            }
            if (this.speedBoost < 5 && this.speedSwitch === true) {
                this.speedBoost = this.totalScore * 0.015
            } else {
                this.speedSwitch = false;
                this.speedBoost = 5 - this.speedMultiplier + this.totalScore * 0.005;
            }
            //spawns an item every x frames & decides the speed boost and frequency of items
            if (this.frameIndex >= difficultyVariable) {
                //console.log(difficultyVariable);


                const number = this.totalScore / 20;
                let difficultyVariable: number = this.baseSpawnRate - number;
                if (difficultyVariable < 15) {
                    difficultyVariable = 15;
                }
                if (this.speedBoost < 5 && this.speedSwitch === true) {
                    this.speedBoost = this.totalScore * 0.015
                } else {
                    this.speedSwitch = false;
                    this.speedBoost = 5 - this.speedMultiplier + this.totalScore * 0.005;
                }
                //spawns an item every x frames & decides the speed boost and frequency of items
                if (this.frameIndex >= difficultyVariable) {
                    console.log(difficultyVariable);

                    this.createRandomScoringObject();
                    this.frameIndex = 0;
                }
            }
        }
    }

    /**
     * pauses the game on button press and start back up 1000 ms after pressing start
     */
    private async pause() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_ESC)) {
            this.state = ScreenState.PAUSED;
        } else if (this.keyListener.isKeyDown(KeyListener.KEY_P)) {
            await this.delay(1000);
            this.state = ScreenState.PLAYING;
        }
    }
    /**
     * draws everything on screen for a level
     * @param ctx 
     * @param levelIndex shows which level the player is currently at
     */
    public draw(ctx: CanvasRenderingContext2D) {

        this.writeTextToCanvas(ctx, ` Level: ${this.levelIndex}`, this.canvas.width / 2, 20, 18);
        this.writeTextToCanvas(ctx, `Druk op ESC om te pauzeren`, this.canvas.width / 2 - 250, 20, 16);
        this.writeTextToCanvas(ctx, `Levens: ${this.totalLives}`, this.canvas.width / 2 + 250, 20, 16);

        //writes the pause message when game is paused
        if (this.getState() == ScreenState.PAUSED) {

            this.writeTextToCanvas(ctx, `Gepauzeerd`, this.canvas.width / 2, 200, 40);
            this.writeTextToCanvas(ctx, `Druk op P om door te gaan`, this.canvas.width / 2, 250, 35);
        }
        this.drawScore(ctx);
        this.drawObjects(ctx);
    }
    /**
     * draws all objects within the level
     * @param ctx 
     */
    protected drawObjects(ctx: CanvasRenderingContext2D) {
        this.scoringObject.forEach(
            (object) => {
                if (object !== null) {
                    object.draw(ctx);
                }
            });
    }

    /**
     * Draw the score on a canvas
     * @param ctx
     */
    protected drawScore(ctx: CanvasRenderingContext2D): void {
        this.writeTextToCanvas(ctx, `Score: ${this.totalScore}`, this.canvas.width / 2, 45, 18);
    }

    public collision() {
        this.scoringObject.forEach(
            (object, index) => {
                if (object !== null) {
                    object.move();

                    if (this.player.collidesWith(object)) {
                        this.totalScore += object.getPoints();
                        this.totalLives += object.getLives();
                        this.scoringObject.splice(index, 1);
                    } else if (object.collidesWithCanvasBottom()) {
                        this.scoringObject.splice(index, 1);
                    }
                }
            }
        );
    }
    protected createRandomScoringObject(): void {

        const random = this.randomInteger(1, 5);
        const plusLife = this.randomInteger(1, 40)


        if (plusLife === 6) {
            this.scoringObject.push(new Heart(this.canvas));
        } else if (random === 1) {
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

        const last_element: number = this.scoringObject.length - 1;
        //console.log(this.speedBoost + this.speedMultiplier);

        this.scoringObject[last_element].setSpeed(this.speedBoost + this.speedMultiplier);
    }


    /**
    * Generates a random integer number between min and max
    *
    * @param {number} min - minimal time
    * @param {number} max - maximal time
    */
    protected randomInteger(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }

    protected changeTheme(img: string) {
        document.body.style.backgroundImage = img;
    }

    /**
     * pauses the game for ms amount of time
     * @param ms amount of time in MS
     */
    public delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}