/// <reference path="../Screens.ts"/>

class GameWon extends Screens {


    private canvas: HTMLCanvasElement
    public constructor(canvas: HTMLCanvasElement, player:Player) {
        super(player)
        this.canvas = canvas
    }

    public gameLogic() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_P)) {
            this.state = ScreenState.RESTART;
        }
    }

    public draw() {

        // Get the canvas rendering context
        const ctx = this.canvas.getContext('2d');

        this.writeTextToCanvas(ctx, `Gefeliciteerd! Je hebt alle levels gehaald!`, this.canvas.width / 2, 200, 40);
        this.writeTextToCanvas(ctx, `Druk op P om opnieuw te spelen`, this.canvas.width / 2, 250, 40);
    }


}