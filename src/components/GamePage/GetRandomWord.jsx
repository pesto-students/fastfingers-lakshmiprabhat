import data from "../common/dictionary.json";
export const getRandomWordFromDictionary= (level) => {
    let filteredWords = data.filter( function(word){
        if (level === 1) {return word.length <=4;}
        else if (level === 2){return word.length >=5 && word.length <=8;}
        else if (level === 3){return word.length > 8}
    });
    const randomIndex = Math.floor(Math.random()*filteredWords.length);
    const randomWord = filteredWords[randomIndex];
    return randomWord;
}
