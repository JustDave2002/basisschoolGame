/// <reference path="../Screens.ts"/>

class StartScreen extends Screens {


    private canvas: HTMLCanvasElement
    public constructor(canvas: HTMLCanvasElement) {
        super()
        this.canvas = canvas
    }

    public gameLogic() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_CTRL)) {
            this.state = ScreenState.NEXT_SCREEN
        }
    }

    public draw() {

        // Get the canvas rendering context
        const ctx = this.canvas.getContext('2d');

        this.writeTextToCanvas(ctx, `Welkom bij ~naam hier~`, this.canvas.width / 2, 200, 40);
        this.writeTextToCanvas(ctx, `Druk op CTRL om de game te starten!`, this.canvas.width / 2, 250, 40);
    }


}