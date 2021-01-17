/// <reference path="../Screens.ts"/>
/**
 * is shown when a player starts the game
 * allows player to play again
 */
class StartScreen extends Screens {

    private canvas: HTMLCanvasElement

    public constructor(canvas: HTMLCanvasElement, player: Player) {
        super(player)
        this.canvas = canvas
    }

    /**
     * logic of the level
     * checks if CTRL key is pressed and puts game on first level
     */
    public gameLogic() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_CTRL)) {
            this.state = ScreenState.NEXT_SCREEN
        }
    }

    /**
     * draws everything on the level
     */
    public draw() {
        // Get the canvas rendering context
        const ctx = this.canvas.getContext('2d');

        this.writeTextToCanvas(ctx, `Welkom bij ~naam hier~`, this.canvas.width / 2, 200, 40);
        this.writeTextToCanvas(ctx, `Druk op CTRL om de game te starten!`, this.canvas.width / 2, 250, 40);
    }
}