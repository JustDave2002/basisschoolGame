/// <reference path="../Screens/Questions.ts"/>

class QLevel1 extends Questions {


    public constructor(canvas: HTMLCanvasElement, player: Player) {
        super(canvas, player)
        this.questionArray = [
            {
                question: ["Wat moet je doen wanneer je een vreemde email krijgt van een onbekende?"],
                choices: ["verwijder de email ", " rapporteer en blokkeer "],
                answer: 2, 
                explanation:[ ["Je kan zo zorgen dat google  er iets tegen kan doen."], 
                "Ook krijg je dan geen emails meer."]
            
            },{
                 question: ["Wat is een goed wachtwoord?"],
                 choices: ["1234", " W0nderwa11$"],
                 answer: 2, 
                explanation: ["1234 is heel makkelijk om voor hackers achter te komen.",
                "W0nderwa11$ is dat niet door de tekens"]
            
            },{
                question: ["Tegen welke mensen vertel je inloggegevens"],
                choices: ["Niemand of je ouders", "Je vrienden"],
                answer: 1, 
                explanation: [" Je kan  je ouders vertrouwen",
                "En je vrienden niet perse."]
            
            },{
                question: ["Je krijgt van iemand die je niet kent een sms",
                "en hij stelt persoonlijke vragen wat doe je?"],
                choices: ["Blokkeer diegene en vertel het aan je ouders ", " ga met de persoon in gesprek"],
                answer: 1, 
                explanation: ["Je moet nooit beantwoorden.",
                "Hierdoor weten ze niks"]  
            
            },{
                question: ["Welke gegevens deel je niet op je sociale media?"],
                choices: ["je adres en je persoonlijke telefoonnummer ", "je naam"],
                answer: 1, 
                explanation:[ "Deze info is voor vrienden niet iedereen."]
            
            },{
                question: ["Is het oké om je je ouders betalings informatie op het internet te delen?"],
                choices: ["ja", "nee"],
                answer: 2, 
                explanation:[ "Nooit Betalingsgegevens delen."]
            
            },{
               question:[ "Je zit op een chatbox website iemand stelt wat rare persoonlijk vragen.",
                "wat doe je?"],
                choices: ["rapporteer en blokkeer en vertel je ouders", " je beantwoordt de vragen"],
                answer: 1, 
                explanation: ["Je moet nooit beantwoorden.",
                "Hierdoor weten ze niks"]   
            
            },{
                question: ["Je krijgt een berichtje van een familie lid die vraagt of je",
                 "even de betalingsgegevens kan sturen omdat ze die vergeten zijn. Wat doe je?"],
                choices: ["je belt of vraagt je ouders persoonlijk", " je geeft hem de betalingsinformatie"],
                answer: 1, 
                explanation: ["Nooit betaalinformatie aan mensen uitgeven.", 
                "Ze kunnen gehacked zijn of het kan een nep nummer zijn."]
            
            },/**{
                question: "",
                choices: ["", ""],
                answer: 2, 
                explanation: ["",""]
            },{
                question: "",
                choices: ["", ""],
                answer: 2, 
                explanation: ["",""]
            },*/
            
        ]
    }
}
/**{
                question: "What is the capital of United Kingdom?",
                choices: ["Manchester", "Birmingham"],
                answer: 2, 
                explanation: ["Elit sint sit tempor ut consequat commodo veniam mollit magna. Eu Lorem cillum minim amet enim excepteur laborum ad. Occaecat irure minim voluptate eu dolore. Magna nostrud aliquip et laborum laboris. Eiusmod fugiat anim nulla adipisicing sint sit ullamco ex. Ipsum dolore ea consectetur minim. Anim consectetur irure commodo excepteur cupidatat deserunt do nostrud ad anim ex aute."]
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
            
            } */