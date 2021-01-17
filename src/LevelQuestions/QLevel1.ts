/// <reference path="../Screens/Questions.ts"/>

class QLevel1 extends Questions {


    public constructor(canvas: HTMLCanvasElement, player: Player) {
        super(canvas, player)
        this.questionArray = [
            {
                question: [" Wat moet je doen wanneer je een email krijgt van een onbekenden?",""],
                choices: ["verwijder de email ", " rapporteer en blokkeer "],
                answer: 2, 
                explanation:[ "  Je kan zo zorgen dat google  er iets tegen kan doen.", 
                "Ook krijg je dan geen emails meer.",""]
            
            },{
                question: ["Wat is een goed wachtwoord?",""],
                 choices: ["1234", " W0nderwa11$"],
                 answer: 2, 
                 explanation: ["1234 is makkelijk om achter te komen voor hackers.",
                                "W0nderwa11$ is dat niet door de symbolen",""]

            
            },{
                question: ["Tegen welke mensen vertel je inloggegevens?",""],
                choices: ["Je ouders", "Je vrienden"],
                answer: 1, 
                explanation: [" Je ouders houden het geheim ",
                              "Bij je vrienden weet je dat niet zeker.",""]
            
            },{
                question: [" Iemand stuurt je een sms en hij stelt persoonlijke vragen.",""],
                choices: ["Blokkeer diegene","Ga met de persoon in gesprek"],
                answer: 1, 
                explanation: ["Reageer nooit op deze berichten en deel zeker nooit informatie.",
                            "Hierdoor weten ze niks",""]  
            
            },{
                question: [" Welke dingen deel je niet op social media? ",""],
                choices: ["je adres "," je naam"],
                answer: 1, 
                explanation:[ "Deze info is voor vrienden niet iedereen.",""]
            
            },{
                question: ["Is het oké om je je ouders betalings informatie op het internet te delen?",""],
                choices: ["Ja", "Nee"],
                answer: 2, 
                explanation:[ "Deel nooit prive informatie.",""]
            
            }
            
            
            
        ]
    }
}