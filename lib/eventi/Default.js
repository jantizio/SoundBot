const amici = require("../../friends.json");
const tts = require("../../commands/tts.js");
const pa = require("../../commands/play-audio.js");
const frase = require("../arrayFrasi.js");

function execute(data) {
  let { eventi, lastEvent } = data;
  console.log(`evento non gestito: ${eventi[lastEvent].EventName}`);
}

module.exports = execute;
