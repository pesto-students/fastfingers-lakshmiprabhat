/* eslint-disable react/jsx-filename-extension */
/* eslint-disable linebreak-style */
import React, { useEffect } from "react";
import "./HomePage.scss";
import keyboardLogo from "../../assets/Icon-keyboard.svg";
import playIcon from "../../assets/Icon-play.svg";
import { levels, saveDataToLocalStorage } from "../common/Util.jsx";
import useForm from "./useForm";
import validate from "../common/ValidateInputs";

export default function HomePage() {
  const { handleChange, handleSubmit, values, errors } = useForm(validate);
  saveDataToLocalStorage("scoresList",[]);
  saveDataToLocalStorage("currentGame",1);
  const playerNameRef = React.createRef();
  useEffect(() => {
      if (playerNameRef.current) {
        playerNameRef.current.focus();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
          name="username"
          placeholder="TYPE YOUR NAME"
          value={values.username}
          onChange={handleChange}
          ref={playerNameRef}
        />
        {errors.username && <p>{errors.username}</p>}
        <select
          name="difficultyLevel"
          placeholder="DIFFICULTY LEVEL"
          value={values.difficultyLevel}
          onChange={handleChange}
        >
          {levels.map((item) => (
            <option key={item.level} value={item.level}>
              {item.levelDesc}
            </option>
          ))}
        </select>
        <button className="buttonStyle" type="submit">
          <img className="playIcon" src={playIcon} alt="keyboard" />
          <span className="buttonText">START GAME</span>
        </button>
      </form>
    </div>
  );
}
