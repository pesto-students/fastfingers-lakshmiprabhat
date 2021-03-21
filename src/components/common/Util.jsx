export const saveDataToLocalStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));
export const getDataFromLocalStorage = (key) =>
  key && JSON.parse(localStorage.getItem(key));
export const levels = [
  { level: 1, levelDesc: "EASY" },
  { level: 1.5, levelDesc: "MEDIUM" },
  { level: 2, levelDesc: "HARD" }
];
export function formatTimeLeft(time,format ="ss:ms") {
  let minutes = Math.floor(time / 1000 / 60);
  let seconds = Math.floor(time / 1000);
  let miliseconds = (time % 1000) / 10;

  if(seconds % 60 === 0){
    seconds = 0;
  }
  if(seconds > 60) {
    seconds = Math.floor(seconds % 60);
  }

  if (format === "mm:ss") {
    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds
      }`;
  }
  else {
    return `${seconds < 10 ? `0${seconds}` : seconds}:${miliseconds < 10 ? `0${miliseconds}` : miliseconds
      }`;
  }
}