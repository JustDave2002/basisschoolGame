
/// <reference path="../ScoringObject.ts"/>

class Heart extends ScoringObject {

    public constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.image = this.loadNewImage("assets/img/objects/heart.png");
        this.speed = 10;
        this.points = 0;
        this._lives = 1;
    }
}

