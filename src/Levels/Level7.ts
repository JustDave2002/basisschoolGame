/// <reference path="../level.ts"/>

class Level7 extends Level {


    public constructor(canvas: HTMLCanvasElement, player: Player) {
        super(canvas, player, 7)
        this.baseSpawnRate = 55;
        this.maxPoints = 1400;
        this.speedMultiplier = 3;
    }
}