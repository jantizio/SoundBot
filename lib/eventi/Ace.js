const tts = require("../../commands/tts.js");
const frase = require("../arrayFrasi.js");

function execute(data, message, ops) {
  let { eventi, jsonData, activePlayer, lastEvent } = data;
  console.log("ace il player che prendo è" + activePlayer);
  if (eventi[lastEvent].AcingTeam == jsonData.allPlayers[activePlayer].team) {
    console.log("hai fatto un ace");
    tts.execute(message, frase(["fake", "fake"], "aceA"), ops);
  } else {
    console.log("gli avversari hanno fatto un ace");
    tts.execute(message, frase(["fake", "fake"], "aceN"), ops);
  }
}

module.exports = execute;
