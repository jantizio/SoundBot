const amici = require('../../friends.json');
const tts = require('../../commands/tts.js');
const frase = require('../arrayFrasi.js');

function execute(data, message) {
  const { eventi, lastEvent } = data;
  console.log('è avvenuto il First Blood!');
  const { VictimName, KillerName } = eventi[lastEvent - 1];
  const { [KillerName]: realFriendK, [VictimName]: realFriendV } = amici;
  if (realFriendV) {
    console.log(`Il tuo amico ${realFriendV[0]} ha dato il primo sangue`);
    tts.executeOld(message, frase(realFriendV, 'primoSangueN'));
  }
  if (realFriendK) {
    console.log(`Il tuo amico ${realFriendK[0]} ha fatto il primo sangue`);
    tts.executeOld(message, frase(realFriendK, 'primoSangueA'));
  }
}
module.exports = execute;
