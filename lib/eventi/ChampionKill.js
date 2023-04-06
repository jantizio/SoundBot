const amici = require('../../friends.json');
const command = require('../cmdrand');
const frase = require('../arrayFrasi.js');

function execute(data, message) {
  const { eventi, lastEvent } = data;
  const { VictimName, KillerName } = eventi[lastEvent];
  const { [KillerName]: realFriendK, [VictimName]: realFriendV } = amici;
  const cmd = command();
  const isTTS = cmd.data.name === 'tts' ? true : false;
  if (realFriendV) {
    console.log(`Il tuo amico ${realFriendV[0]} è morto!`);
    isTTS
      ? cmd.executeOld(message, frase(realFriendV, 'morte'))
      : cmd.executeOld(message, [frase(['fake', 'fake'], 'audioMorte')]);
  }
  if (realFriendK) {
    console.log(`Il tuo amico ${realFriendK[0]} ha fatto un kill!`);
    isTTS
      ? cmd.executeOld(message, frase(realFriendK, 'uccisione'))
      : cmd.executeOld(message, [frase(['fake', 'fake'], 'audioUccisione')]);
  }
}
module.exports = execute;
