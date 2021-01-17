class Player {

    // Canvas used for calculations of distances and positions
    private canvas: HTMLCanvasElement;

    // Coördinates for the positions of the lanes
    private leftLane: number;
    private middleLane: number;
    private rightLane: number;

    // KeyListener used to move the player
    private keyListener: KeyListener;

    // Variables used to visualize the player on the canvas
    private image: HTMLImageElement;
    private positionX: number;
    private positionY: number;
    private velocityY: number = 2

    // Variables used to move the player
    private Left: number = 0;
    private Right: number = 0;
    private toGoLane: number;
    private goLeft: boolean;


    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        // Calculates the positon of the lanes depending on the size of the canvas
        this.leftLane = this.canvas.width / 24 * 9;
        this.middleLane = this.canvas.width / 2;
        this.rightLane = this.canvas.width / 24 * 15;

        this.keyListener = new KeyListener();

        // The player is given an image and a starting position
        this.image = this.loadNewImage("./assets/img/players/carplayer.png");
        this.positionX = this.middleLane;
        this.positionY = this.canvas.height - 175;
    }

    /**
     * Function used to move the player
     */
    public move() {
        // KeyListener detects the button press to the left. A variable is changed instead of running the code
        // to prevent the player from moving multiple spaces because of how the KeyListener works.
        if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT)) {
            this.Left += 1;
        } else {
            this.Left = 0;
        }
        if (this.Left === 1) {
        // The x-position of the player is set to the calculated position of the right lane.
        // If statement checks the current lane and changes the position to either the middle lane or right lane.
            if (this.positionX == this.rightLane) {
                this.toGoLane = this.middleLane
                this.goLeft = true
            } else if (this.positionX == this.middleLane) {
                this.toGoLane = this.leftLane
                this.goLeft = true
            }

        }

        if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT)) {
            this.Right += 1;
            if (this.Right === 1) {
                if (this.positionX == this.leftLane) {
                    this.toGoLane = this.middleLane
                    this.goLeft = false
                } else if (this.positionX == this.middleLane) {
                    this.toGoLane = this.rightLane
                    this.goLeft = false
                }
            }
        } else {
            this.Right = 0;
        }
        // The animatePlayer function is called so the movement isn't sudden but has a smooth animation.
        this.animatePlayer();
    }

    /**
     * A variation on the normal move funciton used for the question screens.
     * The function only allows the player to move to the left or right lane, 
     * since the middle lane isn't supposed to be an option.
     */
    public questionMove() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT) && this.positionX != this.leftLane) {
            console.log("going left");
            this.goLeft = true;
            this.toGoLane = this.leftLane;
        } else if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT) && this.positionX != this.rightLane) {
            console.log("going right");
            this.goLeft = false;
            this.toGoLane = this.rightLane;
        }
        this.animatePlayer();
    }

    /**
     *  This function adds an transition to change of the current screen.
     *  The image assigned to the player is moved up to the top of the canvas.
     * @param activate 
     * @param reset 
     */
    public goUp(activate: boolean, reset: boolean): boolean {
        if (reset == true) {
            this.positionX = this.middleLane;
            this.goLeft = undefined;

        }
        if (activate == true) {
            this.velocityY += 1, 5
            if (this.positionY >= -200) {
                this.positionY -= this.velocityY;
                return false;
            } else {
                return true;
            }
        } else {
            this.positionY = this.canvas.height - 175;
            this.velocityY = 2;
            return false;
        }
    }

    /**
     * The coordinates assigned in either of the move functions is applied and animated
     * in a smooth transition from the previous coordinate to the new one.
     */
    private animatePlayer() {

        if (this.goLeft == true) {

            if (this.positionX >= this.toGoLane) {
                this.positionX = this.positionX - 25;
                // An extra if statement to compensate for the possibility of an overshoot.
                if (this.positionX < this.toGoLane) {
                    this.positionX = this.toGoLane;
                }
            }
        } else if (this.goLeft == false) {
            if (this.positionX <= this.toGoLane) {
                this.positionX = this.positionX + 25;
                if (this.positionX > this.toGoLane) {
                    this.positionX = this.toGoLane;
                }
            }
        }

    }

    /**
     * The player elements are drawn on the canvas
     * @param ctx
     */
    public draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(
            this.image,
            // Center the image in the lane with the x coordinates
            this.positionX - this.image.width / 2,
            this.positionY
        );
    }

    /**
     * Collision detection to check if the player has hit any of the objects in the canvas.
     * The sizes of the images and the coordinates are used to calculate if there is any intersection of an image.
     * If an intersection is detected a true is returned.
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
