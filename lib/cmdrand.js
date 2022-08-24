const tts = require("../commands/tts");
const pa = require("../commands/play-audio.js");

module.exports = function () {
  return between(1, 5) < 5 ? tts : pa;
};
function between(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
