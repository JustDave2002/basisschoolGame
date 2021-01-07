/// <reference path="../level.ts"/>

class Level7 extends Level {

    
    public constructor(canvas: HTMLCanvasElement, player:Player) {
        //90 400 0

        super(canvas,player)
    this.baseSpawnRate = 55; 
     this.maxPoints= 1400;
     this.speedMultiplier= 3;
    }
}