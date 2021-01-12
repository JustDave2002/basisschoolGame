abstract class Screens{

    protected state: ScreenState = ScreenState.PLAYING

    protected keyListener: KeyListener = new KeyListener
    
    protected constructor(){

        this.state = ScreenState.PLAYING
    }
    getState(): ScreenState {
        return this.state
    }

    abstract gameLogic(): void;

    abstract draw(ctx:CanvasRenderingContext2D): void; 

        
    
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
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.strokeText(text, xCoordinate, yCoordinate);
    ctx.fillStyle = color
    ctx.stroke();
    ctx.textAlign = alignment;
    ctx.fillText(text, xCoordinate, yCoordinate);
}

/**
    * Generates a random integer number between min and max
    *
    * @param {number} min - minimal time
    * @param {number} max - maximal time
    */
   protected randomInteger(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
}

}