import React from "react";
import iconPerson from "../../../assets/Icon-person.svg";
import iconGamepad from "../../../assets/Icon-gamepad.svg";
import { getDataFromLocalStorage } from "../Util";
import "./Header.scss";

export default function Header({ showScore }) {
  const userName = getDataFromLocalStorage("username");
  let level = "";
  const difficultyLevel = getDataFromLocalStorage("difficultyLevel");
  if (difficultyLevel < 1.5) {
    level = "EASY";
  } else if (difficultyLevel >= 1.5 && difficultyLevel < 2) {
    level = "MEDIUM";
  } else if (difficultyLevel >= 2) level = "HARD";
  return (
    <div className="gameHeader">
      <div className="playerDetails">
        <img className="iconPerson" src={iconPerson} alt="person" />
        <p className="headerTitle">{userName.toUpperCase()}</p>
        <p className="headerTitleRight">fast fingers</p>
      </div>
      <div className="gameDetails">
        <img src={iconGamepad} alt="gamepad" />
        <p className="gameLevel">LEVEL : {level}</p>
        {showScore ? <p className="headerTitleRight">SCORE: </p> : ""}
      </div>
    </div>
  );
}
