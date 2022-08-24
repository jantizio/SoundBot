/* eslint-disable linebreak-style */
const defaultEmbed = require('../lib/defaultEmbed.js');

module.exports = {
  name: 'queue',
  description: 'Mostra la queue corrente',
  aliases: ['q'],
  execute(message, args, ops) {
    const { jantizio } = ops;
    const { bot } = ops;
    const queueEmbed = defaultEmbed(bot, jantizio);

    /* const queueEmbed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setAuthor(bot.username, bot.displayAvatarURL({ dynamic: true }))
      .setTitle(`Queue di ${message.guild.name}:`)
      .setTimestamp()
      .setFooter(
        `Autore: ${jantizio.username}`,
        jantizio.displayAvatarURL({ dynamic: true })
      ); */

    queueEmbed.setTitle(`Queue di ${message.guild.name}:`);

    const fetched = ops.active.get(message.guild.id);
    if (!fetched) {
      return message.channel.send(
        queueEmbed.addField(
          '__Ora in esecuzione:__',
          "Non c'è niente in esecuzione",
        ),
      );
    }

    const { queue } = fetched;
    const nowPlaying = queue[0];

    // let resp = `__**Ora in esecuzione**__\n**${nowPlaying.songTitle}** -- **Richiesta da:** *${nowPlaying.requester}*\n\n__**Queue**__\n`;
    queueEmbed.addField(
      '__Ora in esecuzione:__',
      `**${nowPlaying.songTitle}** | Richiesta da: *${nowPlaying.requester}*`,
    );

    let others = '';

    for (let i = 1; i < queue.length; i++) {
      // resp += `${i}. **${queue[i].songTitle}** -- **Richiesta da:** *${queue[i].requester}*\n`;
      others += `${i}) **${queue[i].songTitle}** | Richiesta da: *${queue[i].requester}*\n`;
    }
    queueEmbed.addField('__Successivamente:__', `${others}\u200b`);

    // message.channel.send(resp);
    message.channel.send(queueEmbed);
  },
};
