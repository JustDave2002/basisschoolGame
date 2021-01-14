class QLevel4 extends Questions {


    public constructor(canvas: HTMLCanvasElement, player: Player) {
        super(canvas, player)
        this.questionArray = [
            {
                question: ["Iemand gebruikt foute worden op het internet wat doe je?"],
               choices: ["Doe niks ", "Rapporteer en blokkeer"],
               answer: 2, 
               explanation: ["Altijd rapporteren en blokkeren. Dan kan er iets tegen worden gedaan."]
           },{
                question: [" Je krijgt een link naar je toegestuurd waarvan je niet van weet wat het doet wat doe je?"],
               choices: ["Je klikt erop om te kijken waar het naartoe gaat", " je klikt er niet op "],
               answer: 2, 
               explanation: ["Kan een virus bevatten doe het niet"]
           },{
                question: [" Je krijgt een berichtje van een familie lid die vraagt of je even de betalingsgegevens kan sturen omdat ze die vergeten zijn wat doe je?"],
               choices: [" je vraagt het aan je ouders persoonlijk en blokkeer de persoon", " je geeft hem de betalingsinformatie"],
               answer: 1, 
               explanation: ["Nooit delen kan nep zijn"]
           },{
               question: [" Je zit op een chatbox website iemand stelt wat rare persoonlijk vragen wat doe je?"],
               choices: ["rapporteer en blokkeer en vertel je ouders", " je beantwoordt de vragen"],
               answer: 1, 
               explanation: ["Je moet nooit beantwoorden.",
               "Hierdoor weten ze niks"]   
           },{
               question: "Wat is een goed wachtwoord?",
                choices: ["1234", " W0nderwa11$"],
                answer: 2, 
               explanation: ["1234 is heel makkelijk om voor hackers achter te komen.",
               "W0nderwa11$ is dat niet door de tekens"]
           
           },{
               question: ["Wat is een betere game"],
               choices: ["Minecraft", "Fortnite"],
               answer: 1, 
               explanation: ["Minecraft is een veel beter spel"]
           }
            
        ]
    }
}