const tts = require("../../commands/tts.js");
const frase = require("../arrayFrasi.js");

function execute(data, message, ops) {
  let { jsonData } = data;
  data.eventsLength = 0;
  tts.execute(message, frase(["fake", "fake"], "fineGame"), ops);
  console.log("fine game");
}

module.exports = execute;
