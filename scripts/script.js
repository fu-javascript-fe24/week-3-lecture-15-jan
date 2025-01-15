const log = (msg) => console.log(msg);

log('Hello World!');

const oGlobal = {
    deck : [],
    playerOneHand : [],
    playerTwoHand : [],
    playerOneScore : 0,
    playerTwoScore : 0,
}

createDeck();
shuffleDeck();
console.log(oGlobal.deck);
dealCards();
playHighestCard();
announceWinner();


function createDeck() {
    log('createDeck()');

    const suites = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

    for (const suit of suites) {
        for(let i = 2; i <= 14; i++) {
            let name = '';
            if(i < 11) {
                name = i;
            } else if(i === 11) {
                name = 'Jack';
            } else if(i === 12) {
                name = 'Queen';
            } else if(i === 13) {
                name = 'King';
            } else if(i === 14) {
                name = 'Ace';
            } else {
                log('Error');
            }
            // let c = createCard(i, name, suit);
            // oGlobal.deck.push(c)
            oGlobal.deck.push(createCard(i, name, suit))
        }
    }
}

function createCard(value, name, suit) {
    log('createCard()');
    let card = {
        value : value,
        name : `${name} of ${suit}`,
        suit : suit
    }
    return card;
}

// Fisher Yates Shuffle
function shuffleDeck() {
    log('shuffleDeck()');
    for(let i = oGlobal.deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = oGlobal.deck[i];
        oGlobal.deck[i] = oGlobal.deck[j];
        oGlobal.deck[j] = temp;
    }
}

function dealCards() {
    log('dealCards()');
    // let random = Math.floor(Math.random() * oGlobal.deck.length);
    // oGlobal.playerOneHand.push(oGlobal.deck[random]);
    // oGlobal.deck.splice(random, 1);

    // oGlobal.playerOneHand.push(oGlobal.deck.splice(Math.floor(Math.random() * oGlobal.deck.length), 1)[0]);

    for(let i = 0; i < 6; i++) {
        let card = oGlobal.deck.pop();
        oGlobal.playerOneHand.push(card);

        card = oGlobal.deck.pop();
        oGlobal.playerTwoHand.push(card);
    }

    log('---------------');
    log('Player One Hand');
    log('---------------');
    oGlobal.playerOneHand.forEach(card => log(card));
    log('---------------');
    log('Player Two Hand');
    log('---------------');
    oGlobal.playerTwoHand.forEach(card => log(card));
}

function playHighestCard() {
    log('playHighestCard()');

    oGlobal.playerOneHand = sortCardsByValue(oGlobal.playerOneHand);
    oGlobal.playerTwoHand = sortCardsByValue(oGlobal.playerTwoHand);

    for(let i = 0; i < 6; i++) {
        let playerOneHighest = oGlobal.playerOneHand.shift();
        let playerTwoHighest = oGlobal.playerTwoHand.shift();
        log(`${playerOneHighest.value} - ${playerTwoHighest.value}`)

        if(playerOneHighest.value > playerTwoHighest.value) {
            // oGlobal.playerOneScore = oGlobal.playerOneScore + 1;
            // oGlobal.playerOneScore += 1;
            oGlobal.playerOneScore++;
            log('Player One wins the draw due to the highest card!');
        } else if(playerOneHighest.value < playerTwoHighest.value) {
            oGlobal.playerTwoScore++;
            log('Player Two wins the draw due to the highest card!');
        } else if(playerOneHighest.suit === 'Hearts' ) {
            oGlobal.playerOneScore++;
            log('Player One wins the draw as Hearts wins all standoffs!');
        } else if(playerTwoHighest.suit === 'Hearts' ) {
            oGlobal.playerTwoScore++;
            log('Player Two wins the draw as Hearts wins all standoffs!');
        } else {
            log('Draw!');
        }
    }
}

function sortCardsByValue(deck) {
    deck.sort((a, b) => b.value - a.value);
    return deck;
}

function announceWinner() {
    log('announceWinner()');
    if(oGlobal.playerOneScore > oGlobal.playerTwoScore) {
        log(`Player One wins! The score ended ${oGlobal.playerOneScore} - ${oGlobal.playerTwoScore}!`)
    } else if(oGlobal.playerOneScore < oGlobal.playerTwoScore) {
        log(`Player Two wins! The score ended ${oGlobal.playerOneScore} - ${oGlobal.playerTwoScore}!`)
    } else {
        log(`It's a draw! The score ended ${oGlobal.playerOneScore} - ${oGlobal.playerTwoScore}!`)
    }
}