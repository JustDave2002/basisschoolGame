/// <reference path="../ScoringObject.ts"/>

class Background extends ScoringObject {

    private currentLevel: number
    public background: HTMLImageElement;
    private collidedSwitch: boolean = false;

    public constructor(canvas: HTMLCanvasElement, currentLevel: number, yPos: number = canvas.height * -1) {
        super(canvas);
        this.speed = 7;
        this.points = 0;
        this._lives = 0;
        this.positionX = 0;
        this.positionY = yPos;

        this.currentLevel = currentLevel


        this.background = this.loadNewImage("assets/img/street.jpg");
        this.imageChanger();
    }

    private imageChanger() {

        switch (this.currentLevel) {
            case 1:
                this.background = this.loadNewImage("assets/img/street.jpg");
                break;
            case 3:
                this.background = this.loadNewImage("assets/img/street2.jpg");
                break;
            case 5:
                this.background = this.loadNewImage("assets/img/street3.jpg");
                break;
                case 7:
                this.background = this.loadNewImage("assets/img/street7.jpg");
                break;
            default:
                break;
        }
    }

    /**
     * is used to spawn a new background once the bottom of this BG hits the canvas bottom.
     */
    public backgroundCollision(): boolean {


        if (this.positionY + this.background.height - 20 > this.canvas.height && this.collidedSwitch == false) {
            this.collidedSwitch = true
            return true;

        }

        return false;
    }
}



