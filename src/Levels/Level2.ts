/// <reference path="level.ts"/>

class Level2 extends Level {

    
    public constructor(canvas: HTMLCanvasElement, player:Player) {
        //90 400 0

        super(canvas,player)
    this.baseSpawnRate = 90; 
     this.maxPoints= 200;
     this.speedMultiplier= 1;
    }
}