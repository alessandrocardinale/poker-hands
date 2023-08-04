const { Deck } = require('./deck.js');
const { Poker } = require('./poker.js');

function compareHands(firstHand, secondHand) {
    if (firstHand.index > secondHand.index) {
        console.log('Ha vinto il giocatore 1 in quanto ha ' + firstHand.descr);
    } else if (secondHand.index > firstHand.index) {
        console.log('Ha vinto il giocatore 2 in quanto ha ' + secondHand.descr);
    } else {
        switch (firstHand.index) {
            case 9:
                console.log('I due giocatori hanno pareggiato');
                break;
            case (2 || 6):
                if (firstHand.value[1] > secondHand.value[1]) {
                    console.log('Ha vinto il giocatore 1 in quanto ha ' + firstHand.descr);
                } else if (secondHand.value[1] > firstHand.value[1]) {
                    console.log('Ha vinto il giocatore 2 in quanto ha ' + secondHand.descr);
                } else {
                    if (firstHand.value[0] > secondHand.value[0]) {
                        console.log('Ha vinto il giocatore 1 in quanto ha ' + firstHand.descr);
                    } else if (secondHand.value[0] > firstHand.value[0]) {
                        console.log('Ha vinto il giocatore 2 in quanto ha ' + secondHand.descr);
                    } else {
                        console.log('I due giocatori hanno pareggiato');
                    }
                }
                break;
            default:
                if (firstHand.value[0] > secondHand.value[0]) {
                    console.log('Ha vinto il giocatore 1 in quanto ha ' + firstHand.descr);
                } else if (secondHand.value[0] > firstHand.value[0]) {
                    console.log('Ha vinto il giocatore 2 in quanto ha ' + secondHand.descr);
                } else {
                    console.log('I due giocatori hanno pareggiato');
                }
                break;
        }
        //DA SISTEMARE
    }
}

//creazione dei giocatori, del mazzo e del gioco
let pokerHandsFirstPerson =[], pokerHandsSecondPerson = [];
const pokerDeck = new Deck();
const manageCardFirst = new Poker();
const manageCardSecond = new Poker();

//mischiamo le carte e le distribuiamo ai 2 giocatori 
pokerDeck.shuffle();
pokerDeck.deal(pokerHandsFirstPerson);
pokerDeck.deal(pokerHandsSecondPerson);

// pokerHandsFirstPerson = ['2S', '7D', '8H', '9C', '5D']; //da commentare
// pokerHandsSecondPerson = ['JH', 'JC', 'JS', 'KH', 'KS']; //da commentare

//ordiniamo la mano dei due giocatori
pokerHandsFirstPerson = manageCardFirst.sorted(pokerHandsFirstPerson);
pokerHandsSecondPerson = manageCardSecond.sorted(pokerHandsSecondPerson);
console.log('La mano del giocatore 1 è: ' + pokerHandsFirstPerson);
console.log('La mano del giocatore 2 è: ' + pokerHandsSecondPerson);

//verifichiamo la mano dei due giocatori
pokerHandsFirstPerson = manageCardFirst.whichHand(pokerHandsFirstPerson);
pokerHandsSecondPerson = manageCardSecond.whichHand(pokerHandsSecondPerson);
console.log('Giocatore 1 ha: ' + pokerHandsFirstPerson.descr);
console.log('Giocatore 2 ha: ' + pokerHandsSecondPerson.descr);

//chi ha vinto?
compareHands(pokerHandsFirstPerson, pokerHandsSecondPerson)