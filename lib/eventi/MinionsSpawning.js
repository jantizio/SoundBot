const tts = require('../../commands/tts.js');
const frase = require('../arrayFrasi.js');

function execute(data, message) {
  tts.executeOld(message, frase(['fake', 'fake'], 'inizioGame'));
}
module.exports = execute;
