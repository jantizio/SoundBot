const amici = require('../../friends.json');
const tts = require('../../commands/tts.js');
const frase = require('../arrayFrasi.js');

function execute(data, message) {
  const { eventi, lastEvent } = data;
  const { KillerName } = eventi[lastEvent];
  const { [KillerName]: realFriend } = amici;
  if (realFriend) {
    switch (eventi[lastEvent].KillStreak) {
      case 3:
        tts.executeOld(message, frase(realFriend, 'tripleKill'));
        break;
      case 4:
        tts.executeOld(message, frase(realFriend, 'quadraKill'));
        break;
      case 5:
        tts.executeOld(message, frase(realFriend, 'pentaKill'));
        break;
      default:
        console.log('è avvenuta una multikill');
        break;
    }
  }
}

module.exports = execute;
