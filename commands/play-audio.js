const { play } = require("../lib/play.js");

module.exports = {
  name: "play-audio",
  description:
    "Riproduce un audio, fai `\\audio-list` per vedere tutti gli audio disponibili",
  args: true,
  usage: "<audio name>",
  aliases: ["pa", "p"],
  async execute(message, args, ops) {
    const { audioList } = message.client;

    // controlla se l'utente è nel canale vocale
    const { voice } = message.member;
    if (!voice.channelID) {
      return message.reply("Devi essere in un canale vocale");
    }

    // salva il percorso del file audio in una variabile
    const audioPath = audioList.get(args[0]);
    if (!audioPath) {
      return message.channel.send(`L'audio \`${args[0]}\` non esiste`);
    }

    const data = ops.active.get(message.guild.id) || {};

    if (!data.connection) data.connection = await voice.channel.join();

    if (!data.queue) data.queue = [];
    data.guildID = message.guild.id;

    data.queue.push({
      songTitle: args[0],
      requester: message.author.username,
      path: audioPath,
      announceChannel: message.channel.id,
      type: "audio-file",
    });

    if (!data.dispatcher) play(message.client, ops, data);
    else {
      /* message.channel.send(
        `Aggiunta alla coda: ${data.queue[0].songTitle} | Richiesta da: ${data.queue[0].requester}`
      ); */
    }

    ops.active.set(message.guild.id, data);
  },
};
