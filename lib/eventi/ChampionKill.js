const amici = require("../../friends.json");
const command = require("../cmdrand");
const frase = require("../arrayFrasi.js");

function execute(data, message, ops) {
  let { eventi, lastEvent } = data;
  const { VictimName, KillerName } = eventi[lastEvent];
  const { [KillerName]: realFriendK, [VictimName]: realFriendV } = amici;
  let cmd = command();
  let isTTS = cmd.name === "tts" ? true : false;
  if (realFriendV) {
    console.log(`Il tuo amico ${realFriendV[0]} è morto!`);
    isTTS
      ? cmd.execute(message, frase(realFriendV, "morte"), ops)
      : cmd.execute(message, [frase(["fake", "fake"], "audioMorte")], ops);
  }
  if (realFriendK) {
    console.log(`Il tuo amico ${realFriendK[0]} ha fatto un kill!`);
    isTTS
      ? cmd.execute(message, frase(realFriendK, "uccisione"), ops)
      : cmd.execute(message, [frase(["fake", "fake"], "audioUccisione")], ops);
  }
}
module.exports = execute;
