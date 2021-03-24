import WordsCollection from "./data/dictionary.json";

export const saveDataToLocalStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));
export const getDataFromLocalStorage = (key) =>
  key && JSON.parse(localStorage.getItem(key));
export const levels = [
  { level: 1, levelDesc: "EASY" },
  { level: 1.5, levelDesc: "MEDIUM" },
  { level: 2, levelDesc: "HARD" }
];
export function formatTimeLeft(time, format = "ss:ms") {
  let minutes = Math.floor(time / 1000 / 60);
  let seconds = Math.floor(time / 1000);
  let miliseconds = (time % 1000) / 10;

  if (seconds % 60 === 0) {
    seconds = 0;
  }
  if (seconds > 60) {
    seconds = Math.floor(seconds % 60);
  }

  if (format === "mm:ss") {
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  } else {
    return `${seconds < 10 ? `0${seconds}` : seconds}:${
      miliseconds < 10 ? `0${miliseconds}` : miliseconds
    }`;
  }
}

const FULL_DASH_ARRAY = 283;

export function calculateTimeFraction(timeLeft, maxTime) {
  const rawTimeFraction = timeLeft / maxTime;
  return (
    (rawTimeFraction - (1 / maxTime) * (1 - rawTimeFraction)) * FULL_DASH_ARRAY
  );
}

const EASY_DIFFICULTY_WORDARR = WordsCollection.filter(
  (word) => word.length <= 4
);
const MEDIUM_DIFFICULTY_WORDARR = WordsCollection.filter(
  (word) => word.length >= 5 && word.length <= 8
);
const HARD_DIFFICULTY_WORDARR = WordsCollection.filter(
  (word) => word.length > 8
);

const getRandomIndex = (array) => Math.floor(Math.random() * array.length);

export const getRandomWord = (difficultyLevel) => {
  if (difficultyLevel < 1.5) {
    return EASY_DIFFICULTY_WORDARR[getRandomIndex(EASY_DIFFICULTY_WORDARR)];
  } else if (difficultyLevel > 1.5 && difficultyLevel < 2) {
    return MEDIUM_DIFFICULTY_WORDARR[getRandomIndex(MEDIUM_DIFFICULTY_WORDARR)];
  } else {
    return HARD_DIFFICULTY_WORDARR[getRandomIndex(HARD_DIFFICULTY_WORDARR)];
  }
};
