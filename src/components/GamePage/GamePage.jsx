/* eslint-disable react/jsx-filename-extension */
/* eslint-disable linebreak-style */
import React from 'react';
import "./GamePage.scss";
import {getDataFromLocalStorage} from "../common/Util.jsx";
import iconPerson from "../../assets/Icon-person.svg";
import iconGamepad from "../../assets/Icon-gamepad.svg";
import iconCross from "../../assets/Icon-cross.svg";
import iconTimer from "../../assets/Icon-timer.svg";
import GetRandomWord from "./GetRandomWord";

export default function GamePage() {
  const userName = getDataFromLocalStorage('username');
  const difficultyLevel= getDataFromLocalStorage('difficultyLevel');

   return (
    <div className="gameContainer">
       <div className="gameHeader">
         <div className="playerDetails">
           <img src={iconPerson} alt="person" />
           <p className="headerTitle">{userName.toUpperCase()}</p>
           <p className="headerTitleRight">fast fingers</p>
         </div>
          <div className="gameDetails">
          <img src={iconGamepad} alt="gamepad" />
          <p className="gameLevel">LEVEL : {difficultyLevel}</p>
          </div>
          </div>
       <div className="gameContent">
         <div className="scoreBoard">SCORE BOARD</div>
         <div className="typingSection">
         <img className="timer" src={iconTimer} alt="timer" />
         </div>
       </div>
       <div className="gameStop">
       <img src={iconCross} alt="stopgame" />
       <button
              type="submit" className="stopButton"
            >STOP GAME
            </button>  </div>
    </div>
  );
}
