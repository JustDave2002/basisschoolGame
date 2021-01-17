/// <reference path="../Screens/Level.ts"/>

class Level5 extends Level {

    public constructor(canvas: HTMLCanvasElement, player: Player) {
        super(canvas, player, 5)
        this.baseSpawnRate = 65;
        this.maxPoints = 600;
        this.baseSpeed = 4.5;
    }
}