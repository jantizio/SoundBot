module.exports = {
  name: 'skip',
  description: 'Skippa la riproduzione corrente',
  aliases: ['s'],
  execute(message, args, ops) {
    const fetched = ops.active.get(message.guild.id);

    if (message.member.voice.channel !== message.guild.me.voice.channel) {
      return message.reply(
        'Devi essere nello stesso canale del bot per skippare',
      );
    }

    if (!fetched) return message.reply("Non c'è niente da skippare, coglione");

    ops.active.set(message.guild.id, fetched);

    // message.channel.send("Audio skippato con successo!");
    return fetched.dispatcher.emit('finish');
  },
};
