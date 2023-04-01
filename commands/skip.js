const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skippa la riproduzione corrente'),
  aliases: ['s'],
  async execute(interaction) {
    const {
      client,
      guild: { id: guildId },
    } = interaction;
    const channelId = interaction.member.voice.channelId;

    const out = body(client, guildId, channelId) ?? 'Audio skippato';
    await interaction.reply({ content: out, ephemeral: true });
  },
  async executeOld(message) {
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
  const fetched = active.get(guildId);
  const connection = getVoiceConnection(guildId);

  if (!connection) {
    return 'Il bot non è connesso al canale vocale';
  }

  if (userChannelId !== connection.joinConfig.channelId) {
    return 'Devi essere nello stesso canale del bot per skippare';
  }

  if (!fetched || !fetched.dispatcher) {
    return "Non c'è niente da skippare, coglione";
  }

  fetched.dispatcher.stop();
}
