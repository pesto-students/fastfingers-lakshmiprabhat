/* eslint-disable react/jsx-filename-extension */
/* eslint-disable linebreak-style */
import React, {   useEffect, useState } from "react";
import "./GamePage.scss";
import { getDataFromLocalStorage } from "../common/Util";
import {formatTimeLeft} from "../common/Util";
import iconCross from "../../assets/Icon-cross.svg";
import data from "../common/data/dictionary.json";
import Header from "../common/Header/Header";

export default function GamePage() {
  const difficultyLevel = getDataFromLocalStorage("difficultyLevel");
  const [randomWord, setRandomWord] = useState("");
  const [playerInput, setPlayerInput] = useState("");
  const [timerValue,setTimerValue] = useState(0);
  const [currentDifficultyLevel, setCurrentDifficultyLevel] = useState(
    difficultyLevel
  );

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
    setTimerValue(Math.floor((newrandomWord.length)/currentDifficultyLevel));
  };

  const handleTextChange = (event) => {
    setPlayerInput(event.target.value);
    if (randomWord === event.target.value) {
      getRandomWord();
      setCurrentDifficultyLevel(currentDifficultyLevel + 0.1);
      setPlayerInput('');
    };
  };
  const handleStopGame = ()=>{
    window.history.pushState({}, "", '/stopgame-page');
    const redirectEvent = new PopStateEvent('popstate');
    window.dispatchEvent(redirectEvent);
  };
  useEffect(()=>{
    getRandomWord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }
  ,[]);
  return (
    <div className="gameContainer">
      <Header showScore = {true}/>
      <div className="gameContent">
        <div className="scoreBoard">SCORE BOARD</div>
        <div className="playArea">
          <div className="baseTimer">
            <svg className="baseTimerSvg" viewBox="0 0 100 100">
              <g className="baseTimerCircle">
                <circle
                  className="baseTimerPathElapsed"
                  cx="50"
                  cy="50"
                  r="45"
                />
              </g>
            </svg>
            <span>
              {formatTimeLeft(timerValue)}
            </span>
          </div>
          <div className="randomWord">
            <p>{randomWord}</p>
          </div>
          <div className="inputWordArea">
            <input
              type="text"
              value={playerInput}
              onChange={handleTextChange}
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
