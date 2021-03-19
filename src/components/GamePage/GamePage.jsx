/* eslint-disable react/jsx-filename-extension */
/* eslint-disable linebreak-style */
import React, { useState } from "react";
import "./GamePage.scss";
import { getDataFromLocalStorage } from "../common/Util";
import iconPerson from "../../assets/Icon-person.svg";
import iconGamepad from "../../assets/Icon-gamepad.svg";
import iconCross from "../../assets/Icon-cross.svg";
import data from "../common/dictionary.json";

export default function GamePage() {
  const userName = getDataFromLocalStorage("username");
  let level = "";
  const difficultyLevel = getDataFromLocalStorage("difficultyLevel");
  const [randomWord, setRandomWord] = useState("alis");
  const [playerInput, setPlayerInput] = useState("");
  const [currentDifficultyLevel, setCurrentDifficultyLevel] = useState(
    difficultyLevel
  );
  if (currentDifficultyLevel < 1.5) {
    level = "EASY";
  } else if (currentDifficultyLevel >= 1.5 && currentDifficultyLevel < 2) {
    level = "MEDIUM";
  } else if (currentDifficultyLevel >= 2) level = "HARD";
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
  };

  const handleTextChange = (event) => {
    setPlayerInput(event.target.value);
    if (randomWord === event.target.value) {
      getRandomWord();
      setCurrentDifficultyLevel(currentDifficultyLevel + 0.1);
    }
  };
  return (
    <div className="gameContainer">
      <div className="gameHeader">
        <div className="playerDetails">
          <img className="iconPerson" src={iconPerson} alt="person" />
          <p className="headerTitle">{userName.toUpperCase()}</p>
          <p className="headerTitleRight">fast fingers</p>
        </div>
        <div className="gameDetails">
          <img src={iconGamepad} alt="gamepad" />
          <p className="gameLevel">LEVEL : {level}</p>
          <p className="headerTitleRight">SCORE: </p>
        </div>
      </div>
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
        <button type="submit" className="stopButton">
          STOP GAME
        </button>
      </div>
    </div>
  );
}
