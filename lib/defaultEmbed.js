const { EmbedBuilder } = require('discord.js');

module.exports = function (bot, jantizio) {
  const defaultEmbed = new EmbedBuilder()
    .setColor('#ed7e6d')
    .setAuthor(
      {
        name: bot.username,
        iconURL: bot.displayAvatarURL({ dynamic: true }),
      },
      bot.displayAvatarURL({ dynamic: true })
    )
    .setTimestamp()
    .setFooter({
      text: `Autore: ${jantizio.username}`,
      iconURL: jantizio.displayAvatarURL({ dynamic: true }),
    });
  return defaultEmbed;
};
