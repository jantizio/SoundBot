const { SlashCommandBuilder } = require('discord.js');
function body() {
  return 'Pong!';
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute(interaction) {
    body(interaction.user);
    await interaction.reply(body());
  },
  executeOld(message) {
    message.channel.send(body());
  },
};
