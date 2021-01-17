/// <reference path="../Screens/Level.ts"/>

class Level2 extends Level {

    public constructor(canvas: HTMLCanvasElement, player: Player) {
        super(canvas, player, 2)
        this.baseSpawnRate = 90;
        this.maxPoints = 200;
        this.baseSpeed = 2.5;
    }
}