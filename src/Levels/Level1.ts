/// <reference path="../level.ts"/>

class Level1 extends Level {

    
    public constructor(canvas: HTMLCanvasElement, player:Player) {
        super(canvas,player, 1)
    this.baseSpawnRate = 100; 
     this.maxPoints= 100;
     this.speedMultiplier= 0,5;
    }
}