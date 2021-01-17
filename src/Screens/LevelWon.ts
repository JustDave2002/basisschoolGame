/// <reference path="../Screens.ts"/>
/**
 * is shown when a player wins a level
 * allows player to got to next level
 */
class LevelWon extends Screens {

    //switch to make sure the player doesn't accidentally have the CTRL key pressed already, skipping the screen
    private keyWasPressed: boolean = true;
    private canvas: HTMLCanvasElement

    public constructor(canvas: HTMLCanvasElement, player: Player) {
        super(player)
        this.canvas = canvas
    }

    /**
     * logic of the level
     * checks if CTRL key is pressed and puts game on next level
     */
    public gameLogic() {
        //checks if key was not already pressed
        if (this.keyListener.isKeyDown(KeyListener.KEY_CTRL) != true) {
            this.keyWasPressed = false;
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_CTRL) && this.keyWasPressed == false) {
            this.state = ScreenState.NEXT_SCREEN;
        }
    }

    /**
     * draws everything on the level
     */
    public draw() {
        // Get the canvas rendering context
        const ctx = this.canvas.getContext('2d');

        this.writeTextToCanvas(ctx, `Gefeliciteerd, je hebt het level gehaald!`, this.canvas.width / 2, 200, 40);
        this.writeTextToCanvas(ctx, `Druk op CTRL om de volgende level te starten`, this.canvas.width / 2, 250, 40);
    }
}