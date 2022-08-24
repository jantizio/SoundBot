// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
// NODE_EXTRA_CA_CERTS = ["D:/emanu/Documents/DiscordBots/SoundBot/riotgames.pem"];
// process.env["NODE_EXTRA_CA_CERTS"] = "D:/emanu/Documents/DiscordBots/SoundBot/riotgames.pem";
// process.env.NODE_EXTRA_CA_CERTS = "D:/emanu/Documents/DiscordBots/SoundBot/riotgames.pem";
const fs = require('fs');
const https = require('https');
var Factory = require('./factory.js');
// 65,03964233398438 = 1 minuto e 10 secondi (spwan dei minion)
const localgame = {
  hostname: 'localhost',
  port: 2999,
  path: '/liveclientdata/allgamedata',
  method: 'GET',
  ca: fs.readFileSync('./riotgames.pem'),
};
/*var jsonData;
var currentEventsLength;
var eventsLength = 0;
var intervalid;
var activePlayerIndex = 0;*/
var currentEventsLength;
var eventsLength = 0;
var intervalid;
var activePlayerIndex = 0;
var eventQueue = [];

function request(message, ops) {
  https
    .request(localgame, (response) => {
      // console.log(`statusCode: ${response.statusCode}`);
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        //console.log("richiesta");
        var jsonData = JSON.parse(data);
        if (jsonData.events) {
          currentEventsLength = jsonData.events.Events.length;
          getNewEvents(message, ops, currentEventsLength, jsonData);
        }

        //console.log("eventi avvenuti: " + currentEventsLength);
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

/*function getNewEvents(message, ops, currentEventsLength, jsonData) {
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
    strategy(data, message, ops);

    activePlayerIndex = data.activePlayer;
    console.log("activePlayer " + activePlayerIndex);
    //eventsLength = data.eventsLength;
    currentEventsLength = data.eventsLength;
    console.log(
      "valore di currentEventsLength cambiato " + currentEventsLength
    );//
  }
}*/

function getNewEvents(message, ops, currentEventsLength, jsonData) {
  if (jsonData.gameData.gameTime < 900) {
    if (Math.floor(Math.random() * 1001) === 999) {
      console.log('è uscito');
      require('../commands/play-audio.js').execute(
        message,
        ['cosa-indossi'],
        ops
      );
    }
  }
  if (currentEventsLength - eventsLength > 10)
    eventsLength = currentEventsLength;

  if (currentEventsLength > eventsLength) {
    for (let index = eventsLength; index < currentEventsLength; index++) {
      eventQueue.push({
        eventi: jsonData.events.Events,
        jsonData,
        activePlayer: activePlayerIndex,
        lastEvent: index,
        index,
      });
    }
    eventsLength = currentEventsLength;
  }

  if (eventQueue.length !== 0) {
    let data = eventQueue.shift();
    let strategy = Factory.getStrategy(data.eventi[data.lastEvent].EventName);
    strategy(data, message, ops);

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
  startLoop(message, ops) {
    intervalid = setInterval(request, 1200, message, ops);
  },
  stopLoop() {
    clearInterval(intervalid);
    currentEventsLength = 0;
    eventsLength = 0;
    activePlayerIndex = 0;
    eventQueue = [];
  },
};
