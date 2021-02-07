import React from 'react';
import { CardMdl } from '../../data/Cards';
import '../../styles/GameCard.css'
import { CARD_COLORS } from '../../styles/config/colors';
import { useGameContext } from '../GameSession/GameSession';

interface Props {
    card: CardMdl,
    cardOwner: string,
    totalPlayerCards: number,
    cardPosition: number,
};

function GameCard({card, cardOwner, totalPlayerCards, cardPosition}: Props) {
    const { currentPlayer, cardActions, removeFromHand } = useGameContext();

    const handlePlayCard = () => {
        if (cardOwner !== currentPlayer) return;
        const action = cardActions ? cardActions[card.id] : () => {};
        action(cardPosition);
        if (removeFromHand && card.instantAction) {
            removeFromHand(cardOwner, cardPosition);
        }
    };

    return (
        <div className="GameCardWrapper" style={{left: `${0 + ((90 / totalPlayerCards) * cardPosition)}%`}}>
            <div className="GameCardContainerBack" onClick={handlePlayCard}>
            <div className="GameCardBack"></div>
            </div>
            <div className="GameCardContainerFront" onClick={handlePlayCard}>
                <div style={{border: `3px solid ${CARD_COLORS[card.id]}`}} className="GameCardContent">
                    <h4>{card.name}</h4>
                </div>
            </div>
        </div>
   
    )
};

export default GameCard;