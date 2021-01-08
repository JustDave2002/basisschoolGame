/// <reference path="../level.ts"/>

class Level6 extends Level {


    public constructor(canvas: HTMLCanvasElement, player: Player) {
        super(canvas, player, 6)
        this.baseSpawnRate = 60;
        this.maxPoints = 1200;
        this.speedMultiplier = 2.5;
    }
}