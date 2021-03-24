import React, { useState, useEffect } from "react";
import ProtoTypes from "prop-types";
import "./Timer.scss";
import { formatTimeLeft, calculateTimeFraction } from "../common/Util";
const FULL_DASH_ARRAY = 283;
let timePassed = 0;
let timeout = '';

export default function Timer({timerValue, handleStopGame}) {
    const [timeLeft, setTimeLeft] = useState(timerValue);
    const [stroke, setStroke] = useState("283 283");

    useEffect(() => {
        timePassed = 0;
        setTimeLeft(timerValue);
    }, [timerValue]);

    useEffect(() => {
        timeout = setInterval(() => {
            if (timeLeft > 0) {
                timePassed += 100;
                setTimeLeft(timerValue - timePassed);
                const strokeValue = calculateTimeFraction(timeLeft, timerValue);
                setStroke(`${strokeValue} ${FULL_DASH_ARRAY}`);
            }
            else if(timeLeft === 0) {
                handleStopGame();
                clearInterval(timeout);
            }
        }, 100);

        return () => {
            clearInterval(timeout);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeLeft]);

    return (
        <div className="baseTimer">
            <svg className="baseTimerSvg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g className="baseTimerCircle">
                    <circle className="baseTimerPathElapsed strokeColor" cx="50" cy="50" r="45" />
                    <path
                        id="base-timer-path-remaining"
                        strokeDasharray={stroke}
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
            {
                timeLeft !== -1 ? 
                <span className="baseTimerLabel">{formatTimeLeft(timeLeft)}</span>
                : ''
            }
        </div>
    );
}

Timer.protoTypes = {
   timerValue: ProtoTypes.number.isRequired,
   handleStopGame: ProtoTypes.func.isRequired
}