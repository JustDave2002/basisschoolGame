/// <reference path="../Screens/Questions.ts"/>

class QLevel6 extends Questions {


    public constructor(canvas: HTMLCanvasElement, player: Player) {
        super(canvas, player)
        this.questionArray = [
            {
                question: ["Wat is een goed wachtwoord?", ""],
                choices: ["!H0i.", "54321"],
                answer: 1, 
                explanation: ["Meer verschillende tekens als wachtwoord is altijd beter.",""],
            },{
                question: ["Als je klaar bent met op je computer zitten, wat is dan het beste om te doen?", ""],
                choices: ["Weglopen", "De computer uitzetten"],
                answer: 1, 
                explanation: ["Het uitzetten bespaart energie, en niemand kan iets met je computer doen!",""],
            },{
                question: ["Je krijgt een berichtje van iemand die zegt dat hij graag een foto van je zou willen zien.", "Wat doe je?"],
                choices: ["Je stuurt een foto", "Je stuurt geen foto"],
                answer: 2, 
                explanation: ["Het is beter om anoniem te blijven!",""],
            },{
                question: ["Je moet een wachtwoord aanmaken. Wat voor wachtwoord doe je?", ""],
                choices: ["Deel van je naam en wat cijfers", "Willekeurige letters en cijfers"],
                answer: 2, 
                explanation: ["Hoewel 1 makkelijker te onthouden is, is het ook makkelijker te raden voor dieven.","Dat is dus niet zo handig."],
            },{
                question: ["Een klasgenoot vraagt je of hij met jouw inloggegevens in mag loggen,", "omdat hij zijn gegevens vergeten is. Sta je dat toe?"],
                choices: ["Nee, eigen schuld dikke bult", "Ja, 1 keertje maar"],
                answer: 1, 
                explanation: ["Wie het ook is, deel NOOIT je inloggegevens! Ze zijn alleen van jou.",""],
            },{
                question: ["Een klasgenoot stuurt je een grappig maar beschamende video van een klasgenoot die struikelt", "Wat doe je?"],
                choices: ["Je verwijdert de video", "Je stuurt de video door"],
                answer: 1, 
                explanation: ["Dit is cyberpesten, en natuurlijk doe jij hier niet aan mee.",""],
            }
            
            
        ]
    }
}