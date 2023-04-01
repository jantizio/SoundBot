const { SlashCommandBuilder } = require('discord.js');
const defaultEmbed = require('../lib/defaultEmbed.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Mostra la queue corrente'),
  aliases: ['q'],
  async execute(interaction) {
    const { client, guild } = interaction;
    await interaction.reply({ embeds: [body(client, guild)] });
  },
  executeOld(message) {
    const { client, guild } = message;
    return message.channel.send({ embeds: [body(client, guild)] });
  },
};

function body(client, guild) {
  const { jantizio, user: bot, active } = client;
  const queueEmbed = defaultEmbed(bot, jantizio);

  queueEmbed.setTitle(`Queue di ${guild.name}:`);

  const fetched = active.get(guild.id);
  if (!fetched || !fetched.dispatcher) {
    return queueEmbed.addFields({
      name: '__Ora in esecuzione:__',
      value: "Non c'è niente in esecuzione",
    });
  }

  const { queue } = fetched;
  const nowPlaying = queue[0];

  queueEmbed.addFields({
    name: '__Ora in esecuzione:__',
    value: `**${nowPlaying.songTitle}** | Richiesta da: *${nowPlaying.requester}*`,
  });

  let others = '';

  for (let i = 1; i < queue.length; i++) {
    others += `${i}) **${queue[i].songTitle}** | Richiesta da: *${queue[i].requester}*\n`;
  }
  queueEmbed.addFields({
    name: '__Successivamente:__',
    value: `${others}\u200b`,
  });

  return queueEmbed;
}
