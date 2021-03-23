import React from "react";
import ProtoTypes from "prop-types";

export default function SetColorsOnRandomWord({ randomWord, playerInput }) {
  let content = randomWord.split("").map((alph, index) => {
    if (
      playerInput[index] &&
      alph.toLowerCase() === playerInput[index].toLowerCase()
    ) {
      return (
        <span style={{ color: "green" }} key={index}>
          {alph}
        </span>
      );
    } else if (playerInput[index]) {
      return (
        <span style={{ color: "blue" }} key={index}>
          {alph}
        </span>
      );
    } else {
      return (
        <span style={{ color: "white" }} key={index}>
          {alph}
        </span>
      );
    }
  });
  return <p>{content}</p>;
}
SetColorsOnRandomWord.ProtoTypes = {
  randomWord: ProtoTypes.string,
  playerInput: ProtoTypes.string
};
