/* eslint-disable react/jsx-filename-extension */
/* eslint-disable linebreak-style */
import React, { useEffect, useState } from "react";
import "./GamePage.scss";
import { getDataFromLocalStorage } from "../common/Util";
import iconCross from "../../assets/Icon-cross.svg";
import data from "../common/data/dictionary.json";
import Header from "../common/Header/Header";
import Timer from "./Timer";
import ScoreBoard from "./ScoreBoard";
import { formatTimeLeft } from "../common/Util";
import iconReload from "../../assets/Icon-reload.svg";
import SetColorsOnRandomWord from "./SetColorsOnRandomWord";

export default function GamePage() {
  const difficultyLevel = Number(getDataFromLocalStorage("difficultyLevel"));
  const [randomWord, setRandomWord] = useState("");
  const [playerInput, setPlayerInput] = useState("");
  const [timerValue, setTimerValue] = useState(0);
  const [currentDifficultyLevel, setCurrentDifficultyLevel] = useState(
    difficultyLevel
  );
  const [score, setScore] = useState(0);
  const [gameResults, setGameResults] = useState([]);
  const [showTimer, setShowTimer] = useState(true);
  const [gameId, setGameId] = useState(1);
  const playerInputRef = React.createRef();

  const getRandomWord = () => {
    let filteredWords = [];
    if (currentDifficultyLevel < 1.5) {
      filteredWords = data.filter((word) => word.length <= 4);
    } else if (currentDifficultyLevel >= 1.5 && currentDifficultyLevel < 2) {
      filteredWords = data.filter(
        (word) => word.length >= 5 && word.length <= 8
      );
    } else {
      filteredWords = data.filter((word) => word.length > 8);
    }
    const randomIndex = Math.floor(Math.random() * filteredWords.length);
    const newrandomWord = filteredWords[randomIndex];
    setRandomWord(newrandomWord);
    setPlayerInput("");
    let newTimerValue =
      Math.floor(newrandomWord.length / currentDifficultyLevel) * 1000;
    if (newTimerValue > 2000) setTimerValue(newTimerValue);
    else setTimerValue(2000);
  };

  const handleTextChange = (event) => {
    setPlayerInput(event.target.value);
    if (randomWord.toLowerCase() === event.target.value.toLowerCase()) {
      getRandomWord();
      setCurrentDifficultyLevel(currentDifficultyLevel + 0.01);
    }
  };

  const handleScoreChange = (currentScore) => setScore(currentScore);

  const handleStopGame = () => {
    if (gameResults.length > 8) {
      gameResults.shift();
    }
    setGameResults([...gameResults, { gameId, score: score * 1000 }]);
    setGameId(gameId + 1);
    setShowTimer(false);
  };
  const handleQuit = () => {
    localStorage.clear();
    window.history.pushState({}, "", "/");
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  };
  const handlePlayAgain = () => {
    setShowTimer(true);
    getRandomWord();
    if (playerInputRef.current) {
      playerInputRef.current.focus();
    }
  };
  useEffect(() => {
    getRandomWord();
    if (playerInputRef.current) {
      playerInputRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);  

  return (
    <div className="gameContainer">
      <Header handleScoreChange={handleScoreChange} showTimer={showTimer} />
      {showTimer ? (
        <div className="gameContent">
          <ScoreBoard gameResults={gameResults} />
          <div className="playArea">
            <Timer
              timerValue={timerValue}
              handleStopGame={handleStopGame}
            ></Timer>            
            <div className="randomWord">
            <SetColorsOnRandomWord randomWord={randomWord} playerInput={playerInput} />             
            </div>
            <div className="inputWordArea">
              <input
                type="text"
                value={playerInput}
                onChange={handleTextChange}
                ref={playerInputRef}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="contentCenter">
          <p className="score">SCORE : GAME {gameId - 1}</p>
          <p className="time">{formatTimeLeft(score * 1000, "mm:ss")}</p>
          <p className="highScore">New High Score : </p>
          <button className="buttonArea" onClick={handlePlayAgain}>
            <img className="reloadIcon" src={iconReload} alt="playagain" />
            <span className="playAgain">PLAY AGAIN</span>
          </button>
        </div>
      )}

      {showTimer ? (
        <div className="gameStop">
          <img src={iconCross} alt="stopgame" />
          <button type="submit" className="stopButton" onClick={handleStopGame}>
            STOP GAME
          </button>
        </div>
      ) : (
        <div>
          <button className="quit" onClick={handleQuit}>
            QUIT
          </button>
        </div>
      )}
    </div>
  );
}
