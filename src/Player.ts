class Player {

    private canvas: HTMLCanvasElement;

    private leftLane: number;
    private middleLane: number;
    private rightLane: number;

    private keyListener: KeyListener;
    private keyUp: boolean;

    private image: HTMLImageElement;
    private positionX: number;


    private Left: number = 0;
    private Right: number = 0;
    private animate: number;
    private goLeft: boolean;

    private log: HTMLElement;
    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;


        this.leftLane = this.canvas.width / 6;
        this.middleLane = this.canvas.width / 2;
        this.rightLane = this.canvas.width / 6 * 5;

        this.keyListener = new KeyListener();
        this.log = document.getElementById('log')
        this.keyUp = true;

        this.image = this.loadNewImage("./assets/img/players/carplayer.png");
        this.positionX = this.canvas.width / 2;
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
                this.animate = 1
                this.goLeft = true
            } else if (this.positionX == this.middleLane) {
                //this.positionX = this.leftLane;
                this.animate = 0
                this.goLeft = true
            }

        }

        if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT)) {
            this.Right += 1;
            if (this.Right === 1) {
                if (this.positionX == this.leftLane) {
                    //this.positionX = this.middleLane;
                    this.animate = 1
                    this.goLeft = false
                } else if (this.positionX == this.middleLane) {
                    //this.positionX = this.rightLane;
                    this.animate = 2
                    this.goLeft = false
                }
            }
        } else {
            this.Right = 0;
        }
    }
    private animatePlayer() {

        //console.log("position of car", this.positionX);

        let goToCoords: number;
        const lanes: number[] = [
            this.leftLane,
            this.middleLane,
            this.rightLane
        ];
        //console.log("lane number", this.animate);

        for (let i = 0; i < lanes.length; i++) {
            if (this.animate == i) {
                goToCoords = lanes[i];
               // console.log("goToLane coords", goToCoords);
            }
        }

        //console.log("go left", this.goLeft);
        if (this.goLeft == true) {

            if (this.positionX >= goToCoords) {
                //console.log("moving 15 px");
                this.positionX = this.positionX - 10;

                if (this.positionX < goToCoords) {
                    this.positionX = goToCoords;
                }
            }
        } else if (this.goLeft == false) {
            if (this.positionX <= goToCoords) {
                //console.log("moving 15 px");
                this.positionX = this.positionX + 10;
                if (this.positionX > goToCoords) {
                    this.positionX = goToCoords;
                }
            }
        }
        //console.log("position of car", this.positionX);

    }


    public draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(
            this.image,
            // Center the image in the lane with the x coordinates
            this.positionX - this.image.width / 2,
            this.canvas.height - 150
        );
    }

    /**
     * Collision detection of scoringObject and player
     * Use bounding box detection method: https://computersciencewiki.org/index.php/Bounding_boxes
     */
    public collidesWith(scoringObject: ScoringObject): boolean {
        if (this.positionX < scoringObject.getPositionX() + scoringObject.getImageWidth()
            && this.positionX + this.image.width > scoringObject.getPositionX()
            && this.canvas.height - 150 < scoringObject.getPositionY() + scoringObject.getImageHeight()
            && this.canvas.height - 150 + this.image.height > scoringObject.getPositionY()
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
