import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import './App.css';
import GameSession from './components/GameSession/GameSession';

function App() {

  const [players, setPlayers] = useState<string[]>([]);
  const [selectedDecks, setSelectedDecks] = useState<string[]>([]);
  const [optionsFinalised, setOptionsFinalised] = useState<boolean>(false);

  const socket = io("http://localhost:3000");
  socket.emit("log_message", "working");

  useEffect(() => {
    setPlayers(['Anika', 'Seb', 'Jasmine']);
    setSelectedDecks(['original', 'imploding', 'streaking']);
  }, []);

  useEffect(() => {
    if (players.length > 0 && selectedDecks.length > 0) {
      setOptionsFinalised(true);
    }
  }, [selectedDecks, players]);

  return (
    <div className="App">
      {optionsFinalised && <GameSession sessionPlayers={players} sessionDecks={selectedDecks} />}
    </div>
  );
}

export default App;
