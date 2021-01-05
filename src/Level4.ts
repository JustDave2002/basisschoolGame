class Level4 extends Level {

    
    public constructor(canvas: HTMLCanvasElement, player:Player) {
        //90 400 0

        super(canvas,player)
    this.baseSpawnRate = 70; 
     this.maxPoints= 800;
     this.speedMultiplier= 1.5;
    }
}