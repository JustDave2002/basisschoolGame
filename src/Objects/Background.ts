/// <reference path="../ScoringObject.ts"/>

/**
 * this class is a falling object, responsible for which background is being displayed and the collision of it
 */
class Background extends ScoringObject {

    private currentLevel: number
    public backgroundImage: HTMLImageElement;
    private collidedSwitch: boolean = false;

    public constructor(canvas: HTMLCanvasElement, currentLevel: number, yPos: number = canvas.height * -2.4) {
        super(canvas);
        this.speed = 7;
        this.points = 0;
        this._lives = 0;
        this.positionX = 0;
        this.positionY = yPos;

        this.currentLevel = currentLevel

        this.imageChanger();
    }

    /**
     * changges the image based on the level being inputted
     */
    private imageChanger() {

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

    /**
     * is used to spawn a new background once the bottom of this BG hits the canvas bottom.
     * @returns true when collided with canvas bottom
     */
    public backgroundCollision(): boolean {


        if (this.positionY + this.backgroundImage.height - this.canvas.height > this.canvas.height && this.collidedSwitch == false) {
            this.collidedSwitch = true
            return true;

        }

        return false;
    }
}



