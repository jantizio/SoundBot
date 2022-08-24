const AWS = require("aws-sdk");
const { play } = require("../lib/play.js");

module.exports = {
  name: "tts",
  description: "Trasforma quello che scrivi in voce",
  args: true,
  usage: "<testo>",
  async execute(message, args, ops) {
    const { voice } = message.member;

    if (!voice.channelID) {
      message.reply("non sei in un canale vocale");
      return;
    }

    const Polly = new AWS.Polly({
      region: "eu-west-1",
    });

    let testo;
    if (typeof args === "string") {
      testo = args;
    } else {
      testo = args.join(" ");
    }

    const input = {
      Text: testo,
      OutputFormat: "mp3",
      VoiceId: "Giorgio",
    };

    // salva su file i caratteri utilizzati
    /* fs.readFile("./caratteri.txt", "utf8", async (err, data) => {
      if (err) return console.log(err);

      var str = args.join(" ").length;
      console.log("caratteri utilizzati: " + str);
      var totCaratteri = +str + +data;
      //console.log(totCaratteri);
      await fs.writeFile(
        "./caratteri.txt",
        totCaratteri.toString(),
        function (err) {
          if (err) return console.log(err);
        }
      );
    }); */
    const data = ops.active.get(message.guild.id) || {};

    if (!data.connection) data.connection = await voice.channel.join();
    if (!data.queue) data.queue = [];
    data.guildID = message.guild.id;

    data.queue.push({
      songTitle: "text to speech",
      requester: message.author.username,
      path: input,
      announceChannel: message.channel.id,
      Polly,
      type: "text",
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
