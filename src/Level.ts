/**
 * this class is responsible for the state of the level
 */
abstract class Level {

    protected totalScore: number;


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
    protected won: boolean = false;

    protected frameIndex: number;

    protected canvas: HTMLCanvasElement


    constructor(canvas: HTMLCanvasElement, player: Player) {

        this.canvas = canvas;
        this.player = player;

        // Score is zero at start
        this.totalLives = 5;

        //upps the speed
        this.speedBoost = 0;

        this.totalScore = 0;


    }


    public getTotalLives(): number {
        return this.totalLives
    }

    public getFrameIndex(): number {
        return this.frameIndex
    }


    public getTotalScore(): number {
        return this.totalScore
    }

    isComplete(): boolean {
        return this.won
    }




    public logic(frameIndex: number) {
        this.frameIndex = frameIndex
        if (this.totalScore >= this.maxPoints) {
            this.won = true;
        }
        //makes you lose if you have minus points
        if (this.totalScore < 0) {
            this.totalLives = 0;
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
        if (frameIndex >= difficultyVariable) {
            console.log(difficultyVariable);

            this.createRandomScoringObject();
            this.frameIndex = 0;
        }

    }

    public drawObjects(ctx: CanvasRenderingContext2D) {
        this.scoringObject.forEach(
            (object) => {
                if (object !== null) {
                    object.draw(ctx);
                }
            });
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
            this.scoringObject.push(new GreenCross(this.canvas));
        } else if (random === 1) {
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
            this.scoringObject.push(new BlueLightningBolt(this.canvas));
        }

        const last_element: number = this.scoringObject.length - 1;
        console.log(this.speedBoost + this.speedMultiplier);

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
}