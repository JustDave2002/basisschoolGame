/// <reference path="../Screens/Level.ts"/>

class Level4 extends Level {


    public constructor(canvas: HTMLCanvasElement, player: Player) {
        super(canvas, player, 4)
        this.baseSpawnRate = 70;
        this.maxPoints = 800;
        this.speedMultiplier = 1.5;
    }
}