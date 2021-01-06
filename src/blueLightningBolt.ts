/// <reference path="ScoringObject.ts"/>

class BlueLightningBolt extends ScoringObject {

 
    public constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.image = this.loadNewImage("assets/img/objects/box1.png");
        this.speed = 7;
        this.points = -15;
        this._lives = 0;
    }
}

