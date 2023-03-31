const { SlashCommandBuilder } = require('discord.js');
const { createAudioResource, StreamType } = require('@discordjs/voice');
const { initializeConnection } = require('../lib/play.js');
const path = require('node:path');
const { createReadStream } = require('node:fs');

function body(soundName, ops) {
  const { client, voice, author, channel } = ops;
  const { audioList, active } = client;

  // controlla se l'utente è nel canale vocale
  if (!voice.channelId) {
    return 'Devi essere in un canale vocale';
  }

  // salva il percorso del file audio in una variabile
  let audioPath = audioList.get(soundName);
  if (!audioPath) {
    return `L'audio \`${soundName}\` non esiste`;
  }
  audioPath = path.join(__dirname, audioList.get(soundName));

  const data = active.get(voice.guild.id) || {};

  const song = {
    songTitle: soundName,
    requester: author.username,
    resource: createAudioResource(createReadStream(audioPath), {
      inputType: StreamType.OggOpus,
    }),
    announceChannel: channel.id,
  };

  initializeConnection(client, voice, data, song);
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play-audio')
    .setDescription(
      'Riproduce un audio, fai `\\audio-list` per vedere tutti gli audio disponibili'
    )
    .addStringOption((option) =>
      option
        .setName('audio')
        .setDescription("Il nome dell'audio che vuoi riprodurre")
        .setRequired(true)
    ),
  args: true,
  usage: '<audio name>',
  aliases: ['pa', 'p'],
  async execute(interaction) {
    const audioName = interaction.options.getString('audio');
    const ops = {
      client: interaction.client,
      voice: interaction.member.voice,
      author: interaction.user,
      channel: interaction.channel,
    };
    const out = body(audioName, ops) ?? `Hai scelto ${audioName}`;

    await interaction.reply({ content: out, ephemeral: true });
  },
  async executeOld(message, args) {
    const ops = {
      client: message.client,
      voice: message.member.voice,
      author: message.author,
      channel: message.channel,
    };

    const out = body(args[0], ops);

    if (out) {
      message.reply(out);
    }
  },
};
