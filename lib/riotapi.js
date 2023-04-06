// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
// NODE_EXTRA_CA_CERTS = ["D:/emanu/Documents/DiscordBots/SoundBot/riotgames.pem"];
// process.env["NODE_EXTRA_CA_CERTS"] = "D:/emanu/Documents/DiscordBots/SoundBot/riotgames.pem";
// process.env.NODE_EXTRA_CA_CERTS = "D:/emanu/Documents/DiscordBots/SoundBot/riotgames.pem";
const fs = require('node:fs');
const https = require('node:https');
const Factory = require('./factory.js');
// 65,03964233398438 = 1 minuto e 10 secondi (spwan dei minion)
const localgame = {
  hostname: 'localhost',
  port: 2999,
  path: '/liveclientdata/allgamedata',
  method: 'GET',
  ca: fs.readFileSync('./riotgames.pem'),
};
/* var jsonData;
var currentEventsLength;
var eventsLength = 0;
var intervalid;
var activePlayerIndex = 0;*/
let currentEventsLength;
let eventsLength = 0;
let intervalid;
let activePlayerIndex = 0;
let eventQueue = [];

function request(message) {
  https
    .request(localgame, (response) => {
      // console.log(`statusCode: ${response.statusCode}`);
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        // console.log('richiesta');
        const jsonData = JSON.parse(data);
        if (jsonData.events) {
          // console.log(jsonData.events);
          currentEventsLength = jsonData.events.Events.length;
          getNewEvents(message, currentEventsLength, jsonData);
        }

        // console.log("eventi avvenuti: " + currentEventsLength);
      });
    })
    .on('error', (error) => {
      if (error.code !== 'ECONNREFUSED') console.error(error);
      if (error.code === 'ECONNRESET') {
        currentEventsLength = 0;
        eventsLength = 0;
      }
    })
    .end();
}

/* function getNewEvents(message,  currentEventsLength, jsonData) {
  console.log("currentEventsLength " + currentEventsLength);
  console.log("eventsLength " + eventsLength);
  if (currentEventsLength > eventsLength) {
    // console.log("Evento avvenuto!");
    eventsLength = currentEventsLength;

    let data = {
      eventi: jsonData.events.Events,
      jsonData,
      activePlayer: activePlayerIndex,
      lastEvent: eventsLength - 1,
      eventsLength,
    };
    // let { eventi, jsonData, activePlayer, lastEvent } = data;
    let strategy = Factory.getStrategy(data.eventi[data.lastEvent].EventName);
    strategy(data, message);

    activePlayerIndex = data.activePlayer;
    console.log("activePlayer " + activePlayerIndex);
    //eventsLength = data.eventsLength;
    currentEventsLength = data.eventsLength;
    console.log(
      "valore di currentEventsLength cambiato " + currentEventsLength
    );//
  }
}*/

function getNewEvents(message, curEventsLength, jsonData) {
  if (jsonData.gameData.gameTime < 900) {
    if (Math.floor(Math.random() * 1001) === 999) {
      console.log('è uscito');
      require('../commands/play-audio.js').executeOld(message, [
        'cosa-indossi',
      ]);
    }
  }
  if (curEventsLength - eventsLength > 10) {
    eventsLength = curEventsLength;
  }

  if (curEventsLength > eventsLength) {
    for (let index = eventsLength; index < curEventsLength; index++) {
      eventQueue.push({
        eventi: jsonData.events.Events,
        jsonData,
        activePlayer: activePlayerIndex,
        lastEvent: index,
        index,
      });
    }
    eventsLength = curEventsLength;
  }

  if (eventQueue.length !== 0) {
    const data = eventQueue.shift();
    const strategy = Factory.getStrategy(data.eventi[data.lastEvent].EventName);
    strategy(data, message);
    // console.log('ci ho provato');
    activePlayerIndex = data.activePlayer;
  }
}

/*
function trovaFrase(array, friend) {
  let l = "";
  if (friend[1] === "m") l = "o";
  else if (friend[1] === "f") l = "a";
  const VictimName = friend[0];

  return array.randomize();
}*/

// exports.gatherEvents = setInterval(getNewEvents, 1200);

module.exports = {
  startLoop(message) {
    intervalid = setInterval(request, 1200, message);
  },
  stopLoop() {
    clearInterval(intervalid);
    currentEventsLength = 0;
    eventsLength = 0;
    activePlayerIndex = 0;
    eventQueue = [];
  },
};
