/// <reference path="../Screens/Questions.ts"/>

class QLevel3 extends Questions {


    public constructor(canvas: HTMLCanvasElement, player: Player) {
        super(canvas, player)
        this.questionArray = [
            {
                question: ["Je zit al 5 uur achter de computer", "Wat doe je?"],
                 choices: ["Stoppen", "Doorgaan"],
                 answer: 1, 
                 explanation: ["Normale lengte achter de computer","Want dat is goed"],
             },{
                 question: [" Je krijgt een vriendschapsverzoek van iemand die je niet kent wat doe je?"],
                 choices: ["je accepteert het vriendschapsverzoek", " je weigert het vriendschapsverzoek "],
                 answer: 2, 
                 explanation: ["Als je iemand niet kent doe het niet"]
             },{
                 question: [" Je krijgt een link naar je toegestuurd waarvan je niet van weet wat het doet wat doe je?"],
                 choices: ["Je klikt erop om te kijken waar het naartoe gaat", " je klikt er niet op "],
                 answer: 2, 
                 explanation: ["Kan een virus bevatten doe het niet"]
             },{
                 question: ["je word gecyberpest wat doe je"],
                 choices: ["je negeert het ", "Rappoteren en Blokkeren"],
                 answer: 2, 
                 explanation: ["Altijd rapporteren en blokkeren. Dan kan er iets tegen worden gedaan."]
             },{
                question: ["Een site zegt dat je iets hebt gewonnen", "Je bent de duizendste klant wat doe je."],
                 choices: ["vetrouw het niet", "Doe wat er word gevraagd"],
                 answer: 1, 
                 explanation: ["Dit is altijd nep trap er niet in."]
             },{
                 question: [" Je krijgt een link naar je toegestuurd waarvan je niet van weet wat het doet wat doe je?"],
                 choices: ["Je klikt erop om te kijken waar het naartoe gaat", " je klikt er niet op "],
                 answer: 2, 
                 explanation: ["Kan een virus bevatten doe het niet"]
             }
            
        ]
    }
}