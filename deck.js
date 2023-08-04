class Deck {
    constructor () {
        this.deck = [];

        const suits = ['H', 'S', 'C', 'D'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
    
        for (let suit in suits) {
            for (let value in values) {
                this.deck.push(values[value] + suits[suit]);
            }
        }
    }
  
    shuffle () {
        const { deck } = this;
        let m = deck.length, i;
    
        while(m){
            i = Math.floor(Math.random() * m--);
    
            [deck[m], deck[i]] = [deck[i], deck[m]];
        }
        return this;
    }

    deal (hand) {
        for (let index = 0; index < 5; index++) {
            hand.push(this.deck.pop());
        }
        return hand;
    }
}
module.exports = { Deck };