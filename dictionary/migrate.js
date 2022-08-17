console.log("yolo");

const fs = require("fs");
let phrases = require("./raw/phrases.json");
let words = require("./raw/words.json");

const migrateContext = (arrayOfEntries) =>
  arrayOfEntries.map((entry) => ({
    ...entry,
    context: entry.context[0] || "",
  }));

phrases = migrateContext(phrases);

words = migrateContext(words);

const phraseData = JSON.stringify(phrases);
const wordsData = JSON.stringify(words);

fs.writeFileSync("phrases.json", phraseData);
fs.writeFileSync("words.json", wordsData);
