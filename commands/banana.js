const { SlashCommandBuilder } = require('discord.js');
let banana = false;
module.exports = {
  data: new SlashCommandBuilder()
    .setName('banana')
    .setDescription('Attiva e disattiva la modalità banana'),
  aliases: ['b'],
  async execute(interaction) {
    const getGame = require('../lib/riotapi.js');
    if (!banana) {
      banana = true;
      interaction.reply(':banana: Banana Mode attivata :banana: ');
      console.log('attivata');
      // getGame.startLoop(message);
    } else {
      banana = false;
      interaction.reply(':banana: Banana Mode disattivata :banana: ');
      console.log('disattivata');
      getGame.stopLoop();
    }
    /* const tts = message.client.commands.get("tts");
    let roast = ", stfu";
    tts.execute(message, roast, ops); */
  },
  async executeOld(message) {
    const getGame = require('../lib/riotapi.js');
    if (!banana) {
      banana = true;
      message.channel.send(':banana: Banana Mode attivata :banana: ');
      console.log('attivata');
      getGame.startLoop(message);
    } else {
      banana = false;
      message.channel.send(':banana: Banana Mode disattivata :banana: ');
      console.log('disattivata');
      getGame.stopLoop();
    }
    /* const tts = message.client.commands.get("tts");
    let roast = ", stfu";
    tts.execute(message, roast, ops); */
  },
};
