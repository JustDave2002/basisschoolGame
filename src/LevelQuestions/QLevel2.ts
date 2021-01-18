/// <reference path="../Screens/Questions.ts"/>

class QLevel2 extends Questions {


    public constructor(canvas: HTMLCanvasElement, player: Player) {
        super(canvas, player)
        this.questionArray = [
            {
                question: [" Je krijgt een grappige e-mail naar je toegestuurd."," Hij lijkt vreemd  wat doe je?",""],
                choices: ["Let niet op deze mail en verwijder hem", " Stuur de e-mail door naar je vrienden."],
                answer: 1, 
                explanation: ["links zijn gevaarlijk ",""]
             
             },{
                question: [" Welk e-mailadres lijkt echt?",""],
                choices: ["12345@hotmail.com", "KarelVisser@gmail.com"],
                answer: 2, 
                explanation: ["Mensen gebruiken vaak hun naam, let daar op!",""]
             
             },{
                question: [" Je krijgt een e-mail van je neef in de bijlage staat een link met",
                " de titel: “je zal nooit geloven wat er is gebeurt” wat doe je?",""],
                choices: ["Verwijder de E-mail en vertel het je ouders.", " Open hem. Hij is toch familie"],
                answer: 1, 
                explanation: ["Vetrouw nooit van deze rare e-mails.",""]
             
             },{
                question: [" Een site vraagt voor je adres wat moet je doen?",""],
                choices: ["Vul het in.", " Negeer het en ga weg van de site."],
                answer: 2, 
                explanation: ["Geef nooit prive informatie uit op het internet.",""]
             
             },{
                question: [" Je wilt een product kopen op een site. Waar kijk je naar?",""],
                choices: ["Bekijk de recensies.", "Alleen naar het product zelf."],
                answer: 1, 
                explanation: ["Kijk altijd naar de  recensies zodat je niet wordt opgelicht.",""]
             
             },{
                question: [" Je wilt een computerprogramma downloaden. Waar kijk je naar?",""],
                choices: ["Controleer of je op een goede site zit.", "Alleen naar het product zelf."],
                answer: 1, 
                explanation: ["Zo wat je zeker dat je het goede download.",""]
             
             },
            
        ]
    }
}