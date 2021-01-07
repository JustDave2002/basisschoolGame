/// <reference path="../ScoringObject.ts"/>

class Banana extends ScoringObject {

    public constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.image = this.loadNewImage("assets/img/objects/banana.png");
        this.speed = 7;
        this.points = -10;
        this._lives = 0;
    }
}



