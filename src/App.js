/* eslint-disable react/jsx-filename-extension */
/* eslint-disable linebreak-style */
import React from 'react';
import HomePage from './components/HomePage/HomePage';
import GamePage from './components/GamePage/GamePage';
import Route from './components/common/Route';
import './components/HomePage/HomePage.css';

function App() {
  return (
    <div>
      <Route path="/">
        <HomePage />
      </Route>
      <Route path="/game-page">
        <div className="container">
        <GamePage />
        </div>
      </Route>
    </div>
  );
}

export default App;
