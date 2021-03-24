import React from 'react';
import ProtoTypes from "prop-types";

export default function RandomWord({ randomWord, inputWord }){
    let content = randomWord.split("").map((ch, index) => {
        if (inputWord[index] && ch.toLowerCase() === inputWord[index].toLowerCase()) {
            return <span style={{ color: "green" }} key={index}>{ch}</span>
        }
        else if (inputWord[index]) {
            return <span style={{ color: "blue" }} key={index}>{ch}</span>
        }
        else {
            return <span style={{ color: "white" }} key={index}>{ch}</span>
        }
    });;
    return (
        <p className="randomWord">{content}</p>
    );
}

RandomWord.protoTypes = {
    randomWord : ProtoTypes.string,
    inputWord : ProtoTypes.string
}