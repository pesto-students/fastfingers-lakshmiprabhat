export const saveDataToLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
export const getDataFromLocalStorage = (key) => key && JSON.parse(localStorage.getItem(key));
export const levels = [{ level: 1, levelDesc: 'EASY' }, { level: 1.5, levelDesc: 'MEDIUM' }, { level: 2, levelDesc: 'HARD' }];
