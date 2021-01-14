/// <reference path="../Screens/Questions.ts"/>

class QLevel2 extends Questions {


    public constructor(canvas: HTMLCanvasElement, player: Player) {
        super(canvas, player)
        this.questionArray = [
            {
                question: [" Je krijgt een e-mail met een hilarisch onderwerp dat duidelijk een scam is wat doe je?"],
                 choices: ["Vermijd te klikken op de links en markeer ze als spam", " Stuur de e-mail door naar je vrienden maar zeg er niet op te klikken "],
                 answer: 1, 
                 explanation: ["links zijn gevaarlijk "]
             
             },{
                 question: [" Welk e-mailadres lijkt echt?"],
                 choices: ["HenkBakplaat@gmal.com", "KarelVisser@gmail.com"],
                 answer: 2, 
                 explanation: ["gmal is fout want het is gmail"]
             
             },{
                question: [" Je krijgt een e-mail van je neef in de bijlage staat een bestand in de e-mail staat “je zal nooit geloven wat er is gebeurt” wat doe je?"],
                choices: ["Verwijder de E-mail en vertel je ouders dat je neef gehackt is ", " Open hem hij is toch familie"],
                 answer: 1, 
                 explanation: ["Nooit rare emails vetrouwen"]
             
             },{
                 question: [" Een site vraagt voor je bankgegevens wat moet je doen?"],
                 choices: ["vul het in ", " negeer het en ga weg van de site"],
                 answer: 2, 
                 explanation: ["nooit zomaar het geven"]
             
             },{
                 question: [" Je wil een product kopen op een site waar kijk je naar?"],
                 choices: ["de reviews bekijken", "Alleen naar het product zelf"],
                 answer: 1, 
                 explanation: ["altijd kijken naar reviews zodat je niet word opgelicht"]
             
             },{
                 question: [" Je wilt een computerprogramma downloaden waar kijk je naar?"],
                 choices: ["lijkt het officieel", "Alleen naar het product zelf"],
                 answer: 1, 
                 explanation: ["Altijd kijken of het de goede site is."]
             
             },
            
        ]
    }
}