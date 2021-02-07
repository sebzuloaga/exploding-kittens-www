import React from 'react';
import { PlayerHandsMdl } from '../../../data/PlayerHand';
import { CardMdl } from '../../../data/Cards';
import '../../../styles/GameView.css'
import { useGameContext } from '../GameSession';
import GameCard from '../../GameCard/GameCard';
import DeckCard from '../../DeckCard/DeckCard'
import DiscardedCard from '../../DiscardedCard/DiscardedCard';
import CombinationField from '../../CombinationField/CombinationField';

interface Props {
    playerHands: PlayerHandsMdl,
    playingDeck: Array<CardMdl>,
    discardedCards: Array<CardMdl>,
};

function GameView({playerHands, playingDeck, discardedCards}: Props) {
    const { drawTopCard } = useGameContext(); 
    return (
        <div className="GameViewMain">
            <aside className="PlayerHands">
                {Object.keys(playerHands).map(player => {
                    const playerCards = playerHands[player];
                    return (
                    <div className="PlayerHand">
                        <h6>{player}</h6>
                        <div className="HandContainer">
                            {playerCards.map((card, index) =>{
                            return <GameCard card={card} cardOwner={player} cardPosition={index} totalPlayerCards={playerCards.length}/>
                        })}
                        </div>
                    </div>)
                })}
            </aside>
            <div className="PlayingBoard">
                <div className="CardDeck">
                    <div className="Deck" onClick={drawTopCard}>
                        <h6 style={{width: '100%'}}>Deck</h6>
                        <div style={{width: '100%', margin: 'auto'}}>
                            {playingDeck.map((card, index) => {
                                return <DeckCard card={card} cardPosition={index} totalDeckCards={playingDeck.length}/>
                            })}
                        </div>
                    </div>
                    <div className="DiscardPile">
                        <h6 style={{width: '100%'}}>Discard</h6>
                        <div style={{width: '100%', margin: 'auto'}}>
                            {discardedCards.map((card, index) => {
                                return <DiscardedCard card={card} cardPosition={index} />
                            })}
                        </div>
                    </div>
                </div>
                <CombinationField />
            </div>
        </div>
    )
};

export default GameView;