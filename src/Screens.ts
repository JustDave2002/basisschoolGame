abstract class Screens{

    protected won: boolean = false;

    protected keyListener: KeyListener = new KeyListener
    
    protected constructor(){

        
    }
    isComplete(): boolean {
        return this.won
    }

    //protected draw(ctx:CanvasRenderingContext2D) {
        
    //}

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