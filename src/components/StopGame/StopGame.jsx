import React from "react";
import Header from "../common/Header/Header";
import "./StopGame.scss";
import iconReload from "../../assets/Icon-reload.svg";

export default function StopGame() {
  const handlePlayAgain = () => {
    window.history.pushState({}, "", "/game-page");
    const redirectEvent = new PopStateEvent("popstate");
    window.dispatchEvent(redirectEvent);
  };
  const handleQuit = () => {
    window.history.pushState({}, "", "/");
    const redirectEvent = new PopStateEvent("popstate");
    window.dispatchEvent(redirectEvent);
  };
  return (
    <div className="gameContainer">
      <Header showScore={false} />
      <div className="contentCenter">
        <p className="score">SCORE: </p>
        <p className="time">TIME: </p>
        <p className="highScore">New High Score</p>
        <div>
          <button className="buttonStyle" onClick={handlePlayAgain}>
            <img className="reloadIcon" src={iconReload} alt="playagain" />
            <span className="playAgain">PLAY AGAIN</span>
          </button>
        </div>
      </div>
      <div>
        <button className="quit" onClick={handleQuit}>
          QUIT
        </button>
      </div>
    </div>
  );
}
