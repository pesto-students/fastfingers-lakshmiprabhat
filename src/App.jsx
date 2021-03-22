/* eslint-disable react/jsx-filename-extension */
/* eslint-disable linebreak-style */
import React from 'react';
import HomePage from "./components/HomePage/HomePage";
import GamePage from "./components/GamePage/GamePage";
import Route from "./components/common/CustomRouter";
import "./App.css";

export default function App() {
  return (
    <div>
      <Route path="/">
        <HomePage />
      </Route>
      <Route path="/game-page">
        <GamePage />
      </Route>
    </div>
  );
}

