import React from 'react';
import { CardMdl } from '../../data/Cards';
import '../../styles/GameCard.css'
import { CARD_COLORS } from '../../styles/config/colors';
import '../../styles/GameCard.css'

interface Props {
    card: CardMdl,
    totalDeckCards: number,
    cardPosition: number,
};

function DeckCard({card, totalDeckCards, cardPosition}: Props) {
    return (
        <div className="GameCardWrapper" style={{zIndex: totalDeckCards - cardPosition}}>
            <div className="GameCardContainerBack">
                <div className="GameCardBack"></div>
            </div>
            <div className="GameCardContainerFront">
                <div style={{border: `3px solid ${CARD_COLORS[card.id]}`}} className="GameCardContent">
                    <h4>{card.name}</h4>
                </div>
            </div>
        </div>
   
    )
};

export default DeckCard;