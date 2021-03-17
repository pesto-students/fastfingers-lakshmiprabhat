/* eslint-disable react/jsx-filename-extension */
/* eslint-disable linebreak-style */
import React, { useState } from "react";
import "./HomePage.css";
import keyboardLogo from "../../assets/Icon-keyboard.svg";
import playIcon from "../../assets/Icon-play.svg";

export default function HomePage() {
  const [userName, setuserName] = useState("");
  const [difficultyLevel, setdifficultyLevel] = useState("");
  
  const handleSubmit = (event) => {
    event.preventDefault();
    window.history.pushState({}, "", '/game-page');
    const eventRedirect = new PopStateEvent('popstate');
        window.dispatchEvent(eventRedirect);
  };
  return (
    <div className="container">
          <div className="keyboardImage">
            <img className="keyboardLogo" src={keyboardLogo} alt="keyboard" />
          </div>
          <div className="title">
            <p className="titleHeading">fast fingers</p>
            <div className="titleText">
              <span className="lineOne" />
              the ultimate typing game
              <span className="lineTwo" />
            </div>
          </div>
          <form className="formArea" onSubmit={handleSubmit}>
            <input
              type="text"
              value={userName}
              placeholder="TYPE YOUR NAME"
              onChange={(e) => setuserName(e.target.value)}
              required
            />
            <select
              value={difficultyLevel}
              onChange={(e) => setdifficultyLevel(e.target.value)}
              required
            >
              <option value="1" selected>
                EASY
              </option>
              <option value="2">MEDIUM</option>
              <option value="3">HARD</option>
            </select>
            <button
              className="buttonStyle"
              type="submit"
            >
              <img className="playIcon" src={playIcon} alt="keyboard" />
              <p className="buttonText">START GAME</p>
            </button>
          </form>
        </div>
  );
}
