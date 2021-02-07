import React, { useEffect, useState, useContext } from 'react';
import { shuffle } from 'lodash';
import '../../styles/GameSession.css';
import { 
  generateFullDeck,
  getCardsToDeal,
  dealCards,
  allocateDefuseCards,
} from '../../utils/gameSetUp';
import { PlayerHandsMdl } from '../../data/PlayerHand';
import { CardMdl } from '../../data/Cards';
import { getFutureCards, setCatomicBomb } from '../../utils/cardActions';
import GameView from './GameView/GameView';

interface Props {
    sessionPlayers: Array<string>,
    sessionDecks: Array<string>,
};

interface GameManagerContextProps {
  currentPlayer: string,
  drawTopCard: () => void,
  removeFromHand: (player: string, cardPosition: number) => void,
  removeCombinedCard: (cardPosition: number) => void,
  discardPile: Array<CardMdl>,
  playerHands: PlayerHandsMdl,
  combinedCards: Array<number>,
  randomSteal: (stealBy: string, stealFrom: string, cardPosition: number, usedCardId: string) => void,
  directedSteal: (stealBy: string, stealFrom: string, cardId: string, usedCardId: string) => void,
  recoverDiscardedCard: (cardId: string) => void,
  cardActions: {
    [cardId: string]: (cardPosition?: number) => void,
  },
};

const GameManagerContext = React.createContext<Partial<GameManagerContextProps>>({});

export const useGameContext = () => { 
  return useContext(GameManagerContext);
};

