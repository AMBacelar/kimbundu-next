console.log("yolo");

const fs = require("fs");
let words = require("./words.json");

const sortedArray = words
  .slice()
  .filter((word) => word.kimbunduText !== "")
  .filter((word) => word.kimbunduText[0] !== "'")
  .filter((word) => word.kimbunduText[0] !== "-")
  .sort((a, b) => (a.kimbunduText < b.kimbunduText ? -1 : 1));

const restructure = (arrayOfEntries) => {
  const newDictionary = [];
  let currentWordObject = {};
  let currentWord = [];
  let currentEntry = "";
  for (let index = 0; index < arrayOfEntries.length; index++) {
    const entry = arrayOfEntries[index];
    // if we are on a new word
    if (entry.kimbunduText !== currentEntry) {
      // check length of current word, and if there is something, push it to the new dictionary
      if (currentWord.length > 0) {
        newDictionary.push({
          ...currentWordObject,
          definitions: [...currentWord],
        });
      }
      // reset current word and entry
      currentWord = [];
      currentEntry = entry.kimbunduText;
      currentWordObject.kimbunduText = entry.kimbunduText;
      currentWordObject.diacriticFree = entry.diacriticFree;
    }

    currentWord.push({
      context: entry.context,
      tags: entry.tags,
      translations: entry.translations,
      literalTranslations: entry.literalTranslations,
      class: entry.class,
    });
  }
  return newDictionary;
};

console.log(sortedArray.length, restructure(sortedArray).length);

// const wordsData = JSON.stringify(restructure(sortedArray));
// fs.writeFileSync("words2.json", wordsData);
