/// <reference path="level.ts"/>

class Level8 extends Level {

    
    public constructor(canvas: HTMLCanvasElement, player:Player) {
        //90 400 0

        super(canvas,player)
    this.baseSpawnRate = 50; 
     this.maxPoints= 1600;
     this.speedMultiplier= 3.5;
    }
}