const net = require("net");
const port = 31415;
const host = "0.0.0.0";
const interruptCode = "taglia";

module.exports = function () {
  const server = net.createServer();
  server.listen(port, host, () => {
    console.log("TCP Server is running on port " + port + ".");
  });
  let sockets = [];

  server.on("connection", function (sock) {
    console.log(
      "SERVER-CONNECTED: " + sock.remoteAddress + ":" + sock.remotePort
    );

    sockets.push(sock);
    let data = "";
    let jsonData;

    // potrei aggiungere un sock.on("ready")
    // data handling
    /*sock.on("data", function (data) {
      console.log(
        `SERVER-DATA from ${sock.remoteAddress}:${sock.remotePort}: ${data}`
      );

      let index = sockets.findIndex(function (element) {
        return (
          element.remoteAddress === sock.remoteAddress &&
          element.remotePort === sock.remotePort
        );
      });
      if (index !== -1) {
        sockets[index].write(
          "Il server ha ricevuto il messaggio di " + sock.remotePort
        );
        if (data.includes(interruptCode)) sockets[index].destroy();
      }
    });*/
    sock.on("data", (chunk) => {
      data += chunk;
    });

    sock.on("end", function () {
      console.log(
        `SERVER-DATA from ${sock.remoteAddress}:${sock.remotePort}: ${data}`
      );

      let index = sockets.findIndex(function (element) {
        return (
          element.remoteAddress === sock.remoteAddress &&
          element.remotePort === sock.remotePort
        );
      });

      if (isJson(data)) jsonData = JSON.parse(data);
      jsonData ? console.log(jsonData) : console.log(data);
      if (index !== -1) {
        sockets[index].write(
          `Il server ha ricevuto il messaggio di ${sock.remoteAddress}:${sock.remotePort}`
        );
        if (data.includes(interruptCode)) sockets[index].destroy();
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
      console.log("Socket error: ", e);
    });
  });
  //
};

function isJson(item) {
  item = typeof item !== "string" ? JSON.stringify(item) : item;
  console.log(item);

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
