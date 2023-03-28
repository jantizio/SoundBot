const { SlashCommandBuilder } = require('discord.js');
const defaultEmbed = require('../lib/defaultEmbed.js');

function body(audioList, jantizio, bot) {
  const keys = Array.from(audioList.keys());

  const nElementi = Math.ceil(keys.length / 3);
  const alEmbed = defaultEmbed(bot, jantizio);
  alEmbed.setDescription('Lista degli audio disponibili: ');
  // .addField("\u200B", `***${keys.join("\n")}***\n\u200B`);
  let Istart = 0;
  let Istop = nElementi;
  for (let c = 0; c < 3; c++) {
    let lista = '';
    for (let index = Istart; index < Istop; index++) {
      lista += keys[index] ? `***${keys[index]}***\n` : '';
    }
    Istart = Istop;
    Istop += nElementi;
    alEmbed.addFields({
      name: '\u200B',
      value: `${lista}\n\u200B`,
      inline: true,
    });
  }

  return alEmbed;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('audio-list')
    .setDescription('Mostra la lista degli audio disponibili'),
  aliases: ['al'],
  async execute(interaction) {
    const { audioList, jantizio, user: bot } = interaction.client;
    await interaction.reply({ embeds: [body(audioList, jantizio, bot)] });
  },
  executeOld(message) {
    const { audioList, jantizio, user: bot } = message.client;
    return message.channel.send({ embeds: [body(audioList, jantizio, bot)] });
  },
};
