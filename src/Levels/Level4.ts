/// <reference path="../Screens/Level.ts"/>

class Level4 extends Level {

    public constructor(canvas: HTMLCanvasElement, player: Player) {
        super(canvas, player, 4)
        this.baseSpawnRate = 70;
        this.maxPoints = 400;
        this.baseSpeed = 2.5;
    }
}