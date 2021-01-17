/// <reference path="../Screens.ts"/>
/**
 * this class is responsible for all the logic within a level
 */
abstract class Level extends Screens {

    // The objects on the canvas
    protected scoringObject: Array<ScoringObject> = new Array();
    protected backgroundArray: Array<Background> = new Array();

    protected totalLives: number = 5;
    protected totalScore: number = 0;
    protected frameIndex: number = 0;
    protected maxPoints: number;
    protected levelIndex: number;

    protected canvas: HTMLCanvasElement;

    //speedvariables for level
    protected baseSpawnRate: number;
    protected baseSpeed: number;
    private spawnInterval: number;
    private gameSpeed: number;

    constructor(canvas: HTMLCanvasElement, player: Player, levelIndex: number) {

        super(player);
        this.canvas = canvas;
        this.player = player;
        this.levelIndex = levelIndex;

        //initialises the first BG
        this.backgroundArray.push(new Background(this.canvas, levelIndex, -20));
    }

    /**
     * logic of the level
     */
    public gameLogic() {
        //makes sure the pause logic is not frozen when the game is paused
        this.pause();

        //only executes the game when the game is not paused
        if (this.getState() === ScreenState.PLAYING) {
            this.frameIndex++

            //sets the base speed for the level
            this.spawnInterval = this.baseSpawnRate;
            this.gameSpeed = this.baseSpeed;

            //executes the needed code for the player and player collision
            this.player.goUp(false, false)
            this.player.move();
            this.collision();

            this.backgroundLogic();

            //executes the next screen when the win conditions are met
            if (this.totalScore >= this.maxPoints) {
                this.state = ScreenState.NEXT_SCREEN;
            }

            //executes the lost screen when you lost all lives or points
            if (this.totalScore < 0 || this.totalLives <= 0) {
                this.state = ScreenState.DIED
            }

            this.spawnRateSetter();
            this.speedSetter();

            console.log(`${this.spawnInterval} spawnFrems, ${this.gameSpeed} speed`);
        }
    }


    /**
     * sets the speed at which items spawn based on the current points 
     */
    private spawnRateSetter() {
        //counter that changes all variables based on the points
        const pointStep: number = this.totalScore / 20;

        //calculates the amount of frames needed to spawn an item 
            this.spawnInterval = this.baseSpawnRate - pointStep;
        if (this.spawnInterval < 30) {
            this.spawnInterval = 30;

        } 
        //spawns an item every x frames & decides the speed boost and frequency of items
        if (this.frameIndex >= this.spawnInterval) {
            this.createRandomScoringObject();
            this.frameIndex = 0;
        }
    }

    /**
     * sets the speed of all items on screen based on the current points
     */
    private speedSetter() {
        let speedBooster = this.totalScore / 85;
        this.gameSpeed = speedBooster + this.baseSpeed;
        this.scoringObject.forEach(object => {
            object.setSpeed(this.gameSpeed);
        });
        this.backgroundArray.forEach(BG => {
            BG.setSpeed(this.gameSpeed);
        });
    }

    /**
     * pauses the game on button press and start back up 1000 ms after pressing start
     */
    private async pause() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_SHIFT)) {
            this.state = ScreenState.PAUSED;
        } else if (this.keyListener.isKeyDown(KeyListener.KEY_CTRL)) {
            await this.delay(1000);
            this.state = ScreenState.PLAYING;
        }
    }

    /**
     * draws everything on screen for a level
     * @param ctx canvasRenderingContext2D
     * @param levelIndex shows which level the player is currently at
     */
    public draw(ctx: CanvasRenderingContext2D, fps: number) {
        //loops through all backgrounds and draws them
        this.backgroundArray.forEach(background => {
            ctx.drawImage(
                background.backgroundImage,
                // Center the image in the lane with the x coordinates
                background.getPositionX(),
                background.getPositionY(),
                this.canvas.width,
                this.canvas.height * 2
            );
        });


        //draws all the level info on screen
        this.writeTextToCanvas(ctx, ` fps: ${fps}`, 50, 20, 18);
        this.writeTextToCanvas(ctx, ` Level: ${this.levelIndex}`, this.canvas.width / 2, 20, 18);
        this.writeTextToCanvas(ctx, `Druk op SHIFT om te pauzeren`, this.canvas.width / 2 - 250, 20, 16);
        this.writeTextToCanvas(ctx, `Levens: ${this.totalLives}`, this.canvas.width / 2 + 250, 20, 16);

        //writes the pause message when game is paused
        if (this.getState() == ScreenState.PAUSED) {
            this.writeTextToCanvas(ctx, `Gepauzeerd`, this.canvas.width / 2, 200, 40);
            this.writeTextToCanvas(ctx, `Druk op CTRL om door te gaan`, this.canvas.width / 2, 250, 35);
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
            }
        );
    }

    /**
     * Draw the score on a canvas
     * @param ctx
     */
    protected drawScore(ctx: CanvasRenderingContext2D): void {
        this.writeTextToCanvas(ctx, `Score: ${this.totalScore}`, this.canvas.width / 2, 45, 18);
    }

    /**
     * all the logic concidering the BG
     */
    private backgroundLogic() {
        this.backgroundArray.forEach(
            (background, index) => {
                //spawns new BG if a previous BG touches the bottom of the canvas
                if (background.backgroundCollision()) {
                    this.backgroundArray.push(new Background(this.canvas, this.levelIndex));
                }

                //general moving and removing BG logic
                if (background !== null) {
                    background.move();

                    //removes a BG if the top of it collides with the bottom of the canvas
                    if (background.collidesWithCanvasBottom()) {
                        this.backgroundArray.splice(index, 1);

                    }
                }
            }
        );

    }

    /**
     * detects collision of scoringobjects with the player or canvas bottom
     */
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

    /**
     * creates a random scoring object to fall down the canvas
     */
    protected createRandomScoringObject(): void {

        //randomisers for rarer items
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
    }

    /**
     * pauses the game for ms amount of time
     * @param ms amount of time in MS
     */
    public delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}