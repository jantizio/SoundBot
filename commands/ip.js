var http = require("http");
module.exports = {
  name: "ip",
  description: "ip di piske",
  execute(message) {
    var options = {
      host: "muccaserver.altervista.org",
      path: "/ip_piske",
    };
    var request = http.request(options, function (res) {
      var data = "";
      res.on("data", function (chunk) {
        data += chunk;
      });
      res.on("end", function () {
        message.channel.send("l'indirizzo ip di pische è " + data);
      });
    });
    request.on("error", function (e) {
      console.log(e.message);
    });
    request.end();
  },
};
