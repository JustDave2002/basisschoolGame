/// <reference path="../level.ts"/>

class Level5 extends Level {

    
    public constructor(canvas: HTMLCanvasElement, player:Player) {
        //90 400 0

        super(canvas,player, 5)
    this.baseSpawnRate = 65; 
     this.maxPoints= 1000;
     this.speedMultiplier= 2;
    }
}