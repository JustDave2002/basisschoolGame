class Game {
    

    // The canvas
    private canvas: HTMLCanvasElement;

    // The player on the canvas
    private player: Player;

  
    //9 is last level
    private levelIndex: number = 0;

    private levelArray: Screens[];
    
    private level: Screens;


    public constructor(canvas: HTMLElement) {
        this.canvas = <HTMLCanvasElement>canvas;

        // Resize the canvas so it looks more like a Runner game
        this.canvas.width = 650;
        this.canvas.height = window.innerHeight;

        // Set the player at the center
        this.player = new Player(this.canvas);

        this.levelArray = [
            new Level1(this.canvas, this.player),
            new LevelWon(this.canvas),
            new Level2(this.canvas, this.player),
            new LevelWon(this.canvas),
            new Level3(this.canvas, this.player),
            new LevelWon(this.canvas),
            new Level4(this.canvas, this.player),
            new LevelWon(this.canvas),
            new Level5(this.canvas, this.player),
            new LevelWon(this.canvas),
            new Level6(this.canvas, this.player),
            new LevelWon(this.canvas),
            new Level7(this.canvas, this.player),
            new LevelWon(this.canvas),
            new Level8(this.canvas, this.player)]

        this.advanceToNextLevel();

        




        // Start the animation
        console.log('start animation');
        requestAnimationFrame(this.step);
    }

    /**
     * This MUST be an arrow method in order to keep the `this` variable
     * working correctly. It will be overwritten by another object otherwise
     * caused by javascript scoping behaviour.
     */
    step = () => {

        this.level.gameLogic();

        if (this.level.getState()== ScreenState.NEXT_SCREEN){
            this.advanceToNextLevel();
        }

        this.draw();

        // Call this method again on the next animation frame
        // The user must hit F5 to reload the game
        requestAnimationFrame(this.step);
    }

    private advanceToNextLevel() {
        this.level = this.levelArray[this.levelIndex];
        this.levelIndex++;

    }


    /**
     * Render the items on the canvas
     */
    private draw() {
        // Get the canvas rendering context
        const ctx = this.canvas.getContext('2d');
        // Clear the entire canvas 
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        

        
        //writes you lost when you lost
        if (this.level.getState()== ScreenState.DIED) {
            this.writeTextToCanvas(ctx, `You Lost`, this.canvas.width / 2, 200, 40);
        }
        //writes the pause message when game is paused
        else if (this.level.getState()== ScreenState.PAUSED) {
            this.writeTextToCanvas(ctx, `Paused`, this.canvas.width / 2, 200, 40);
            this.writeTextToCanvas(ctx, `Press P to start`, this.canvas.width / 2, 250, 35);
        }

        

       
        this.level.draw(ctx);  
        
        
        this.player.draw(ctx);
        
    }
    /**
     * Create a random scoring object and clear the other scoring objects by setting them to `null`.
     */
    
    /**
   * Writes text to the canvas
   * @param {string} text - Text to write
   * @param {number} fontSize - Font size in pixels
   * @param {number} xCoordinate - Horizontal coordinate in pixels
   * @param {number} yCoordinate - Vertical coordinate in pixels
   * @param {string} alignment - Where to align the text
   * @param {string} color - The color of the text
   */
  protected writeTextToCanvas(
    ctx: CanvasRenderingContext2D,
    text: string,
    xCoordinate: number,
    yCoordinate: number,
    fontSize: number = 20,
    color: string = "red",
    alignment: CanvasTextAlign = "center"
) {
    ctx.font = `${fontSize}px sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = alignment;
    ctx.fillText(text, xCoordinate, yCoordinate);
}
}
