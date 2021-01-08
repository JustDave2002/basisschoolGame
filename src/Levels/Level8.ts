/// <reference path="../level.ts"/>

class Level8 extends Level {


    public constructor(canvas: HTMLCanvasElement, player: Player) {
        super(canvas, player, 8)
        this.baseSpawnRate = 50;
        this.maxPoints = 1600;
        this.speedMultiplier = 3.5;
    }
}