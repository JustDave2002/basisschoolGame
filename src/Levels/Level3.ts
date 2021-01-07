/// <reference path="../level.ts"/>

class Level3 extends Level {

    
    public constructor(canvas: HTMLCanvasElement, player:Player) {
        //90 400 0

        super(canvas,player)
    this.baseSpawnRate = 75; 
     this.maxPoints= 400;
     this.speedMultiplier= 1;
    }
}