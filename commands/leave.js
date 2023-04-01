const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leave')
    .setDescription('Fa uscire il bot dal canale vocale e cancella la queue'),
  aliases: ['l'],
  async execute(interaction) {
    const {
      client,
      guild: { id: guildId },
    } = interaction;
    const channelId = interaction.member.voice.channelId;

    console.log(guildId, channelId);
    const out = body(client, guildId, channelId) ?? 'Addio';
    await interaction.reply({ content: out, ephemeral: true });
  },
  executeOld(message) {
    const {
      client,
      guild: { id: guildId },
    } = message;
    const channelId = message.member.voice.channelId;

    const out = body(client, guildId, channelId);
    if (out) message.reply(out);
  },
};

function body(client, guildId, userChannelId) {
  const { active } = client;
  const connection = getVoiceConnection(guildId);

  if (!connection) {
    return 'Il bot non è connesso al canale vocale';
  }

  if (userChannelId !== connection.joinConfig.channelId) {
    return 'Non sei nello stesso canale del bot';
  }

  const fetched = active.get(guildId);
  if (fetched.dispatcher) {
    fetched.dispatcher.stop();
    fetched.dispatcher = undefined;
  }
  active.delete(guildId);
  connection.destroy();
}
