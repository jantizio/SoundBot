const {
  createAudioPlayer,
  joinVoiceChannel,
  getVoiceConnection,
} = require('@discordjs/voice');

// timeout in minuti
const inactiveTimeout = 10;

async function initializeConnection(client, voice, data, song) {
  let connection;
  if (!data.connection) {
    connection = await joinVoiceChannel({
      channelId: voice.channelId,
      guildId: voice.guild.id,
      adapterCreator: voice.guild.voiceAdapterCreator,
    });
    data.connection = true;
  } else {
    connection = getVoiceConnection(voice.guild.id);
  }

  if (!data.queue) data.queue = [];
  data.guildId = voice.guild.id;

  data.queue.push(song);

  if (!data.dispatcher) {
    data.dispatcher = createAudioPlayer();
    connection.subscribe(data.dispatcher);
    data.dispatcher.on('stateChange', async (oldState, newState) => {
      if (oldState.status == 'playing' && newState.status == 'idle') {
        // console.log('è finita una traccia audio');
        const time = await finish(client, data);
        if (time) {
          data.timer = time;
        }
      }
    });

    start(data);
  }

  await client.active.set(voice.guild.id, data);
}

// play function
async function start(dati) {
  if (dati.timer) {
    clearTimeout(dati.timer);
    dati.timer = undefined;
  }

  await dati.dispatcher.play(dati.queue[0].resource);
}

// finish function
function finish(client, data) {
  data.queue.shift();

  if (data.queue.length > 0) {
    // queue is not over, play the next track
    client.active.set(data.guildId, data);
    start(data);
  } else {
    // queue is over i set a timer to destroy it
    data.dispatcher.stop();
    data.dispatcher = undefined;
    client.active.set(data.guildId, data);

    const timerId = setTimeout(() => {
      const connection = getVoiceConnection(data.guildId);

      const guild = client.guilds.cache.get(data.guildId);
      const vc = guild.channels.resolve(connection.joinConfig.channelId).name;

      if (connection) {
        connection.destroy();
        client.active.delete(data.guildId);
        console.log(
          `Esco dal canale ${vc} del server ${guild.name}, sono stato inattivo per ${inactiveTimeout} minuti`
        );
      }
    }, inactiveTimeout * 60 * 1000);
    return timerId;
  }
}

module.exports = { initializeConnection, play: start, finish };
