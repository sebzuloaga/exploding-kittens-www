import React,  {useState, useEffect } from 'react';
import '../../styles/CombinationField.css';
import CombinedCard from '../CombinedCard/CombinedCard';
import { useGameContext } from '../GameSession/GameSession';

function CombinationField () {
    const {
        playerHands = {}, 
        combinedCards = [],
        discardPile = [],
        randomSteal = () => {}, 
        currentPlayer = "", 
        directedSteal = () => {},
        recoverDiscardedCard = () => {},
    } = useGameContext();

    const [canStealRandom, setCanStealRandom] = useState<boolean>();
    const [canStealDirect, setCanStealDirect] = useState<boolean>();
    const [canRecoverDiscarded, setCanRecoverDiscarded] = useState<boolean>();

    const isRandomStealPossible = (): boolean => {
        const combinedCardsQuantity = combinedCards.length;

        if (combinedCardsQuantity === 2) {
            const playerHand = playerHands[currentPlayer];
            const firstCardId = playerHand[combinedCards[0]].id;
            const combiningCards = combinedCards.map(cardPosition => {return playerHand[cardPosition]});
            const cardsAreAllSame = combiningCards.every(card => { return card.id === firstCardId});
            return cardsAreAllSame;
        }

        return false;
    };

    const isDirectedStealPossible = (): boolean => {
        const combinedCardsQuantity = combinedCards.length;

        if (combinedCardsQuantity === 3) {
            const playerHand = playerHands[currentPlayer];
            const firstCardId = playerHand[combinedCards[0]].id;
            const combiningCards = combinedCards.map(cardPosition => {return playerHand[cardPosition]});
            const cardsAreAllSame = combiningCards.every(card => { return card.id === firstCardId});
            return cardsAreAllSame;
        }

        return false;
    };

    const isDiscardRecoveryPossible = (): boolean => {
        return combinedCards.length === 5 && discardPile.length > 0;
    };

    const handleStealRandom = () => {
        const usedCardId = playerHands[currentPlayer][combinedCards[0]].id;
        randomSteal(currentPlayer, 'Anika', 1, usedCardId);
    };

    const handleStealSpecific = () => {
        const usedCardId = playerHands[currentPlayer][combinedCards[0]].id;
        directedSteal(currentPlayer, 'Anika', 'defuse', usedCardId);
    };

    const handleDiscardRecover = () => {
        recoverDiscardedCard('skip');
    };

    useEffect(() => {
        const updatedRandomStealStatus = isRandomStealPossible();
        const updatedDirectedStealStatus = isDirectedStealPossible();
        const updatedDiscardRecoveryStatus = isDiscardRecoveryPossible();
        setCanStealRandom(updatedRandomStealStatus);
        setCanStealDirect(updatedDirectedStealStatus);
        setCanRecoverDiscarded(updatedDiscardRecoveryStatus);
    }, [combinedCards]);

    return (
        <div className="CardCombinator">
            <h6>Combine Cards Here</h6>
            <div className="CardCombinatorArea" style={{width: '100%', margin: 'auto'}}>
                {combinedCards.map((cardPosition, index) => {
                    const card = playerHands[currentPlayer][cardPosition];
                    return <CombinedCard card={card} cardPosition={index} />
                })}
            </div>
            <div>
                {canStealRandom && <button onClick={handleStealRandom}>Steal Random Card</button>}
                {canStealDirect && <button onClick={handleStealSpecific}>Steal Specific Card</button>}
                {canRecoverDiscarded && <button onClick={handleDiscardRecover}>Recover From Discard Pile</button>}
            </div>
        </div>
    )
};

export default CombinationField;