import { CardMdl } from '../data/Cards';
import { shuffle } from 'lodash';


export const shuffleDeck = (deck: Array<CardMdl>): Array<CardMdl> => {
    const shuffledDeck = shuffle(deck);
    return shuffledDeck;
};

export const getFutureCards = (deck: Array<CardMdl>): Array<CardMdl> => {
    const futureCards = []
    for(let i = 0; i < 3; i++) {
        futureCards.push(deck[i]);
    }
    return futureCards;
};

export const setCatomicBomb = (deck: Array<CardMdl>): Array<CardMdl> => {
    const explodingKittens = deck.filter(card => { return card.id === 'exploding_kitten' });
    const otherCards = shuffle(deck.filter(card => { return card.id !== 'exploding_kitten' }));
    const updatedDeck = explodingKittens.concat(otherCards);
    return updatedDeck;
};