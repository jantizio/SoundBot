const events = new Map();

require('fs')
  .readdirSync('./lib/eventi')
  .forEach((file) =>
    events.set(file.split('.')[0], require(`./eventi/${file}`))
  );

module.exports = {
  getStrategy: function (nome) {
    return events.get(nome) ?? events.get('Default');
  },
};
