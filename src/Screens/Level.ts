/// <reference path="../Screens.ts"/>
/**
 * this class is responsible for the state of the level
 */
abstract class Level extends Screens {

    protected totalScore: number = 0;


    // The objects on the canvas
    protected scoringObject: Array<ScoringObject> = new Array()


    protected totalLives: number;


    
    protected maxPoints: number;

    protected frameIndex: number;

    protected canvas: HTMLCanvasElement;

    protected backgroundArray: Array<Background> = new Array();

    protected levelIndex: number;


    //speedvariables for level
    protected baseSpawnRate: number;
    protected baseSpeed:number;
    private spawnInterval: number;
    private gameSpeed: number;


    constructor(canvas: HTMLCanvasElement, player: Player, levelIndex: number) {

        super(player);
        this.frameIndex = 0
        this.canvas = canvas;
        this.player = player;
        this.levelIndex = levelIndex;

        

        // Score is zero at start
        this.totalLives = 5;
        this.totalScore = 0;

        this.backgroundArray.push(new Background(this.canvas, levelIndex, -20));

    }



    public gameLogic() {

        //makes sure the pause logic is not frozen when the game is paused
        this.pause();

        //only executes the game when the game is not paused
        if (this.getState() === ScreenState.PLAYING) {
            this.frameIndex++

            //sets the base speed for the level
        this.spawnInterval = this.baseSpawnRate;
        this.gameSpeed = this.baseSpeed;

            this.player.goUp(false, false)
            this.player.move();
            this.backgroundLogic();
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


            //we willen dat de snelheid van item spawns sneller word *tot een bepaald punt
            //we moeten dat punt gaan vinden

            //speed willen we ook steeds omhoog *tot een bepaald punt
            //het moet een duidelijk nummer zijn die je zo vaak kan applien

            //lineair steeds moeilijker worden
            //je pakt de punten in een level en daaraan pas je de spawnrate en speed aan


            //counter that changes all variables based on the points
            const pointStep:number = this.totalScore / 20;

           //calculates the amount of frames needed to spawn an item 
            if (this.spawnInterval > 30){
                
            this.spawnInterval = this.baseSpawnRate - pointStep;
            }
            //spawns an item every x frames & decides the speed boost and frequency of items
            if (this.frameIndex >= this.spawnInterval) {
                

                this.createRandomScoringObject();
                this.frameIndex = 0;
            }

            let speedBooster = this.totalScore /50
            this.gameSpeed = speedBooster + this.baseSpeed
            this.scoringObject.forEach(object => {
                object.setSpeed(this.gameSpeed);
            });
            this.backgroundArray.forEach(BG => {
                BG.setSpeed(this.gameSpeed);
            });

            console.log(this.spawnInterval,this.gameSpeed);
        }
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
     * @param ctx 
     * @param levelIndex shows which level the player is currently at
     */
    public draw(ctx: CanvasRenderingContext2D, fps: number) {
        this.backgroundArray.forEach(background => {
            ctx.drawImage(
                background.background,
                // Center the image in the lane with the x coordinates

                background.getPositionX(),
                background.getPositionY(),
                this.canvas.width,
                this.canvas.height * 2
            );
        });


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
            });
    }


    /**
     * Draw the score on a canvas
     * @param ctx
     */
    protected drawScore(ctx: CanvasRenderingContext2D): void {
        this.writeTextToCanvas(ctx, `Score: ${this.totalScore}`, this.canvas.width / 2, 45, 18);
    }

    private backgroundLogic() {


        this.backgroundArray.forEach(
            (background, index) => {
                //background.setSpeed(this.speedBoost + this.speedMultiplier);
                if (background.backgroundCollision()) {
                    //console.log("new BG spawned");

                    this.backgroundArray.push(new Background(this.canvas, this.levelIndex));
                }
                if (background !== null) {
                    //console.log("moving BG");

                    background.move();
                    if (background.collidesWithCanvasBottom()) {
                        //console.log("BG collission detected", index);

                        this.backgroundArray.splice(index, 1);

                    }
                }
            }
        );

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