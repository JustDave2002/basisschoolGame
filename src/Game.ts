class Game {


    // The canvas
    private canvas: HTMLCanvasElement;

    // The player on the canvas
    private player: Player;


    //9 is last level
    private screenIndex: number;

    private screenArray: Screens[];

    private currentScreen: Screens;

    //fps lock thing
    private frameCount: number = 0;
    private fps: number
    private fpsInterval: number
    private startTime: number
    private now: number
    private then: number
    private elapsed: number

    //Background Image related
    private background: HTMLImageElement;


    public constructor(canvas: HTMLElement) {
        this.canvas = <HTMLCanvasElement>canvas;

        // Resize the canvas so it looks more like a Runner game
        this.canvas.width = window.innerHeight * 1.77777777778;
        this.canvas.height = window.innerHeight;

        this.load(0);

        this.background = this.loadNewImage( "./assets/img/street.jpg");
    }

    /**
     * loads an instance of the game
     */
    private load(screenIndex: number) {

        this.screenIndex = screenIndex;
        // Set the player at the center
        this.player = new Player(this.canvas);

        //array of screens
        this.screenArray = [
            new StartScreen(this.canvas),
            new Level1(this.canvas, this.player),
            new QLevel1(this.canvas, this.player),
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
            new GameWon(this.canvas),
            new DeathScreen(this.canvas)]


        this.advanceToNextLevel();


        // Start the animation
        console.log('start animation');
        this.startAnimating(70);
    }

    /**
     * This MUST be an arrow method in order to keep the `this` variable
     * working correctly. It will be overwritten by another object otherwise
     * caused by javascript scoping behaviour.
     */
    private animate = () => {

        this.imageChanger();

        // request another frame

        requestAnimationFrame(this.animate);

        // calc elapsed time since last loop

        this.now = Date.now();
        this.elapsed = this.now - this.then;

        // if enough time has elapsed, draw the next frame

        if (this.elapsed > this.fpsInterval) {

            // Get ready for next frame by setting then=now, but...
            // Also, adjust for fpsInterval not being multiple of 16.67
            this.then = this.now - (this.elapsed % this.fpsInterval);

            // draw stuff here
            this.currentScreen.gameLogic();

            if (this.currentScreen.getState() == ScreenState.NEXT_SCREEN) {
                this.advanceToNextLevel();
            }
            else if (this.currentScreen.getState() == ScreenState.RESTART) {
                this.load(1);
            } else if (this.currentScreen.getState() == ScreenState.DIED) {
                this.screenIndex = this.screenArray.length - 1;
                this.advanceToNextLevel();

            }


            this.draw();


            //let sinceStart = this.now - this.startTime;
            //let currentFps = Math.round(1000 / (sinceStart / ++this.frameCount) * 100) / 100;
            //console.log("Elapsed time= " + Math.round(sinceStart / 1000 * 100) / 100 + " secs @ " + currentFps + " fps.");
        }
    }



    private advanceToNextLevel() {
        this.currentScreen = this.screenArray[this.screenIndex];
        this.screenIndex++;
    }






    private startAnimating(fps: number) {
        this.fpsInterval = 1000 / fps;
        this.then = Date.now();
        this.startTime = this.then;
        console.log(this.startTime);
        this.animate();
    }

    /**
    * Loads an image in such a way that the screen doesn't constantly flicker
    * @param {HTMLImageElement} source
    * @return HTMLImageElement - returns an image
    */
   private loadNewImage(source: string): HTMLImageElement {
    const img = new Image();
    img.src = source;
    return img;
}

    private imageChanger() {
        
        switch (this.currentScreen.getLevelIndex()) {
            case 2:
                this.background = this.loadNewImage( "./assets/img/street2.jpg");
                break;
            case 1:
                this.background = this.loadNewImage( "./assets/img/street.jpg");
                break;
            default:
                break;
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

        ctx.drawImage(
            this.background,
            // Center the image in the lane with the x coordinates
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );



        this.currentScreen.draw(ctx);


        this.player.draw(ctx);

    }

}
