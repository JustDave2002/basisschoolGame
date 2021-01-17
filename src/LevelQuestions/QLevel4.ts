class QLevel4 extends Questions {


    public constructor(canvas: HTMLCanvasElement, player: Player) {
        super(canvas, player)
        this.questionArray = [
            {
                question: ["Je komt met iemand op het internet in discussie. Wat doe je?"],
                choices: ["Ga verder met deze persoon in gesprek.", "Ga de discussie niet aan."],
                answer: 2, 
                explanation: ["Dit soort gesprekken kunnen uit de hand lopen ga ze niet aan."]
           },{
               question: ["Lees je de voorwaarden van computer programma's?"],
               choices: ["Nee.", "Ja. "],
               answer: 2, 
               explanation: ["Altijd lezen dan weet je wat je accepteert."]
           },{
               question: ["Je krijgt een mail van de bank die vraagt voor je bank gegevens wat doe je?"],
               choices: ["Je belt de bank en checkt het na.", " Je geeft de informatie."],
               answer: 1, 
               explanation: ["Altijd na checken."]
           },{
               question: [" Je zit op een chatbox website iemand stelt wat rare persoonlijk vragen wat doe je?"],
               choices: ["Vertel je ouders.", "Je beantwoordt de vragen."],
               answer: 1, 
               explanation: ["Je moet nooit persoonlijke vragen beantwoorden."]  
           },{
               question: ["Je laptop begint langzamer te werken. Wat doe je?"],
               choices: ["Je doet er niks tegen.", "Je gebruikt een anti virus."],
                answer: 2, 
                explanation: ["Door een anti virus te gebruiken, kan je checken of je computer door een virus langzamer is gaan werken."]
           
           },{
               question: ["Een site vraagt om toegang tot je locatie. Wat doe je?"],
              choices: ["Niet doen.", "Geef toegang."],
               answer: 1, 
               explanation: ["Nooit zomaar een site je locatie geven."]
           }
            
        ]
    }
}