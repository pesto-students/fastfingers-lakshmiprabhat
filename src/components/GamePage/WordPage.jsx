import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import RandomWord from './RandomWord';
import { getRandomWord ,getDataFromLocalStorage} from '../common/Util';
import ProtoTypes from "prop-types";
import './GamePage.scss';

export default function WordPage({ handleStopGame }){
    const [difficultyLevel, setDifficultyLevel] = useState(Number(getDataFromLocalStorage('difficultyLevel')));
    const [randomWord, setRandomWord] = useState('');    
    const [maxTime, setMaxTime] = useState(-1);
    const [inputWord, setInputWord] = useState('');
    const inputWordRef = React.createRef();

    const handleInputWordChange = (e) => {
        setInputWord(e.target.value);
        if (randomWord.toLowerCase() === e.target.value.toLowerCase()) {
            setInputWord('');           
            setDifficultyLevel(difficultyLevel+0.01);
            setTargetWord();            
        }
    }

    const setTargetWord = () => {
        const randomWord = getRandomWord(difficultyLevel);
        const maxTime = Math.ceil(randomWord.length / difficultyLevel) * 1000;
        setRandomWord(randomWord);
        setMaxTime(maxTime > 2000 ? maxTime : 2000);
    }

    useEffect(() => {
        setTargetWord();
        if (inputWordRef.current) {
            inputWordRef.current.focus();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    return(
        <div className="playArea">
            <Timer timerValue={maxTime} key={randomWord} handleStopGame={handleStopGame}/>
            <div className="randomWord">
            <RandomWord randomWord={randomWord} inputWord={inputWord}/>
            </div>
            <div className="inputWordArea">
            <input type="text" className="playerInput" value={inputWord} onChange={handleInputWordChange} ref={inputWordRef}/>
            </div>
        </div>
    )
}

WordPage.protoTypes = {
    handleStopGame : ProtoTypes.func.isRequired
}