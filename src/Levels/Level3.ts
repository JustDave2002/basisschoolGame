/// <reference path="../Screens/Level.ts"/>

class Level3 extends Level {


    public constructor(canvas: HTMLCanvasElement, player: Player) {
        super(canvas, player, 3)
        this.baseSpawnRate = 75;
        this.maxPoints = 300;
        this.speedMultiplier = 1;
    }
}