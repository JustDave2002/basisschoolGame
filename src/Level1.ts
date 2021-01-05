/// <reference path="level.ts"/>

class Level1 extends Level {

    
    public constructor(canvas: HTMLCanvasElement, player:Player) {
        //90 400 0

        super(canvas,player)
    this.baseSpawnRate = 90; 
     this.maxPoints= 400;
     this.speedMultiplier= 0,5;
    }
}