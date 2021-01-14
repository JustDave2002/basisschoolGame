/// <reference path="../Screens.ts"/>
/**
 * 
 */
abstract class Questions extends Screens {

    private player: Player;
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
    private questionCounter:number = 0


    constructor(canvas: HTMLCanvasElement, player: Player) {
        super();
        this.player = player;
        this.canvas = canvas
        this.reset(0);
    }

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


    public gameLogic() {
        if (this.firstStart == true){
            this.reset(0);
            this.firstStart = false;
        }
        this.player.goUp(this.questionConfirmed,false);
        this.player.questionMove();
        if (this.pickedQuestion == false) {
            this.questionI = this.randomInteger(0, this.questionArray.length)

            this.currentQuestion = this.questionArray[this.questionI].question;

            this.currentOptions = this.questionArray[this.questionI].choices;
            this.currentAnswer = this.questionArray[this.questionI].answer;
            this.currentExplanation = this.questionArray[this.questionI].explanation;
            this.pickedQuestion = true
        }


        console.log(this.leftOrRight, this.questionConfirmed);
        if (this.questionConfirmed == false) {
            if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT) || this.leftOrRight == 1) {
                this.leftOrRight = 1;
            }
            if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT) || this.leftOrRight == 2) {
                this.leftOrRight = 2;
            }
        }
        this.questionCheck();
        if(this.questionConfirmed == true && this.keyListener.isKeyDown(KeyListener.KEY_SHIFT)){
            this.questionCounter ++
            if (this.questionCounter ==2){
                this.state = ScreenState.NEXT_SCREEN;
                this.questionCounter = 0;
            }else{
            this.reset(1);
        }
        }
    }

    private questionCheck() {
        if (this.leftOrRight == 1 || this.leftOrRight == 2) {
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


    public draw(ctx: CanvasRenderingContext2D) {

        if(this.questionConfirmed == false){
            for (let i = 0; i < this.currentQuestion.length; i++) {
                this.writeTextToCanvas(ctx, this.currentQuestion[i], this.canvas.width / 2, 50 +i*50, 40);
            }
        
        this.writeTextToCanvas(ctx, this.currentOptions[0], this.canvas.width / 2 - 350, 170, 40);
        this.writeTextToCanvas(ctx, this.currentOptions[1], this.canvas.width / 2 + 350, 170, 40);    
        } else {
            this.writeTextToCanvas(ctx, "Druk op SHIFT om door te gaan!", this.canvas.width / 2, 150, 45);
        }
        
        

        if (this.questionIsRight != undefined) {
            for (let i = 0; i < this.currentExplanation.length; i++) {
                this.writeTextToCanvas(ctx, this.currentExplanation[i], this.canvas.width / 2, 400 + 50 * i, 40);

            }

        }
        if (this.questionIsRight == true) {
            this.writeTextToCanvas(ctx, "Dat was het goede antwoord!", this.canvas.width / 2, 250, 40, "white");
        } else if (this.questionIsRight == false) {
            this.writeTextToCanvas(ctx, "Dat was niet het goede antwoord!", this.canvas.width / 2, 250, 40, "white");
        }

    }
}