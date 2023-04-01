const { Events } = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const { client } = message;

    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );
    if (!command) return;
    const serverName = client.guilds.cache.get(message.guild.id).name;
    console.log(`${command.data.name} nel server ${serverName}`);

    if (command.args && !args.length) {
      let reply = `Devi specificare degli argomenti, ${message.author}!`;

      if (command.usage) {
        reply += `\nL'utilizzo corretto sarebbe: \`${prefix}${command.data.name} ${command.usage}\``;
      }
      return message.channel.send(reply);
    }

    try {
      await command.executeOld(message, args);
    } catch (error) {
      console.error(error);
      message.reply(
        `C'è stato un errore nel tentativo di eseguire questo comando`
      );
    }
  },
};
