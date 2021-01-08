/// <reference path="../Screens.ts"/>

class GameWon extends Screens {


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

        this.writeTextToCanvas(ctx, `You won the Game!`, this.canvas.width / 2, 200, 40);
        //this.writeTextToCanvas(ctx, `Press P to start the next level`, this.canvas.width / 2, 250, 40); 
    }


}