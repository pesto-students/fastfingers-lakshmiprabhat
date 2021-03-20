export const saveDataToLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
export const getDataFromLocalStorage = (key) => key && JSON.parse(localStorage.getItem(key));
export const levels = [{ level: 1, levelDesc: 'EASY' }, { level: 1.5, levelDesc: 'MEDIUM' }, { level: 2, levelDesc: 'HARD' }];
export function formatTimeLeft(time) {
    const minutes = Math.floor(time / 60);    
    let seconds = time % 60;    
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }  
   return `${minutes}:${seconds}`;
  }
