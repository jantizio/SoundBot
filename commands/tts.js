const { SlashCommandBuilder } = require('discord.js');
const { createAudioResource } = require('@discordjs/voice');
const { initializeConnection } = require('../lib/play.js');
const {
  PollyClient,
  SynthesizeSpeechCommand,
} = require('@aws-sdk/client-polly');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tts')
    .setDescription('Trasforma quello che scrivi in voce')
    .addStringOption((option) =>
      option
        .setName('testo')
        .setDescription('Il testo da trasformare in voce')
        .setRequired(true)
    ),
  args: true,
  usage: '<testo>',
  async execute(interaction) {
    const text = interaction.options.getString('testo');
    const ops = {
      client: interaction.client,
      voice: interaction.member.voice,
      author: interaction.user,
      channel: interaction.channel,
    };
    const out = await body(text, ops);
    if (out) {
      await interaction.reply({ content: out, ephemeral: true });
    } else {
      await interaction.reply(`**TTS:** ${text}`);
    }
  },
  async executeOld(message, args) {
    const ops = {
      client: message.client,
      voice: message.member.voice,
      author: message.author,
      channel: message.channel,
    };

    let testo;
    if (typeof args === 'string') {
      testo = args;
    } else {
      testo = args.join(' ');
    }

    const out = await body(testo, ops);

    if (out) {
      message.reply(out);
    }
  },
};

async function body(text, ops) {
  const { client, voice, author, channel } = ops;
  const { active } = client;
  if (!voice.channelId) {
    return 'Devi essere in un canale vocale';
  }

  const Polly = new PollyClient({
    region: 'eu-central-1',
  });

  const command = new SynthesizeSpeechCommand({
    Text: text,
    OutputFormat: 'ogg_vorbis',
    VoiceId: 'Giorgio',
  });

  const response = await Polly.send(command);

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
  const data = active.get(voice.guild.id) || {};

  const tts = {
    songTitle: 'text to speech',
    requester: author.username,
    resource: createAudioResource(response.AudioStream),
    announceChannel: channel.id,
  };

  initializeConnection(client, voice, data, tts);
}
