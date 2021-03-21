import React, {useState,useEffect} from "react";
import ProtoTypes from "prop-types";
import iconPerson from "../../../assets/Icon-person.svg";
import iconGamepad from "../../../assets/Icon-gamepad.svg";
import { getDataFromLocalStorage,formatTimeLeft } from "../Util";
import "./Header.scss";

export default function Header({ handleScoreChange,showScore }) {
  const userName = getDataFromLocalStorage("username");
  let level = "";
  const difficultyLevel = getDataFromLocalStorage("difficultyLevel");
  const [score,setScore]= useState(0);

  if (difficultyLevel < 1.5) {
    level = "EASY";
  } else if (difficultyLevel >= 1.5 && difficultyLevel < 2) {
    level = "MEDIUM";
  } else if (difficultyLevel >= 2) level = "HARD";

  useEffect(() => {
    if (showScore) {
        const timeout = setInterval(() => {
          setScore(score + 1);
            handleScoreChange(score + 1);
        }, 1000);
        return () => {
            clearInterval(timeout);
        }
    }
    else {
      setScore(0);
    }
}, [score, showScore])// eslint-disable-line react-hooks/exhaustive-deps

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
        {showScore ? <p className="headerTitleRight">SCORE: {formatTimeLeft(score*1000)} </p> :''
        }
      </div>
    </div>
  );
}

Header.ProtoTypes = {
  handleScoreChange: ProtoTypes.func.isRequired,
  showScore: ProtoTypes.bool.isRequired
};