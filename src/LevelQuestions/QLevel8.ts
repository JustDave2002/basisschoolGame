/// <reference path="../Screens/Questions.ts"/>

class QLevel8 extends Questions {


    public constructor(canvas: HTMLCanvasElement, player: Player) {
        super(canvas, player)
        this.questionArray = [
            {
                question: ["Iemand stuurt je een vriendverzoek. Je kent hem niet maar je vriend zegt dat hij hem misschien kent. ","Accepteer je het vriendverzoek?"],
                choices: ["Ja", "Nee"],
                answer: 2, 
                explanation: ["Het veiligst is om dat niet te doen. Het is altijd veiliger om iemand toe te voegen in je vriendenlijst "],
            },{
                question: ["Wat is de veiligste manier om je telefoon mee te beschermen?", ""],
                choices: ["PIN-code", "vingerafdruk"],
                answer: 2, 
                explanation: ["Tegenwoordig kan je je telefoon vergrendelen met je vingerafdruk of zelfs je gezicht!","Het is makkelijker EN veiliger om dat te gebruiken."],
            },{
                question: ["Als je iets op het internet zet, wie kunnen dat dan zien?", ""],
                choices: ["Alleen jij", "Iedereen"],
                answer: 2, 
                explanation: ["Zodra je iets op het internet zet, kan iedereen het zien en kan je het niet meer verwijderen.","Je moet dus heel goed nadenken voordat je iets online zet."],
            },{
                question: ["Je krijgt een link voor Google Meet. 1 van je juf/meester, maar ook 1 van een andere persoon", "Welke klik je aan?"],
                choices: ["Je Juf", "De andere persoon"],
                answer: 2, 
                explanation: ["Vertrouw nooit links van onbekenden.",""],
            },{
                question: ["Je zit op een spelletjes-website, en ze vragen of je iets wilt downloaden voordat je het spel kan spelen.", "Wat doe je?"],
                choices: ["Spelen! download het", "Vraag aan volwassene of het veilig is"],
                answer: 2, 
                explanation: ["Zomaar iets downloaden is nooit veilig. Je moet altijd zeker weten wat je download.",""],
            },{
                question: ["Wat is GEEN persoonlijke informatie?", ""],
                choices: ["Je favoriete ijs-smaak", "De voornaam van je moeder"],
                answer: 1, 
                explanation: ["De tweede kan tegen jou of je moeder gebruikt worden.","Daar moet je voor oppassen!"],
            },{
                question: ["Dit is een geheime vraag. Als je deze hebt, heel cool B)", ""],
                choices: ["Ik ben cool", "Ik ben cool"],
                answer: 1, 
                explanation: ["Jij bent cool B)",""],
            }
            
        ]
    }
}