var net = require("net");

module.exports = {
  name: "client",
  description: "simula un client",
  args: true,
  execute(message, args) {
    try {
      var client = new net.Socket();
      client.connect(31415, "127.0.0.1", function () {
        console.log("DISCORD-CLIENT: connected");
        client.write(`${args.join(" ")}`);
      });

      client.on("data", function (data) {
        console.log("DISCORD-CLIENT Received: " + data);
        //client.destroy(); // kill client after server's response
      });

      client.on("close", function () {
        console.log("DISCORD-CLIENT: connection closed");
      });
    } catch (error) {
      console.log("errore!");
      console.error(error);
    }
  },
};
