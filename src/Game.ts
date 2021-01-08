class Game {
    

    // The canvas
    private canvas: HTMLCanvasElement;

    // The player on the canvas
    private player: Player;

  
    //9 is last level
    private screenIndex: number = 0;

    private screenArray: Screens[];
    
    private currentScreen: Screens;


    public constructor(canvas: HTMLElement) {
        this.canvas = <HTMLCanvasElement>canvas;

        // Resize the canvas so it looks more like a Runner game
        this.canvas.width = 650;
        this.canvas.height = window.innerHeight;

        // Set the player at the center
        this.player = new Player(this.canvas);

        this.screenArray = [
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
            new Level8(this.canvas, this.player),
            new GameWon(this.canvas)]

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

        this.currentScreen.gameLogic();

        if (this.currentScreen.getState()== ScreenState.NEXT_SCREEN){
            this.advanceToNextLevel();
        }

        this.draw();

        // Call this method again on the next animation frame
        // The user must hit F5 to reload the game
        requestAnimationFrame(this.step);
    }

    private advanceToNextLevel() {
        this.currentScreen = this.screenArray[this.screenIndex];
        this.screenIndex++;

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
        if (this.currentScreen.getState()== ScreenState.DIED) {
            new DeathScreen(this.canvas)
        }
        

        

       
        this.currentScreen.draw(ctx);  
        
        
        this.player.draw(ctx);
        
    }
    
}
