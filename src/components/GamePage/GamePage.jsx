/* eslint-disable react/jsx-filename-extension */
/* eslint-disable linebreak-style */
import React, { useState } from "react";
import "./GamePage.scss";
import iconCross from "../../assets/Icon-cross.svg";
import Header from "../common/Header/Header";
import ScoreBoard from "./ScoreBoard";
import { formatTimeLeft } from "../common/Util";
import iconReload from "../../assets/Icon-reload.svg";
import WordPage from "./WordPage";

export default function GamePage() {
  const [score, setScore] = useState(0);
  const [scores, setScores] = useState([]);
  const [showTimer, setShowTimer] = useState(true);
  const [gameId, setGameId] = useState(1);
  const handleScoreChange = (currentScore) => setScore(currentScore);

  const handleStopGame = () => {
    if (scores.length > 8) {
      scores.shift();
    }
    setScores([...scores, { gameId, score: score * 1000 }]);
    setGameId(gameId + 1);
    setShowTimer(false);
  };
  const handleQuit = () => {
    window.history.pushState({}, "", "/");
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  };
  const handlePlayAgain = () => {
    setShowTimer(true);
  };
  const getHighScore = ()=> {
    return (scores.reduce((acc, val) => acc = acc > val.score ? acc : val.score, 0))/1000;
  }
  return (
    <div className="gameContainer">
      <Header handleScoreChange={handleScoreChange} showTimer={showTimer} />
      {showTimer ? (
        <div className="gameContent">
          <ScoreBoard scores={scores} />
            <WordPage handleStopGame={handleStopGame}/>
        </div>
      ) : (
        <div className="contentCenter">
          <p className="score">SCORE : GAME {gameId - 1}</p>
          <p className="time">{formatTimeLeft(score * 1000, "mm:ss")}</p>
         { 
          score === getHighScore() ?
         <p className="highScore">New High Score : {formatTimeLeft(score * 1000, "mm:ss")}</p>: ''}
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
