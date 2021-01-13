class Player {

    private canvas: HTMLCanvasElement;

    private leftLane: number;
    private middleLane: number;
    private rightLane: number;

    private keyListener: KeyListener;

    private image: HTMLImageElement;
    private positionX: number;


    private Left: number = 0;
    private Right: number = 0;
    private toGoLane: number;
    private goLeft: boolean;


    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;


        this.leftLane = this.canvas.width / 24 * 9;
        this.middleLane = this.canvas.width / 2;
        this.rightLane = this.canvas.width / 24 * 15;

        this.keyListener = new KeyListener();


        this.image = this.loadNewImage("./assets/img/players/carplayer.png");
        this.positionX = this.middleLane;
    }

    public move() {


        this.animatePlayer();

        if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT)) {
            this.Left += 1;
        } else {
            this.Left = 0;
        }
        if (this.Left === 1) {

            if (this.positionX == this.rightLane) {
                //this.positionX = this.middleLane;
                this.toGoLane = this.middleLane
                this.goLeft = true
            } else if (this.positionX == this.middleLane) {
                //this.positionX = this.leftLane;
                this.toGoLane = this.leftLane
                this.goLeft = true
            }

        }

        if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT)) {
            this.Right += 1;
            if (this.Right === 1) {
                if (this.positionX == this.leftLane) {
                    //this.positionX = this.middleLane;
                    this.toGoLane = this.middleLane
                    this.goLeft = false
                } else if (this.positionX == this.middleLane) {
                    //this.positionX = this.rightLane;
                    this.toGoLane = this.rightLane
                    this.goLeft = false
                }
            }
        } else {
            this.Right = 0;
        }
    }


    private animatePlayer() {

        if (this.goLeft == true) {

            if (this.positionX >= this.toGoLane) {
                this.positionX = this.positionX - 22;

                if (this.positionX < this.toGoLane) {
                    this.positionX = this.toGoLane;
                }
            }
        } else if (this.goLeft == false) {
            if (this.positionX <= this.toGoLane) {
                this.positionX = this.positionX + 22;
                if (this.positionX > this.toGoLane) {
                    this.positionX = this.toGoLane;
                }
            }
        }

    }


    public draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(
            this.image,
            // Center the image in the lane with the x coordinates
            this.positionX - this.image.width / 2,
            this.canvas.height - 175
        );
    }

    /**
     * Collision detection of scoringObject and playerS
     */
    public collidesWith(scoringObject: ScoringObject): boolean {
        if (this.positionX < scoringObject.getPositionX() + scoringObject.getImageWidth()
            && this.positionX + this.image.width > scoringObject.getPositionX()
            && this.canvas.height - 175 < scoringObject.getPositionY() + scoringObject.getImageHeight()
            && this.canvas.height - 175 + this.image.height > scoringObject.getPositionY()
        ) {
            return true;
        }

        return false;
    }



    /**
    * Loads an image in such a way that the screen doesn't constantly flicker
    * @param {HTMLImageElement} source
    * @return HTMLImageElement - returns an image
    */
    private loadNewImage(source: string): HTMLImageElement {
        const img = new Image();
        img.src = source;
        return img;
    }
}
