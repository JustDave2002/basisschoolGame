/// <reference path="../ScoringObject.ts"/>

class SilverCoin extends ScoringObject {

    public constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.image = this.loadNewImage("assets/img/objects/silvercoin.png");
        this.speed = 7;
        this.points = 5;
        this._lives = 0;
    }
}


