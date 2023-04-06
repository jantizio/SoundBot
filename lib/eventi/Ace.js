const tts = require('../../commands/tts.js');
const frase = require('../arrayFrasi.js');

function execute(data, message) {
  const { eventi, jsonData, activePlayer, lastEvent } = data;
  console.log('ace il player che prendo è' + activePlayer);
  if (eventi[lastEvent].AcingTeam == jsonData.allPlayers[activePlayer].team) {
    console.log('hai fatto un ace');
    tts.executeOld(message, frase(['fake', 'fake'], 'aceA'));
  } else {
    console.log('gli avversari hanno fatto un ace');
    tts.executeOld(message, frase(['fake', 'fake'], 'aceN'));
  }
}

module.exports = execute;
