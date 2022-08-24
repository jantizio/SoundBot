const amici = require("../../friends.json");
const tts = require("../../commands/tts.js");
const frase = require("../arrayFrasi.js");

function execute(data, message, ops) {
  let { eventi, lastEvent } = data;
  console.log("è avvenuto il First Brick!");
  const { KillerName } = eventi[lastEvent];
  const { [KillerName]: realFriend } = amici;
  if (realFriend) {
    console.log(`Il tuo amico ${realFriend[0]} ha rotto la prima torre`);
    tts.execute(message, frase(realFriend, "primaTorre"), ops);
  }
}

module.exports = execute;
