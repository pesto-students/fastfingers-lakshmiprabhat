/* eslint-disable react/jsx-filename-extension */
/* eslint-disable linebreak-style */
import React, { useEffect, useState } from "react";
import "./GamePage.scss";
import { saveDataToLocalStorage, getDataFromLocalStorage } from "../common/Util";
import iconCross from "../../assets/Icon-cross.svg";
import data from "../common/data/dictionary.json";
import Header from "../common/Header/Header";
import Timer from "./Timer";
import ScoreBoard from "./ScoreBoard";

export default function GamePage() {
  const difficultyLevel = Number(getDataFromLocalStorage("difficultyLevel"));
  const [randomWord, setRandomWord] = useState("");
  const [playerInput, setPlayerInput] = useState("");
  const [timerValue, setTimerValue] = useState(-1);
  const [currentDifficultyLevel, setCurrentDifficultyLevel] = useState(
    difficultyLevel
  );  
  const [score,setScore] = useState(0);
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
    let newTimerValue = Math.floor(newrandomWord.length / currentDifficultyLevel);
    if (newTimerValue > 2)
    setTimerValue(newTimerValue);
    else setTimerValue(2);
  };

  const handleTextChange = (event) => {
    setPlayerInput(event.target.value);
    if (randomWord === event.target.value) {
      getRandomWord();
      setCurrentDifficultyLevel(currentDifficultyLevel + 0.01);
      setPlayerInput("");
    }
  };

  const handleScoreChange= currentScore => setScore(currentScore);

  const handleStopGame = () => {
    let scoreResults= getDataFromLocalStorage("scoresList");
    let currentGame = getDataFromLocalStorage("currentGame");
    scoreResults.push({currentGame,score});
    saveDataToLocalStorage("currentGame",Number(currentGame)+1);
    saveDataToLocalStorage("scoresList",scoreResults);
    saveDataToLocalStorage('score',score);   
    window.history.pushState({}, "", "/stopgame-page");
    const redirectEvent = new PopStateEvent("popstate");
    window.dispatchEvent(redirectEvent);
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
      <Header handleScoreChange = {handleScoreChange} showScore={true} />
      <div className="gameContent">
        <ScoreBoard />
        <div className="playArea">
          <Timer timerValue={timerValue} handleStopGame={handleStopGame}></Timer>
          <div className="randomWord">
            <p>{randomWord}</p>
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
      <div className="gameStop">
        <img src={iconCross} alt="stopgame" />
        <button type="submit" className="stopButton" onClick={handleStopGame}>
          STOP GAME
        </button>
      </div>
    </div>
  );
}
