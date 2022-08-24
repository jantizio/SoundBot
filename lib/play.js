/* eslint-disable max-len */
const path = require('path');
const Stream = require('stream');

const timer = new Map();

// play function
async function play(client, ops, dati) {
  let feccia = timer.get(dati.guildID);
  if (feccia) {
    clearTimeout(feccia);
    feccia = undefined;
    timer.set(dati.guildID, feccia);
  }

  /* client.channels.cache
    .get(dati.queue[0].announceChannel)
    .send(
      `Adesso è in esecuzione: ${dati.queue[0].songTitle} | Richiesta da: ${dati.queue[0].requester}`
    ); */

  if (dati.queue[0].type === 'text') {
    const bufferStream = new Stream.PassThrough();
    dati.queue[0].Polly.synthesizeSpeech(dati.queue[0].path, (err, data) => {
      if (err) return console.log(err);
      if (data.AudioStream instanceof Buffer) {
        bufferStream.end(data.AudioStream);
      }
    });

    dati.dispatcher = await dati.connection.play(bufferStream);
  } else if (dati.queue[0].type === 'audio-file') {
    dati.dispatcher = await dati.connection.play(
      path.join(__dirname, dati.queue[0].path)
    );
  } else {
    console.log('non dovresti essere qui');
  }

  // console.log(dati.queue[0].path);
  dati.dispatcher.guildID = dati.guildID;

  dati.dispatcher.on('finish', () => {
    // finish(client, ops, dati);

    new Promise((resolve, reject) => {
      const alberto = finish(client, ops, dati);
      resolve(alberto);
    }).then((res) => {
      timer.set(dati.guildID, res);
    });
  });
}

// finish function
function finish(client, ops, dispatcher) {
  const fetched = ops.active.get(dispatcher.guildID);

  fetched.queue.shift();

  if (fetched.queue.length > 0) {
    ops.active.set(dispatcher.guildID, fetched);
    play(client, ops, fetched);
  } else {
    // console.log("fine queue");
    ops.active.delete(dispatcher.guildID);

    const timerId = setTimeout(() => {
      const serverName = client.guilds.cache.get(dispatcher.guildID).name;
      const vc = client.guilds.cache.get(dispatcher.guildID).me.voice.channel;
      if (vc) {
        vc.leave();
        console.log(
          `Esco dal canale ${vc.name} del server ${serverName}, sono stato inattivo per 10 minuti`
        );
      }
    }, 10 * 60 * 1000);
    return timerId;
  }
}

/* function delay() {
  // `delay` returns a promise
  return new Promise(function (resolve, reject) {
    // Only `delay` is able to resolve or reject the promise
    setTimeout(function () {
      resolve(42); // After 3 seconds, resolve the promise with value 42
    }, 3000);
  });
}

delay()
  .then(function (v) {
    // `delay` returns a promise
    console.log(v); // Log the value once it is resolved
  })
  .catch(function (v) {
    // Or do something else if it is rejected
    // (it would not happen in this example, since `reject` is not called).
  });
 */

module.exports = { play, finish };
