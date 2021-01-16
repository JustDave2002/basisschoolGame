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

    
    private advanceToNextLevelSwitch: boolean;


    public constructor(canvas: HTMLElement) {
        this.canvas = <HTMLCanvasElement>canvas;

        // Resize the canvas so it looks more like a Runner game
        this.canvas.width = window.innerHeight * 1.77777777778;
        this.canvas.height = window.innerHeight;

        this.load(0);
    }

    /**
     * loads an instance of the game
     */
    private load(screenIndex: number) {

        this.screenIndex = screenIndex;
        // Set the player at the center
        this.player = new Player(this.canvas);

        this.frameCount = 0;

        //array of screens
        this.screenArray = [
            new StartScreen(this.canvas, this.player),
            new Level1(this.canvas, this.player),
            new QLevel1(this.canvas, this.player),
            new LevelWon(this.canvas, this.player),
            new Level2(this.canvas, this.player),
            new QLevel2(this.canvas, this.player),
            new LevelWon(this.canvas, this.player),
            new Level3(this.canvas, this.player),
            new QLevel3(this.canvas, this.player),
            new LevelWon(this.canvas, this.player),
            new Level4(this.canvas, this.player),
            new QLevel4(this.canvas, this.player),
            new LevelWon(this.canvas, this.player),
            new Level5(this.canvas, this.player),
            new LevelWon(this.canvas, this.player),
            new Level6(this.canvas, this.player),
            new LevelWon(this.canvas, this.player),
            new Level7(this.canvas, this.player),
            new LevelWon(this.canvas, this.player),
            new Level8(this.canvas, this.player),
            new GameWon(this.canvas, this.player),
            new DeathScreen(this.canvas, this.player)]

            this.advanceToNextLevelSwitch = false;
        this.currentScreen = this.screenArray[this.screenIndex];




        // Start the animation
        console.log('start animation');
        this.startAnimating(60);
    }

    /**
     * This MUST be an arrow method in order to keep the `this` variable
     * working correctly. It will be overwritten by another object otherwise
     * caused by javascript scoping behaviour.
     */
    private animate = () => {



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
            this.advanceToNextLevel();

            this.currentScreen.gameLogic();

            if (this.currentScreen.getState() == ScreenState.NEXT_SCREEN) {
                this.advanceToNextLevelSwitch = true;
            } else if (this.currentScreen.getState() == ScreenState.RESTART) {
                this.load(1);
            } else if (this.currentScreen.getState() == ScreenState.DIED) {
                this.screenIndex = this.screenArray.length - 2;
                this.advanceToNextLevelSwitch = true;
            } else {
                this.advanceToNextLevelSwitch = false;
            }





            let sinceStart = this.now - this.startTime;
            let currentFps = Math.round(1000 / (sinceStart / ++this.frameCount) * 100) / 100;
            if (currentFps == 60) {
                currentFps = 60.10
            }
            //console.log("Elapsed time= " + Math.round(sinceStart / 1000 * 100) / 100 + " secs @ " + currentFps + " fps.");
            //console.log(currentFps);

            this.draw(currentFps);
        }
    }



    private advanceToNextLevel() {
        if (this.advanceToNextLevelSwitch == true) {
            if (this.currentScreen.getState() == ScreenState.DIED) {
                console.log("no");
                
                this.screenIndex++;
                this.currentScreen = this.screenArray[this.screenIndex];
                this.advanceToNextLevelSwitch = false;
                this.player.goUp(false, true); 
            }
            if (this.player.goUp(true, false)) {
                console.log("yes");
                
                this.screenIndex++;
                this.currentScreen = this.screenArray[this.screenIndex];
                this.advanceToNextLevelSwitch = false;
                this.player.goUp(false, true);
            } 
        }


    }






    private startAnimating(fps: number) {
        this.fpsInterval = 1000 / fps;
        this.then = Date.now();
        this.startTime = this.then;
        console.log(this.startTime);
        this.animate();
    }


    /**
     * Render the items on the canvas
     */
    private draw(fps: number) {
        // Get the canvas rendering context
        const ctx = this.canvas.getContext('2d');
        // Clear the entire canvas 
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);




        this.currentScreen.draw(ctx, fps);


        this.player.draw(ctx);

    }





}
