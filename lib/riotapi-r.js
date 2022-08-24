var Factory = require("./factory.js");
const server = require("net").createServer();
var currentEventsLength;
var eventsLength = 0;
var activePlayerIndex = 0;
var eventQueue = [];
const port = 31415;
const host = "0.0.0.0";
const interruptCode = "taglia";
const separatore = "STOP";

function connectionHandler(message, ops) {
  let sockets = [];

  server.on("connection", function (sock) {
    console.log(
      "SERVER-CONNECTED: " + sock.remoteAddress + ":" + sock.remotePort
    );
    sock.setEncoding("utf8");
    sockets.push(sock);
    let data = "";

    sock.on("data", (chunk) => {
      if (chunk === separatore) {
        console.log(
          `SERVER-DATA from ${sock.remoteAddress}:${sock.remotePort}`
        );
        let index = sockets.findIndex(function (element) {
          return (
            element.remoteAddress === sock.remoteAddress &&
            element.remotePort === sock.remotePort
          );
        });

        if (isJson(data)) {
          console.log("data è un json");
          let jsonData = JSON.parse(data);
          if (jsonData.events) {
            currentEventsLength = jsonData.events.Events.length;
          }
          getNewEvents(message, ops, currentEventsLength, jsonData);
        } else {
          console.log("data non è un json");
        }

        if (index !== -1) {
          sockets[index].write(
            `Il server ha ricevuto il messaggio di ${sock.remoteAddress}:${sock.remotePort}`
          );
          //if (data.includes(interruptCode)) sockets[index].destroy();
        }
        data = "";
      } else {
        data += chunk;
      }
    });

    sock.on("close", function () {
      console.log(
        "SERVER-CLOSED: " + sock.remoteAddress + ":" + sock.remotePort
      );
      let index = sockets.findIndex(function (element) {
        return (
          element.remoteAddress === sock.remoteAddress &&
          element.remotePort === sock.remotePort
        );
      });
      if (index !== -1) sockets.splice(index, 1);
    });

    // error handling
    sock.on("error", function (e) {
      if (e.code === "ECONNRESET") {
        console.log("====================================");
        console.log("ECONNRESET da gestire");
        console.log("====================================");
      }
      console.log("Socket error: ", e);
    });
  });

  server.on("close", function () {
    console.log("TCP Server stopped running on port " + port + ".");
  });
}

function getNewEvents(message, ops, currentEventsLength, jsonData) {
  /*if (jsonData.gameData.gameTime < 900) {
    if (Math.floor(Math.random() * 1001) === 999) {
      require("../commands/play-audio.js").execute(
        message,
        ["cosa-indossi"],
        ops
      );
    }
  }*/
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

function isJson(item) {
  console.log("====================================");
  console.log(item);
  console.log("====================================");
  item = typeof item !== "string" ? JSON.stringify(item) : item;

  try {
    item = JSON.parse(item);
  } catch (e) {
    return false;
  }

  if (typeof item === "object" && item !== null) {
    return true;
  }

  return false;
}

module.exports = {
  startListening(message, ops) {
    server.listen(port, host, () => {
      console.log("TCP Server is running on port " + port + ".");
    });
    connectionHandler(message, ops);
  },
  stopListening() {
    server.close();
    /*currentEventsLength = 0;
    eventsLength = 0;
    activePlayerIndex = 0;
    eventQueue = [];*/
  },
};
