/// <reference path="../Screens/Questions.ts"/>

class QLevel5 extends Questions {


    public constructor(canvas: HTMLCanvasElement, player: Player) {
        super(canvas, player)
        this.questionArray = [
            {
                question: ["Wat is de correcte naam van deze app?", ""],
                choices: ["WhatsApp", "WhatsApping!"],
                answer: 1, 
                explanation: ["Soms zijn er neppe versies van een app, let daarop. 'WhatsApp' is de juiste!",""],
            },{
                question: ["Terwijl je op sites zit te kijken, krijg je plots allemaal advertenties. Wat doe je?", ""],
                choices: ["je klikt de site weg", "je kijkt naar de advertenties"],
                answer: 1, 
                explanation: ["Als je plots allemaal advertenties krijgt, kan het zo zijn dat de website waar je op zit niet betrouwbaar is.","Kijk dus uit!"],
            },{
                question: ["Iemand die je niet kent belt je. Neem je op?", ""],
                choices: ["Ja", "Nee"],
                answer: 2, 
                explanation: ["Het veiligst is om niet op te nemen.","Vraag je ouders om hulp als je het niet zeker weet."],
            },{
                question: ["Je laptop loopt vast. Wat doe je?", ""],
                choices: ["Je slaat erop", "Roep je ouders"],
                answer: 2, 
                explanation: ["Sommige mensen slaan op hun apparaat in de hoop dat het weer gaat werken.","Niet doen! Het is niet slim en je kan je laptop meer schade aanrichten."],
            },{
                question: ["Iemand online stuurt je een bericht, zij wil graag je telefoonnummer zodat ze je een kaar kan bellen", "Wat doe je?"],
                choices: ["Geef haar niet je nummer", "Geef het nummer"],
                answer: 1, 
                explanation: ["Als je de persoon niet kent, kan je beter niet persoonlijke dingen weggeven.",""],
            },{
                question: ["Je krijgt een melding die zegt dat je telefoon gehackt is en dat je geld moet betalen om het weer te kunnen gebruiken", "Ga je naar je ouders of los je het zelf op?"],
                choices: ["Zelf: Ik betaal", "Ouders: ik vraag mijn ouders om hulp"],
                answer: 2, 
                explanation: ["Het is dapper dat je het zelf wilt oplossen, maar hulp van je ouders is altijd handiger!",""],
            }
            
        ]
    }
}