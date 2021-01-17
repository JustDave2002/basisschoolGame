/// <reference path="../Screens/Questions.ts"/>

class QLevel3 extends Questions {


    public constructor(canvas: HTMLCanvasElement, player: Player) {
        super(canvas, player)
        this.questionArray = [
            {
                question: ["Je zit al een tijdje achter de computer", "Wat ga je nu doen?",""],
                choices: ["Nog een youtube filmpje kijken", "Buiten spelen"],
                answer: 1, 
                explanation: ["Het is beter voor je om niet te lang achter de computer te zitten.",""]
             },{
                question: [" Je krijgt een vriendschapsverzoek van iemand die je niet kent. Wat doe je?",""],
                choices: ["Je accepteert het vriendschapsverzoek.", " Je weigert het vriendschapsverzoek."],
                answer: 2, 
                explanation: ["Voeg alleen mensen die je kent als vriend toe.",""]
             },{
                question: [" Je krijgt een link doorgestuurd  waarvan je niet van weet wat het doet. Wat doe je?",""],
                choices: ["Je klikt erop om te kijken waar het naartoe gaat.", "Je klikt er niet op."],
                answer: 2, 
                explanation: ["Klik nooit op vreemde internet links.",""]
             },{
                question: ["Een site zegt dat je iets duurs hebt gewonnen. Wat doe je?",""],
                choices: ["Vetrouw het niet.", "Doe wat er word gevraagd."],
                answer: 1, 
                explanation: ["Dit is altijd nep dus trap er niet in.",""]
             },{
                question: ["Een site zegt dat je iets duurs hebt gewonnen. Wat doe je?",""],
                choices: ["Vetrouw het niet.", "Doe wat er word gevraagd."],
                answer: 1, 
                explanation: ["Dit is altijd nep dus trap er niet in.",""]
             },{
                question: ["Je word gehacked en ze vragen om geld. Wat doe je?",""],
                choices: ["Geef geen geld.", "Geef ze het geld."],
                answer: 1, 
                explanation: ["Nooit betalen hiervoor dan kunnen ze om nog meer vragen.",""]
             }
            
        ]
    }
}