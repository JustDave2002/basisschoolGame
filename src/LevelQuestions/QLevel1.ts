/// <reference path="../Screens/Questions.ts"/>

class QLevel1 extends Questions {


    public constructor(canvas: HTMLCanvasElement, player: Player) {
        super(canvas, player)
        this.questionArray = [
            {
                question: "What is the capital of United Kingdom?",
                choices: ["Manchester", "Birmingham"],
                answer: 2, 
                explanation: "Elit sint sit tempor ut consequat commodo veniam mollit magna. Eu Lorem cillum minim amet enim excepteur laborum ad. Occaecat irure minim voluptate eu dolore. Magna nostrud aliquip et laborum laboris. Eiusmod fugiat anim nulla adipisicing sint sit ullamco ex. Ipsum dolore ea consectetur minim. Anim consectetur irure commodo excepteur cupidatat deserunt do nostrud ad anim ex aute."
            },
        
            {
              question: "What is the capital of United States?",
              choices: ["California", "New York"],
              answer: 1,
              explanation: ["Elit sint sit tempor ut consequat commodo veniam mollit magna.", 
              "Eu Lorem cillum minim amet enim excepteur laborum ad.", 
              "Occaecat irure minim voluptate eu dolore.",
               "Magna nostrud aliquip et laborum laboris.", 
               "Eiusmod fugiat anim nulla adipisicing sint sit ullamco ex.", 
               "Ipsum dolore ea consectetur minim. Anim consectetur irure commodo excepteur cupidatat", 
               "deserunt do nostrud ad anim ex aute."]
            
            } 
        ]
    }
}