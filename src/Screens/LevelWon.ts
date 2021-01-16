/// <reference path="../Screens.ts"/>

class LevelWon extends Screens {


    private keyWasPressed: boolean = true;
    private canvas: HTMLCanvasElement
    public constructor(canvas: HTMLCanvasElement, player: Player) {
        super(player)
        this.canvas = canvas
    }

    public gameLogic() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_CTRL) != true) {
            this.keyWasPressed = false;
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_CTRL) && this.keyWasPressed == false) {
            this.state = ScreenState.NEXT_SCREEN;
        }
    }

    public draw() {

        // Get the canvas rendering context
        const ctx = this.canvas.getContext('2d');

        this.writeTextToCanvas(ctx, `Gefeliciteerd, je hebt het level gehaald!`, this.canvas.width / 2, 200, 40);
        this.writeTextToCanvas(ctx, `Druk op CTRL om de volgende level te starten`, this.canvas.width / 2, 250, 40);
    }


}