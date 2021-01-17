/// <reference path="../Screens/Questions.ts"/>

class QLevel7 extends Questions {


    public constructor(canvas: HTMLCanvasElement, player: Player) {
        super(canvas, player)
        this.questionArray = [
            {
                question: ["wat is een betrouwbare emailadres?", ""],
                choices: ["choochoo@outlook.com", "info@zeelandnet.nl"],
                answer: 2, 
                explanation: ["Misschien geen van beide, maar als je moet kiezen is de 2de betrouwbaarder.",""],
            },{
                question: ["Je gaat naar een site die wilt dat je een vragenlijst invult, zodat je een prijs kan winnen.", "Je moet je volledige naam en adres invullen. Ga je het invullen?"],
                choices: ["Ja", "Nee"],
                answer: 2, 
                explanation: ["De kans is groot dat hier dieven achter zitten die je persoonlijke gegevens willen weten.","Niet doen dus!"],
            },{
                question: ["Je zit in een groepschat en iemand zegt iets gemeens over jou.", "Jij:"],
                choices: ["Negeer het bericht en laat het je ouders weten", "Zegt iets gemeens terug"],
                answer: 1, 
                explanation: ["Je hoeft nooit te reageren op een bericht dat je verdrietig of ongemakkelijk laat voelen","Ga naar je ouders zodat zij je kunnen helpen."],
            },{
                question: ["Met je ouder(s) heb je afgesproken wat je wel en niet mag doen op je computer. Maar nu ben je aan het spelen bij een vriend van je!", "Hou je je nog steeds aan de afspraken?"],
                choices: ["Ja", "Tuurlijk niet!"],
                answer: 1, 
                explanation: ["Die afspraken zijn er voor een reden.","Het is dus het beste om je eraan te houden."],
            },{
                question: ["Een vriendin heeft een foto van je online gezet die jij niet leuk vindt. Je vraagt of zij het wilt verwijderen maar ze zegt nee", "Wat doe je?"],
                choices: ["Zet een stomme foto van HAAR online", "Laat je ouders helpen"],
                answer: 2, 
                explanation: ["Je ouders kunnen je helpen met de foto verwijderen of je vriendin aan te spreken.",""],
            },{
                question: ["Iemand online wilt je ontmoeten. Wil je dat ook doen?", ""],
                choices: ["Ja, kan geen kwaad", "Nee, voor de zekerheid"],
                answer: 2, 
                explanation: ["Alleen als je de persoon ECHT kent, is het veilig om te doen.",""],
            },{
                question: ["Op je telefoon, waar installeer je apps mee?", ""],
                choices: ["Op een website", "op een 'store'"],
                answer: 2, 
                explanation: ["Op je telefoon gebruik je de 'App Store' or 'Play Store' om veilig apps te downloaden.",""],
            }
            
            
        ]
    }
}