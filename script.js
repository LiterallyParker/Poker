class Card {
    constructor(suit,rank) {
        this.suit = suit;
        this.rank = rank;
    }
    printCard() {
        console.log(`${this.rank} of ${this.suit}`)
        return `${this.rank} of ${this.suit}`
    }

}

class Deck {
    constructor() {
        this.cards = []
        let suits = ["spades","hearts","diamonds","clubs"]
        let ranks = ["ace",1,2,3,4,5,6,7,8,9,"jack2","queen2","zking2"]
        for(let i = 0; i < suits.length; i++) {
            for(let j = 0; j < ranks.length; j++) {
                this.cards.push(new Card(suits[i],ranks[j]))
            }
        }
    }
    shuffle() {
        let currentIndex = this.cards.length, randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex > 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [this.cards[currentIndex], this.cards[randomIndex]] = [
            this.cards[randomIndex], this.cards[currentIndex]];
        }
    }
    deal(num) {
        let cardsDealt = []
        for(let i = 0; i < num; i++) {
            cardsDealt.push(this.cards.pop())
        }
        return cardsDealt;
    }
    printDeck() {
        for(let i = 0; i < this.cards.length; i++) {
            console.log(this.cards[i].printCard())
        }
    }
}

class Hand {
    constructor() {
        this.cards = []
        this.score = {
            "pair":false,
            "pair2":false,
            "threeOfAKind":false,
            "straight":false,
            "flush":false,
            "fullHouse":false,
            "fourOfAKind":false,
            "straightFlush":false,
            "royalFlush":false
        }
    }

    compareCard(a,b) {
            return a !== b
    }
    compareRank(a,b) {
        return a.rank == b.rank
    }
    compareSuit(a,b) {
        return arguments.suit == arguments.suit
    }

    pairFnc() {
        for(let i = 0; i < this.cards.length; i++) {
            for(let j = 0; j < this.cards.length;j++) {
                if(this.compareCard(this.cards[i],this.cards[j]) && this.compareRank(this.cards[j],this.cards[i])) {
                    this.score.pair = true
                    break
                }
            }
        }
    }
    pair2Fnc() {
        if(this.score.pair) {
            for(let i = 0; i < this.cards.length; i++) {
                for(let j = 0; j < this.cards.length; j++) {
                    for(let k = 0; k < this.cards.length; k++) {
                        for(let l = 0; l < this.cards.length; l++) {
                            if(this.compareCard(this.cards[i],this.cards[j]) && this.compareCard(this.cards[k],this.cards[l]) && this.compareCard(this.cards[i],this.cards[k]) && this.compareCard(this.cards[i],this.cards[l]) && this.compareCard(this.cards[j],this.cards[k]) && this.compareCard(this.cards[j],this.cards[l]) && this.compareRank(this.cards[i],this.cards[j]) && this.compareRank(this.cards[k],this.cards[l]) && this.compareRank(this.cards[l],this.cards[j]) == false) {
                                this.score.pair2 = true
                                break
                            }
                        }
                    }
                }
            }
        }
    }
    threeOfAKindFunc() {
        if(this.score.pair) {
            for(let i = 0; i < this.cards.length; i++) {
                for(let j = 0; j < this.cards.length; j++) {
                    for(let k = 0; k < this.cards.length; k++) {
                        if(this.compareCard(this.cards[i],this.cards[j]) && this.compareCard(this.cards[j],this.cards[k]) && this.compareCard(this.cards[i],this.cards[k]) && this.compareRank(this.cards[i],this.cards[k]) && this.compareRank(this.cards[i],this.cards[j]) && this.compareRank(this.cards[j],this.cards[k])) {
                            this.score.threeOfAKind = true
                            break
                        }
                    }
                }
            }
        }
    }
    straightFnc() {
        let arr = []
        for(let i = 0; i < this.cards.length;i++) {
            arr.push(this.cards[i].rank)
        }
        arr.sort()
        for(let i = 0; i < arr.length; i++) {
            
        }
    }
}

class Poker {
    play() {
        this.deck = new Deck()
        this.hand = new Hand()
        this.deck.shuffle()
        let cardsDealt = this.deck.deal(5)
        for(let i = 0; i < cardsDealt.length; i++) {
            this.hand.cards.push(cardsDealt[i]);
        }
        this.hand.pairFnc()
        this.hand.pair2Fnc()
        this.hand.threeOfAKindFunc()
        this.hand.straightFnc()
        console.log(this.hand.score.pair)
        console.log(this.hand.score)
        for(let i = 0; i < this.hand.cards.length; i++) {
            console.log(this.hand.cards[i])
        }
        function rankCorrector(item) {
            for(let i = 1; i < 10; i++) {
                if(item.rank == i) {
                    item.rank++
                    break
                }
            }
            if(item.rank == "zking2") {
                return "king2";
            } else {
                return item.rank
            }
        }
        let img;
        for(let i = 0; i < this.hand.cards.length; i++) {
            img = document.getElementById(`card${i}`)
            img.src = `cards/${rankCorrector(this.hand.cards[i])}_of_${this.hand.cards[i].suit}.png`
        }
    }
}

let poker = new Poker()
function buttonFnc() {
    poker = new Poker()
    poker.play()
}