/* eslint-disable linebreak-style */
module.exports = {
  name: 'avatar',
  description: "mostra l'avatar dell'utente menzionato",
  args: true,
  usage: '<user mention>',
  aliases: ['icon', 'pfp'],
  execute(message) {
    if (!message.mentions.users.size) {
      return message.channel.send(
        `Your avatar: <${message.author.displayAvatarURL({ dynamic: true })}>`,
      );
    }

    const avatarList = message.mentions.users.map((user) => `${user.username}'s avatar: <${user.displayAvatarURL({
      dynamic: true,
    })}>`);

    message.channel.send(avatarList);
  },
};