function GameSession({sessionPlayers, sessionDecks}: Props) {
  const [turnIndex, setTurnIndex] = useState<number>(0);
  const [turnIncrement, setTurnIncrement] = useState<number>(0);
  const [remainingTurns, setRemainingTurns] = useState(0);
  const [playerHands, setPlayerHands] = useState<PlayerHandsMdl>({});
  const [playingDeck, setPlayingDeck] = useState<CardMdl[]>([]);
  const [discardPile, setDiscardPile] = useState<CardMdl[]>([]);
  const [combinedCards, setCombinedCards] = useState<number[]>([]);
  const [isAttackMode, setIsAttackMode] = useState<boolean>(false);
  const [activePlayers, setActivePlayers] = useState<string[]>([...sessionPlayers]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameWinner, setGameWinner] = useState<string>('');

  useEffect(() => {
    const initGame = () => {
      const fullDeck = generateFullDeck(sessionDecks);
      const [deckToDeal, deckToNotDeal] = getCardsToDeal(fullDeck)
      const shuffledDeckToDeal = shuffle(deckToDeal);
      const [dealtHands, remainingDeck] = dealCards(sessionPlayers, shuffledDeckToDeal);
      const [finalHands, finalUndealtCards] = allocateDefuseCards(dealtHands, deckToNotDeal);
      const finalDeck = shuffle(remainingDeck.concat(finalUndealtCards));
      setPlayerHands(finalHands);
      setRemainingTurns(1);
      setTurnIncrement(1);
      setPlayingDeck(finalDeck);
    }

    initGame();
  }, [sessionDecks, sessionPlayers]);

  const nextPlayer = (initialTurnAmount: number) => {
    const newTurnIndex = turnIndex + turnIncrement;
    console.log(newTurnIndex);
    if (newTurnIndex === activePlayers.length) {
      setTurnIndex(0);
    } else if (newTurnIndex < 0) {
      setTurnIndex(activePlayers.length - 1);
    } else {
      setTurnIndex(turnIndex + turnIncrement);
    }
    setCombinedCards([]);
    setRemainingTurns(initialTurnAmount);
  };

  const reduceTurns = (reduction: number) => {
    setRemainingTurns(remainingTurns - reduction);
    console.log(`Turns remaining: ${remainingTurns - reduction}`);
  };

  const skipTurn = () => {
      reduceTurns(1);
      setIsAttackMode(false);
  };

  const reverseTurn = () => {
    if (turnIncrement === 1) {
      reduceTurns(1);
      setTurnIncrement(-1);
    } else {
      reduceTurns(1);
      setTurnIncrement(1);
    }
    setIsAttackMode(false);
  };

  const attack = () => {
    if ( isAttackMode ) {
      const newTurnAmount = remainingTurns + 2;
      nextPlayer(newTurnAmount);
    } else {
      reduceTurns(1);
      // checkAttackMode();
      setIsAttackMode(false);
    }
  };

  const seeFutureCards = () => {
    const futureCards = getFutureCards(playingDeck);
    console.log(futureCards);
  };

  const catomicBomb = () => {
    const updatedDeck = setCatomicBomb(playingDeck);
    setPlayingDeck(updatedDeck);
    reduceTurns(1);
  };

  const shuffleDeck = () => {
    const shuffledDeck = shuffle(playingDeck);
    setPlayingDeck(shuffledDeck);
  };

  const drawCard = (cardPosition: number) => {
    const nextCard = playingDeck[cardPosition];

    if (nextCard.id === 'exploding_kitten') {
      const defuseIndex = playerHands[currentPlayer].findIndex(card => card.id === 'defuse');
    
      if (defuseIndex >= 0) {
        const updatedPlayerHand = [...playerHands[currentPlayer]];
        updatedPlayerHand.splice(defuseIndex, 1);

        const updatedDeck = [...playingDeck];
        updatedDeck.shift()
        updatedDeck.splice(5, 0, nextCard);

        const updatedPlayerHands = {
          ...playerHands,
          [currentPlayer]: updatedPlayerHand,
        };

        setPlayerHands(updatedPlayerHands);
        setPlayingDeck(updatedDeck);
        reduceTurns(1);
      } else {
        const updatedDeck = playingDeck.filter((card, index) => index !== cardPosition);
        const updatedActivePlayers = activePlayers.filter(player => player !== currentPlayer);
        const updatedDiscardPile = discardPile.concat(playerHands[currentPlayer]).concat(nextCard);
        const updatedTurnIndex = turnIncrement === 1 ? (turnIndex === activePlayers.length ? 0 : turnIndex) : ( turnIndex === 0 ? turnIndex - 1 : activePlayers.length -1);
        console.log(updatedActivePlayers, updatedTurnIndex)
        const updatedPlayerHands = {
          ...playerHands,
          [currentPlayer]: [],
        };
        setPlayingDeck(updatedDeck);
        setTurnIndex(updatedTurnIndex);
        setActivePlayers(updatedActivePlayers);
        setDiscardPile(updatedDiscardPile);
        setPlayerHands(updatedPlayerHands);
      }
    } else {
      console.log('this is running', nextCard);
      const updatedDeck = playingDeck.filter((card, index) => index !== cardPosition);
      const currentPlayer = activePlayers[turnIndex];
      const updatedPlayerHand = playerHands[currentPlayer].concat(nextCard);
      const updatedPlayerHands = {
        ...playerHands,
        [currentPlayer]: updatedPlayerHand,
      };
      console.log(currentPlayer, updatedPlayerHand);
      setPlayingDeck(updatedDeck);
      setPlayerHands(updatedPlayerHands);
      reduceTurns(1);
    }
  };

  const drawBottomCard = () => {
    drawCard(playingDeck.length - 1);
  };

  const drawTopCard = () => {
    drawCard(0);
  };

  const swapTopAndBottomCards = () => {
    const firstCard = playingDeck[0];
    const lastCard = playingDeck[playingDeck.length -1];
    const updatedDeck = [...playingDeck];
    updatedDeck.pop();
    updatedDeck.shift();
    updatedDeck.push(firstCard);
    updatedDeck.unshift(lastCard);
    setPlayingDeck(updatedDeck);
  };

  const removeFromHand = (player: string, cardPosition: number) => {
    const removedCard = playerHands[player][cardPosition];
    const updatedHand = playerHands[player];
    updatedHand.splice(cardPosition, 1);
    const updatedHands = {
      ...playerHands,
      [player]: updatedHand,
    };

    const updatedDiscardPile = discardPile.concat([removedCard]);

    setPlayerHands(updatedHands);
    setDiscardPile(updatedDiscardPile);
  };

  const canAddToCombine = (newCardPosition: number) => {
      return !combinedCards.includes(newCardPosition);
  };

  const checkCombine = (cardPosition: number = -1) => {
    const newCard = cardPosition >= 0 ? [cardPosition] : [];
    console.log(cardPosition);

    if (cardPosition >= 0 && canAddToCombine(cardPosition)){
      const updatedCombinedCards = combinedCards.concat(newCard);
      console.log(updatedCombinedCards);
      setCombinedCards(updatedCombinedCards);
    }
  };

  const removeCombinedCard = (cardPosition: number) => {
    const updatedCombinedCards = combinedCards.filter((card, index) => {
      return cardPosition !== index;
    });
    setCombinedCards(updatedCombinedCards);
  };

  const randomSteal = (stealBy: string, stealFrom: string, cardPosition: number, usedCardId: string) => {
    const stolenCard = playerHands[stealFrom][cardPosition];
    const usedCardIds = [usedCardId, usedCardId];
    const updateStealByHand = playerHands[stealBy].concat([stolenCard]);

    usedCardIds.forEach(usedCardId => {
      const nextIndex = updateStealByHand.findIndex(card => card.id === usedCardId);
      updateStealByHand.splice(nextIndex, 1);
    });

    const updateStealFromHand = playerHands[stealFrom];
    updateStealFromHand.splice(cardPosition, 1);

    const updatedHands = {
      ...playerHands,
      [stealBy]: updateStealByHand,
      [stealFrom]: updateStealFromHand,
    };

    setPlayerHands(updatedHands);
    setCombinedCards([]);
  };

  const directedSteal = (stealBy: string, stealFrom: string, stoleanCardId: string, usedCardId: string) => {
    const stolenIndex = playerHands[stealFrom].findIndex(card => {
      return card.id === stoleanCardId;
    })

    if (stolenIndex >= 0) {
      const stolenCard = playerHands[stealFrom][stolenIndex];
      const updateStealByHand = playerHands[stealBy].concat([stolenCard]);
      const usedCardIds = [usedCardId, usedCardId, usedCardId];
      
      usedCardIds.forEach(usedCardId => {
        const nextIndex = updateStealByHand.findIndex(card => card.id === usedCardId);
        updateStealByHand.splice(nextIndex, 1);
      });

      const updateStealFromHand = playerHands[stealFrom];
      updateStealFromHand.splice(stolenIndex, 1);

      const updatedHands = {
        ...playerHands,
        [stealBy]: updateStealByHand,
        [stealFrom]: updateStealFromHand,
      };

    setPlayerHands(updatedHands);
    setCombinedCards([]);
    }
    console.log("Sorry the player did not have that card");
  };

  const recoverDiscardedCard = (cardId: string) => {
    const recoveredCardIndex = discardPile.findIndex(card => {
      return card.id === cardId;
    });
    
    if (recoveredCardIndex >= 0) {
      const recoveredCard = discardPile[recoveredCardIndex];
      const player = activePlayers[turnIndex];
      const updatedPlayerHand = playerHands[player].concat([recoveredCard]);
      const updatedDiscardPile = discardPile.concat([]);
      updatedDiscardPile.splice(recoveredCardIndex, 1);

      const updatedHands = {
        ...playerHands,
        [player]: updatedPlayerHand,
      };

      setPlayerHands(updatedHands);
      setDiscardPile(updatedDiscardPile);
    }
  };

  useEffect(() => {
    if (remainingTurns === 0) {
      nextPlayer(1);
    }
  }, [remainingTurns]);

  useEffect(() => {
    if (activePlayers.length === 1) {
      console.log(`We have a winner: ${activePlayers[0]}`)
    }
    setGameOver(true);
  }, [activePlayers]);

  const currentPlayer = activePlayers[turnIndex];
  const cardActions = {
    exploding_kitten: () => {},
    defuse: () => {},
    shuffle: shuffleDeck,
    skip: skipTurn,
    attack: () => {},
    favor: () => {},
    nope: () => {},
    see_future_3: seeFutureCards,
    momma_cat: checkCombine,
    zombie_cat: checkCombine,
    bikini_cat: checkCombine,
    schrodinger_cat: checkCombine,
    shy_bladder_cat: checkCombine,
    reverse: reverseTurn,
    bottom_draw: drawBottomCard,
    swap_top_bottom: swapTopAndBottomCards,
    catomic_bomb: catomicBomb,
  };

  return (
    <GameManagerContext.Provider 
      value={{
          currentPlayer, 
          drawTopCard, 
          cardActions, 
          removeFromHand, 
          removeCombinedCard,
          playerHands,
          discardPile,
          combinedCards,
          randomSteal,
          directedSteal,
          recoverDiscardedCard
      }}
    >
      <div className="GameView">
        <header className="GameViewHeader">
          <h6>Turn {activePlayers[turnIndex]}</h6>
          <h6>Remaining Turns: {remainingTurns}</h6>
        </header>
        <GameView playerHands={playerHands} playingDeck={playingDeck} discardedCards={discardPile} />
        <footer className="GameViewFooter">
          <button onClick={attack}>Attack</button>
          <button onClick={skipTurn}>Skip</button>
          <button onClick={reverseTurn}>Reverse</button>
          <button onClick={seeFutureCards}>See The Future</button>
          <button onClick={catomicBomb}>Catomic Bomb</button>
          <button onClick={drawTopCard}>Draw Card</button>
          <button onClick={shuffleDeck}>Shuffle Deck</button>
          <button onClick={drawBottomCard}>Draw From the Bottom</button>
          <button onClick={swapTopAndBottomCards}>Swap Top and Bottom</button>
        </footer>
      </div>
    </GameManagerContext.Provider>
  );
}

export default GameSession;