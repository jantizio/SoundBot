const Discord = require('discord.js');

module.exports = function (bot, jantizio) {
  const defaultEmbed = new Discord.MessageEmbed()
    .setColor('#ed7e6d')
    .setAuthor(bot.username, bot.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setFooter(
      `Autore: ${jantizio.username}`,
      jantizio.displayAvatarURL({ dynamic: true }),
    );
  return defaultEmbed;
};
