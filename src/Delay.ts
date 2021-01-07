class Delay {
    constructor() {
        
    }


/**
     * pauses the game for ms amount of time
     * @param ms amount of time in MS
     */
    public delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}