const { Events, ActivityType } = require('discord.js');
// const { generateDependencyReport } = require('@discordjs/voice');
const { prefix } = require('../config.json');
// When the client is ready, run this code (only once)
module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);

    client.user.setPresence({
      activities: [{ name: `${prefix}help`, type: ActivityType.Listening }],
      status: 'online',
    });
    client.jantizio = await client.users.fetch('270972425787670529');

    // require("./lib/tcpserver")();
    // console.log(generateDependencyReport());
  },
};
