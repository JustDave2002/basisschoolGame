/// <reference path="../Screens.ts"/>

class DeathScreen extends Screens {

    
    private canvas: HTMLCanvasElement
    public constructor(canvas: HTMLCanvasElement) {
        super()
        this.canvas = canvas
    }

    public gameLogic(){
        if (this.keyListener.isKeyDown(KeyListener.KEY_P)){
            this.state = ScreenState.NEXT_SCREEN
        }
    }

    public draw(){
        
        // Get the canvas rendering context
        const ctx = this.canvas.getContext('2d');
        
        this.writeTextToCanvas(ctx, `You Lost`, this.canvas.width / 2, 200, 40);
        
    }


}