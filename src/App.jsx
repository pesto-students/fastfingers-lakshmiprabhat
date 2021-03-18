/* eslint-disable react/jsx-filename-extension */
/* eslint-disable linebreak-style */
import React,{useState} from 'react';
import HomePage from './components/HomePage/HomePage';
import GamePage from './components/GamePage/GamePage';

function App() {
  const [isSubmitted,setIsSubmitted]=useState(false);
  function submitForm(){
    setIsSubmitted(true);
  }
  return (
    <div>
      {!isSubmitted ? (
          <HomePage submitForm={submitForm} />
        ) : (
          <GamePage />
        )}
    </div>
  );
}

export default App;
