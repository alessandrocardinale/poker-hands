class Poker {
    constructor () {
        this.ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
        this.result = {
            index: '',
            descr: '',
            value: []
        }
    }

    sorted(hand) {    
        let sortedHand = [];
        for (let i = 0; i < this.ranks.length; i++) {
            for (let j = 0; j < hand.length; j++ ) { 
                if (this.ranks[i] === hand[j].charAt(0)) {
                    sortedHand.push(hand[j])
                }
            }   
        }
        return sortedHand;
    }

    rankAndSuit(sortedHand, index) {
        let array = [];
        for (var i = 0; i< sortedHand.length; i++) {
            array.push(sortedHand[i].charAt(index));
        }
        return array;
    }

    countRankOrSuit(array) {
        let result = {};
        array.forEach((e) => { result[e] = (result[e] || 0)+1; });
        return result;
    }

    isStraight(rankArray) {
        let index = this.ranks.indexOf(rankArray[0]),
            ref = this.ranks.slice(index, index + 5).join(""),
            section = rankArray.slice(0).join("");
                
        if (section === "TJQKA" && section === ref) {
            this.result.value.push(ref[ref.length-1]);
            return true;
        } else if (section === "2345A") {
            this.result.value.push('5');
            return true;
        } else if (section === ref) {
            this.result.value.push(ref[ref.length-1]);
            return true;
        } else {
            this.result.value = [];
            return false;
        }
    }

    checkPairs(element, checkValue, isDouble = false) {
        let checkResult = [];

        Object.keys(element).find((key) => {
            if (element[key] === checkValue) {
                checkResult.push(key);
                this.result.value.push(key);
            }
        });

        if(isDouble) {
            if(checkResult.length > 1) {
                return true;
            } else {
                this.result.value = [];
                return false;
            }
        } else {
            if (checkResult.length > 0) {
                return true;
            } else {
                this.result.value = [];
                return false;
            }
        }
    }

    whichHand(hand) {
        let rankArrayVar = this.rankAndSuit(hand, 0),
            suitArrayVar = this.rankAndSuit(hand, 1),
            countRankVar = this.countRankOrSuit(rankArrayVar),
            countSuitVar = this.countRankOrSuit(suitArrayVar);

        switch (true) {
            case (this.checkPairs(countSuitVar, 5) && this.isStraight(rankArrayVar) && rankArrayVar[rankArrayVar.length-2] == 'K'):
                this.result.index = 9;
                this.result.descr = 'Scala Reale di colore ' + this.result.value[0];
                break;
            case (this.isStraight(rankArrayVar) && this.checkPairs(countSuitVar, 5)):
                this.result.index = 8;
                this.result.descr = 'Scala Colore ' + this.result.value[1] + ' e carta alta ' + this.result.value[0];
                break;
            case this.checkPairs(countRankVar, 4):
                this.result.index = 7;
                this.result.descr = 'Poker di ' + this.result.value[0];
                break;
            case (this.checkPairs(countRankVar, 2) && this.checkPairs(countRankVar, 3)):
                this.result.index = 6;
                this.result.descr = 'Full con coppia di ' + this.result.value[0] + ' e tris di ' + this.result.value[1];
                break;
            case this.checkPairs(countSuitVar, 5):
                this.result.index = 5;
                this.result.descr = 'Colore con ' + this.result.value[0];
                break;
            case this.isStraight(rankArrayVar):
                this.result.index = 4;
                this.result.descr = 'Scala con carta alta ' + this.result.value[0];
                break;
            case this.checkPairs(countRankVar, 3):
                this.result.index = 3;
                this.result.descr = 'Tris di ' + this.result.value[0];
                break;
            case this.checkPairs(countRankVar, 2, true):
                this.result.index = 2;
                this.result.descr = 'Doppia Coppia con ' + this.result.value[0] + ' e ' + this.result.value[1];
                break;
            case this.checkPairs(countRankVar, 2):
                this.result.index = 1;
                this.result.descr = 'Coppia con ' + this.result.value[0];
                break;
            default:
                this.result.index = 0;
                this.result.value = [rankArrayVar[rankArrayVar.length-1]]; 
                this.result.descr = 'Carta Alta con ' + this.result.value[0];
                break;
        }

        return this.result;
    }
}
module.exports = { Poker };