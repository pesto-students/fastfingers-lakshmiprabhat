import React from "react";
import ProtoTypes from "prop-types";

export default function SetColorsOnRandomWord({ randomWord, playerInput }) {
    let content = randomWord.split("").map((ch, i) => {
        if (playerInput[i] && ch.toLowerCase() === playerInput[i].toLowerCase()) {
            return <span style={{ color: "green" }} key={i}>{ch}</span>
        }
        else if (playerInput[i]) {
            return <span style={{ color: "blue" }} key={i}>{ch}</span>
        }
        else {
            return <span style={{ color: "white" }} key={i}>{ch}</span>
        }
    });;
    return (
        <p>{content}</p>
    );
}
SetColorsOnRandomWord.ProtoTypes = {
    randomWord: ProtoTypes.string,
    playerInput: ProtoTypes.string
}