/// <reference path="ScoringObject.ts"/>

class GoldCoin extends ScoringObject {

 
    public constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.image = this.loadNewImage("assets/img/objects/goldcoin.png");
        this.speed = 5;
        this.points = 10;
        this._lives = 0;
    }
}
