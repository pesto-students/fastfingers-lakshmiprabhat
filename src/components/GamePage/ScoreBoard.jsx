import React from 'react';
import {formatTimeLeft, getDataFromLocalStorage} from "../common/Util";
import "./GamePage.scss";

export default function ScoreBoard(){
    let scoresList = getDataFromLocalStorage("scoresList");    
    const highScore = Math.max(...scoresList.map(({ score }) => { return score }));

    const content = scoresList.map(({ currentGame, score }) => {
        return (
            <div key={currentGame}>
                {
                    score === highScore ?
                        <p className="personalBest">PERSONAL BEST</p>
                        : ''
                }
                <p className="scoreList">Game {currentGame}  : {formatTimeLeft(score*1000)}</p>
            </div>
        );
    });
    
    return(
        <div className="scoreBoard">
            <p className="scoreBoardTitle">SCORE BOARD</p>
            {content}     
        </div>
    );

}