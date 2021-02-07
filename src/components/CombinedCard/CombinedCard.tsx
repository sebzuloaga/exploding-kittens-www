import React from 'react';
import { CardMdl } from '../../data/Cards';
import '../../styles/GameCard.css'
import { CARD_COLORS } from '../../styles/config/colors';
import { useGameContext } from '../GameSession/GameSession';

interface Props {
    card: CardMdl,
    cardPosition: number,
};

function CombinedCard({card, cardPosition}: Props) {
    const { removeCombinedCard } = useGameContext();

    const removeFromCombinedField = () => {
        if (removeCombinedCard) {
            removeCombinedCard(cardPosition);
        }
    };

    return (
        <div onClick={removeFromCombinedField}>
            <div>
            <div></div>
            </div>
            <div>
                <div style={{border: `3px solid ${CARD_COLORS[card.id]}`}} className="GameCardContent">
                    <h4>{card.name}</h4>
                </div>
            </div>
        </div>
   
    )
};

export default CombinedCard;