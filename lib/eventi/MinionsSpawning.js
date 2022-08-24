const tts = require("../../commands/tts.js");
const frase = require("../arrayFrasi.js");

function execute(message, ops) {
  tts.execute(message, frase(["fake", "fake"], "inizioGame"), ops);
}
module.exports = execute;
