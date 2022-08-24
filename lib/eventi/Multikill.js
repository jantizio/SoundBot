const amici = require("../../friends.json");
const tts = require("../../commands/tts.js");
const frase = require("../arrayFrasi.js");

function execute(data, message, ops) {
  let { eventi, lastEvent } = data;
  const { KillerName } = eventi[lastEvent];
  const { [KillerName]: realFriend } = amici;
  if (realFriend) {
    switch (eventi[lastEvent].KillStreak) {
      case 3:
        tts.execute(message, frase(realFriend, "tripleKill"), ops);
        break;
      case 4:
        tts.execute(message, frase(realFriend, "quadraKill"), ops);
        break;
      case 5:
        tts.execute(message, frase(realFriend, "pentaKill"), ops);
        break;
      default:
        console.log("è avvenuta una multikill");
        break;
    }
  }
}

module.exports = execute;
