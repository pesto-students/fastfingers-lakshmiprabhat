import React from "react";
import PropTypes from "prop-types";
import { formatTimeLeft } from "../common/Util";

export default function ScoreBoard({ scores }) {
  const bestScore = Math.max(
    ...scores.map(({ score }) => {
      return score;
    })
  );

  const content = scores.map(({ gameId, score }) => {
    return (
      <div key={gameId}>
        {score === bestScore ? (
          <p className="personalBest">PERSONAL BEST</p>
        ) : (
          ""
        )}
        <p className="scoreList">
          Game {gameId} : {formatTimeLeft(score, "mm:ss")}
        </p>
      </div>
    );
  });

  return (
    <div className="scoreBoard">
      <p className="scoreBoardTitle">SCORE BOARD</p>
      {content}
    </div>
  );
}

ScoreBoard.propTypes = {
  scores: PropTypes.array
};
