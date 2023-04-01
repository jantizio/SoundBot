const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const { version } = require('../package.json');
const defaultEmbed = require('../lib/defaultEmbed.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('changelog')
    .setDescription(
      'È la cronologia dei cambiamenti fatti al bot, qui puoi scoprire tutte le nuove funzionalità!'
    ),
  aliases: ['ch', 'log', 'change'],
  async execute(interaction) {
    await interaction.reply({ embeds: [body(interaction.client)] });
  },
  executeOld(message) {
    return message.channel.send({ embeds: [body(message.client)] });
  },
};

function body(client) {
  const { jantizio, user: bot } = client;
  const testo = fs.readFileSync('./changelog.txt', 'utf8');

  const changelogEmbed = defaultEmbed(bot, jantizio);
  changelogEmbed
    .setDescription(`**SoundBot versione ${version}**`)
    .addFields({ name: '\u200B', value: `${testo}\n\u200B` });

  return changelogEmbed;
}
