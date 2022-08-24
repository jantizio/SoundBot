module.exports = {
  name: 'leave',
  description: 'Fa uscire il bot dal canale vocale e cancella la queue',
  aliases: ['l'],
  execute(message, args, ops) {
    // let fetched = ops.active.get(message.guild.id);
    if (!message.guild.me.voice.channel) { return message.reply('Il bot non è connesso al canale vocale'); }

    if (message.member.voice.channel !== message.guild.me.voice.channel) { return message.reply('Non sei nello stesso canale del bot'); }

    ops.active.delete(message.guild.id);
    message.guild.me.voice.channel.leave();
    const { channelID } = message.member.voice; // Get the user's voice channel ID
    if (channelID) {
      // Find an existing connection to that channel
      const connection = message.client.voice.connections.find(
        (conn) => conn.channel.id == channelID,
      );
      if (connection) {
        // If you find one, use .disconnect()
        ops.active.delete(message.guild.id);
        connection.disconnect();
      }
    }
  },
};
