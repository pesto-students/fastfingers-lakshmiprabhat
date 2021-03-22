import React, { useEffect, useState } from "react";
import ProtoTypes from "prop-types";
import "./GamePage.scss";
import Timer from "./Timer";
import data from "../common/data/dictionary.json";
import SetColorsOnRandomWord from "./SetColorsOnRandomWord";
import {getDataFromLocalStorage} from "../common/Util";

export default function WordPage({ handleStopGame }) {
const [randomWord, setRandomWord] = useState('');
const [playerInput, setPlayerInput] = useState('');
const difficultyLevel = Number(getDataFromLocalStorage("difficultyLevel"));
const [currentDifficultyLevel, setCurrentDifficultyLevel] = useState(
    difficultyLevel
    );
const [timerValue, setTimerValue] = useState(-1);
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

useEffect(() => {
    getRandomWord();
    if (playerInputRef.current){
        playerInputRef.current.focus();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

return (
    <div className="playArea">
    <Timer
            timerValue={timerValue}
            handleStopGame={handleStopGame}
        ></Timer>            
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
);
}

WordPage.protoTypes = {
    handleStopGame: ProtoTypes.func.isRequired
}