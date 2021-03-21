import React,{useState,useEffect} from 'react';
import "./Timer.scss";
import ProtoTypes from "prop-types";
import {formatTimeLeft} from "../common/Util";
let timePassed = 0;
let timeOut = null;

export default function Timer({timerValue,handleStopGame}){
    const [timeLeft,setTimeLeft] = useState(timerValue);
    const [timerStroke, setTimerStroke] = useState("283 283");
    useEffect(() => {
        timePassed = 0;
        setTimeLeft(timerValue);
    }, [timerValue])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        timeOut = setInterval(() => {
            const strokeWidth = (timeLeft/timerValue) * 283;
            if (timeLeft > 0) {                
                timePassed = timePassed += 1;
                setTimeLeft(timerValue - timePassed);                
                setTimerStroke(`${strokeWidth} 283`);
            }
            else if(timeLeft === 0) {
                handleStopGame();
                clearInterval(timeOut);
            }
        }, 1000);

        return () => {
            clearInterval(timeOut);
        }
    }, [timeLeft])// eslint-disable-line react-hooks/exhaustive-deps

  return(
    <div className="baseTimer">
    <svg className="baseTimerSvg" viewBox="0 0 100 100">
    <g className="baseTimerCircle">
        <circle
        className="baseTimerPathElapsed strokeColor"
        cx="50"
        cy="50"
        r="45"
        />
        <path
        stroke-dasharray={timerStroke}
        className="baseTimerPathRemaining"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
    </svg>
    <span className="baseTimerLabel">{formatTimeLeft(timeLeft)}</span>
    </div>);
}

Timer.ProtoTypes = {
   timerValue: ProtoTypes.number.isRequired,
   handleStopGame: ProtoTypes.func.isRequired
};