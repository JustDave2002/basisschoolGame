/// <reference path="../Screens/Level.ts"/>

class Level1 extends Level {


    public constructor(canvas: HTMLCanvasElement, player: Player) {
        super(canvas, player, 1)
        this.baseSpawnRate = 100;
        this.maxPoints = 1;
        this.speedMultiplier = 0.5;
    }
}