const { SlashCommandBuilder } = require('discord.js');

function body(target) {
  return `${target.username}'s avatar: <${target.displayAvatarURL({
    dynamic: true,
  })}>`;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription("mostra l'avatar dell'utente menzionato")
    .addUserOption((option) =>
      option.setName('target').setDescription("l'utente di cui vuoi l'avatar")
    ),
  args: false,
  usage: '<user mention>',
  aliases: ['icon', 'pfp'],
  async execute(interaction) {
    const target = interaction.options.getUser('target') ?? interaction.user;

    await interaction.reply(body(target));
  },
  executeOld(message) {
    if (!message.mentions.users.size) {
      return message.channel.send(body(message.author));
    }

    const avatarList = message.mentions.users.map((user) => body(user));
    avatarList.forEach((text) => {
      message.channel.send(text);
    });
  },
};
