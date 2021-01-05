
class Level2 extends Level {

    
    public constructor(canvas: HTMLCanvasElement, player:Player) {
        //90 400 0

        super(canvas,player)
    this.baseSpawnRate = 80; 
     this.maxPoints= 600;
     this.speedMultiplier= 1;
    }
}