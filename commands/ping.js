const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Risponde con Pong!'),
  async execute(interaction) {
    await interaction.reply(body());
  },
  executeOld(message) {
    message.channel.send(body());
  },
};

function body() {
  return 'Pong!';
}
