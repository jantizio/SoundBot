const { SlashCommandBuilder } = require('discord.js');
const defaultEmbed = require('../lib/defaultEmbed.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('audio-list')
    .setDescription('Mostra la lista degli audio disponibili'),
  aliases: ['al'],
  async execute(interaction) {
    await interaction.reply({ embeds: [body(interaction.client)] });
  },
  executeOld(message) {
    return message.channel.send({ embeds: [body(message.client)] });
  },
};

function body(client) {
  const { audioList, jantizio, user: bot } = client;
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
