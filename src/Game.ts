class Game {
    

    // The canvas
    private canvas: HTMLCanvasElement;

    // The player on the canvas
    private player: Player;

    

    
    // KeyListener so the user can give input
    private keyListener: KeyListener;

    // Score
    
    // amount of frames
    private frameIndex: number;


    //paused or not
    private paused: boolean;
    //9 is last level
    private levelIndex: number = 0;

    private levelArray: Level[];
    private betweenLevel: LevelWon; 
    private level: Level;


    private delay: Delay;
    

    public constructor(canvas: HTMLElement) {
        this.canvas = <HTMLCanvasElement>canvas;

        this.delay = new Delay;

        // Resize the canvas so it looks more like a Runner game
        this.canvas.width = 650;
        this.canvas.height = window.innerHeight;

        // Set the player at the center
        this.player = new Player(this.canvas);

        this.levelArray = [
            new Level1(this.canvas, this.player),
            new Level2(this.canvas, this.player),
            new Level3(this.canvas, this.player),
            new Level4(this.canvas, this.player),
            new Level5(this.canvas, this.player),
            new Level6(this.canvas, this.player),
            new Level7(this.canvas, this.player),
            new Level8(this.canvas, this.player)]
            this.betweenLevel = new LevelWon(this.canvas);
        this.newLevel();

        

        this.frameIndex = 0;

        //pause state
        this.paused = true;

        this.keyListener = new KeyListener();
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

        //makes sure the pause logic is not frozen when the game is paused
        this.pause();

        //only executes the game when the game is not paused
        if (this.paused === false && this.level.getTotalLives() > 0 && this.level.isComplete() === false) {
            this.level.logic(this.frameIndex);
            this.frameIndex = this.level.getFrameIndex();
            this.frameIndex++
            
            this.player.move();
            //console.log(this.frameIndex);
            


            // checks if player collides
            this.level.collision();
            
            if (this.level.isComplete()){
                this.advanceToNextLevel();
            }
        } 

        this.draw();

        // Call this method again on the next animation frame
        // The user must hit F5 to reload the game
        requestAnimationFrame(this.step);
    }

    private advanceToNextLevel() {
        

        if (this.betweenLevel.isComplete()) {

        this.newLevel();
    }
    }

    

    private newLevel() {
        this.level = this.levelArray[this.levelIndex];
        this.levelIndex++;
    }

    /**
     * pauses the game on button press and start back up 1000 ms after pressing start
     */
    private async pause() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_ESC)) {
            this.paused = true
        } else if (this.keyListener.isKeyDown(KeyListener.KEY_P)) {
            await this.delay.delay(1000);
            this.paused = false
        }
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
        if (this.level.getTotalLives() <= 0) {
            this.writeTextToCanvas(ctx, `You Lost`, this.canvas.width / 2, 200, 40);
        }
        //writes the pause message when game is paused
        else if (this.paused === true) {
            this.writeTextToCanvas(ctx, `Paused`, this.canvas.width / 2, 200, 40);
            this.writeTextToCanvas(ctx, `Press P to start`, this.canvas.width / 2, 250, 35);
        }

        

        if (this.level.isComplete() === false) {
          this.level.draw(ctx, this.levelIndex);  
        } else if (this.level.isComplete() === true){

            this.betweenLevel.draw();
        }
        
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
