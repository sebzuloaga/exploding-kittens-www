import { get, shuffle } from 'lodash';
import { DECKS } from '../data/Decks';
import { CARDS, CardMdl } from '../data/Cards';
import { PlayerHandsMdl } from '../data/PlayerHand';

export const generateFullDeck = (decks: Array<string>): Array<CardMdl> => {
    const fullDeck = [] as any;

    decks.forEach(deckId => {
      const deck = DECKS[deckId]
      const cardIds = Object.keys(deck.cardQuantities);
      cardIds.forEach(cardId => {
        const card = CARDS[cardId];
        const cardQuantity = deck.cardQuantities[cardId] || 0;
        for(let i = 0; i < cardQuantity; i++) {
          fullDeck.push(card);
        }
      });
    });

    return fullDeck;
  }

export const getCardsToDeal = (cards: Array<CardMdl>): [Array<CardMdl>, Array<CardMdl>] => {
    const cardsToDeal = cards.filter(card => {
      const shouldBeShuffled = get(card, 'initialShuffle', false) || false;
      return shouldBeShuffled;
    });
    const cardsToNotDeal = cards.filter(card => {
      const shouldBeShuffled = get(card, 'initialShuffle', false) || false;
      return !shouldBeShuffled;
    });
    return [cardsToDeal, cardsToNotDeal];
}

export const dealCards = (players: Array<string>, cardsToDeal: Array<CardMdl>): [PlayerHandsMdl, Array<CardMdl>] => {
    const dealtHands = {} as any;
    const cartsToBeDealt = cardsToDeal;

    players.forEach(player => {
      dealtHands[player] = [];
    });

    for (let cardIndex = 0; cardIndex < 7; cardIndex++) {
      Object.keys(dealtHands).forEach(player => {
        const randomIndex = Math.floor(Math.random() * cartsToBeDealt.length);
        const randomCard = cartsToBeDealt[randomIndex];
        const cardsInHand = dealtHands[player];
        dealtHands[player] = cardsInHand.concat(randomCard);
        cartsToBeDealt.splice(randomIndex, 1);
      })
    }
    return [dealtHands, cartsToBeDealt];
};

export const allocateDefuseCards = (playerHands: PlayerHandsMdl, undealtCards: Array<CardMdl>): [PlayerHandsMdl, Array<CardMdl>] => {
    const handsWithDefuses = {} as PlayerHandsMdl;
    const finalUndealtCards = undealtCards;

    Object.keys(playerHands).forEach(player => {
      const currentCards = playerHands[player];
      const defuseIndex = finalUndealtCards.findIndex(undealtCard => {
        return undealtCard.id === CARDS.defuse.id;
      });
      const updatedCards = shuffle(currentCards.concat(finalUndealtCards[defuseIndex]));
      finalUndealtCards.splice(defuseIndex, 1);
      handsWithDefuses[player] = updatedCards;
    });

    return [handsWithDefuses, finalUndealtCards];
}