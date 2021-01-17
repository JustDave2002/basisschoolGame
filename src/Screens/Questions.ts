/// <reference path="../Screens.ts"/>
/**
 * class that is responsible for all the logic for a questionsGame
 */
abstract class Questions extends Screens {

    protected canvas: HTMLCanvasElement;

    protected questionArray: any;
    private currentQuestion: string;
    protected currentOptions: string;
    private currentAnswer: number;
    private currentExplanation: string;

    private questionIsRight: boolean;
    private leftOrRight: number;
    private questionConfirmed: boolean;

    private questionI: number;
    private pickedQuestion: boolean;

    private firstStart: boolean = true;

    // keeps score of the amount of questions that have been completed
    private questionCounter: number = 0

    constructor(canvas: HTMLCanvasElement, player: Player) {
        super(player);
        this.player = player;
        this.canvas = canvas
        this.reset(0);
    }

    /**
     * resets all switches and variables
     * removes used question from the array
     * @param resetNumber 0 is for first instance (initialise) 1 is for a reset (next question)
     */
    private reset(resetNumber: number) {
        if (resetNumber == 1) {
            this.questionArray.splice(this.questionI, 1)
            this.leftOrRight = undefined;
            this.questionIsRight = undefined;
        }
        this.questionConfirmed = false;
        this.pickedQuestion = false;
        this.player.goUp(false, true)
    }

    /**
     * logic of the level
     * 
     */
    public gameLogic() {
        // checks if this is the first level of the game and initialises it
        if (this.firstStart == true) {
            this.reset(0);
            this.firstStart = false;
        }

        // logic for the player in questionGame
        this.player.goUp(this.questionConfirmed, false);
        this.player.questionMove();

        // picks a random question from the array to display
        if (this.pickedQuestion == false) {
            this.questionI = this.randomInteger(0, this.questionArray.length)

            this.currentQuestion = this.questionArray[this.questionI].question;

            this.currentOptions = this.questionArray[this.questionI].choices;
            this.currentAnswer = this.questionArray[this.questionI].answer;
            this.currentExplanation = this.questionArray[this.questionI].explanation;
            this.pickedQuestion = true
        }


        // logic for picking a question
        if (this.questionConfirmed == false) {
            if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT) || this.leftOrRight == 1) {
                this.leftOrRight = 1;
            }
            if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT) || this.leftOrRight == 2) {
                this.leftOrRight = 2;
            }
        }

        this.questionCheck();
        //if an answer has been picked the game waits for a CTRL to show next question or start the next screen
        if (this.questionConfirmed == true && this.keyListener.isKeyDown(KeyListener.KEY_CTRL)) {
            this.questionCounter++

            // checks if 2 questions have been displayed to start next screen, if not it shows a new question
            if (this.questionCounter >= 2) {
                if (this.player.goUp(true, true)) {
                    this.state = ScreenState.NEXT_SCREEN;
                    this.questionCounter = 0;
                }
            } else {
                this.reset(1);
            }
        }
    }
    /**
     * checks what answer the player is picking and if the player confirms checks if the answer was correct or not
     */
    private questionCheck() {
        // if player clicked on an answer check for confirmation
        if (this.leftOrRight == 1 || this.leftOrRight == 2) {

            // if question is confirmed check if the answer is right 
            if (this.keyListener.isKeyDown(KeyListener.KEY_UP) || this.questionConfirmed == true) {
                this.questionConfirmed = true;

                if (this.currentAnswer == this.leftOrRight) {
                    this.questionIsRight = true;
                } else {
                    this.questionIsRight = false;
                }
            }
        }
    }


    /**
     * draws everything on the level
     */
    public draw(ctx: CanvasRenderingContext2D) {
        //draws base question and 2 options else writes Press for next Question
        if (this.questionConfirmed == false) {
            for (let i = 0; i < this.currentQuestion.length; i++) {
                this.writeTextToCanvas(ctx, this.currentQuestion[i], this.canvas.width / 2, 50 + i * 50, 40);
            }

            this.writeTextToCanvas(ctx, this.currentOptions[0], this.canvas.width / 2 - 350, 170, 40);
            this.writeTextToCanvas(ctx, this.currentOptions[1], this.canvas.width / 2 + 350, 170, 40);
        } else {
            this.writeTextToCanvas(ctx, "Druk op CTRL om door te gaan!", this.canvas.width / 2, 150, 45);
        }

        // writes explenation when an answer is picked
        if (this.questionIsRight != undefined) {
            for (let i = 0; i < this.currentExplanation.length; i++) {
                this.writeTextToCanvas(ctx, this.currentExplanation[i], this.canvas.width / 2, 400 + 50 * i, 40);
            }
        }

        //writes if your answer was right or wrong
        if (this.questionIsRight == true) {
            this.writeTextToCanvas(ctx, "Dat was het goede antwoord!", this.canvas.width / 2, 250, 40, "white");
        } else if (this.questionIsRight == false) {
            this.writeTextToCanvas(ctx, "Dat was niet het goede antwoord!", this.canvas.width / 2, 250, 40, "white");
        }
    }
}