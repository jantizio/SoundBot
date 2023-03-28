const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const { version } = require('../package.json');
const defaultEmbed = require('../lib/defaultEmbed.js');

function body(jantizio, bot) {
  const testo = fs.readFileSync('./changelog.txt', 'utf8');

  const changelogEmbed = defaultEmbed(bot, jantizio);
  changelogEmbed
    .setDescription(`**SoundBot versione ${version}**`)
    .addFields({ name: '\u200B', value: `${testo}\n\u200B` });

  return changelogEmbed;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('changelog')
    .setDescription(
      'È la cronologia dei cambiamenti fatti al bot, qui puoi scoprire tutte le nuove funzionalità!'
    ),
  aliases: ['ch', 'log', 'change'],
  async execute(interaction) {
    const { jantizio, user: bot } = interaction.client;
    await interaction.reply({ embeds: [body(jantizio, bot)] });
  },
  executeOld(message) {
    const { jantizio, user: bot } = message.client;
    return message.channel.send({ embeds: [body(jantizio, bot)] });
  },
};
