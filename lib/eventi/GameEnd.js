const tts = require('../../commands/tts.js');
const frase = require('../arrayFrasi.js');

function execute(data, message) {
  data.eventsLength = 0;
  tts.executeOld(message, frase(['fake', 'fake'], 'fineGame'));
  console.log('fine game');
}

module.exports = execute;
