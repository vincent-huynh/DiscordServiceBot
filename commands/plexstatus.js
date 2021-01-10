const client = require('../plex.js');

function plexStatus(message) {
    client.query('/servers').then(function(result) {
      const { name } = result.MediaContainer.Server[0];
      const plexStatusEmbed = {
        color: 0x00ffff,
        title: 'Plex Server Status',
        author: {
            name: 'Cintay\'s Service Bot',
            icon_url: 'https://imgur.com/l6LumOx.png',
        },
        description: `${name} should be up and running...`,
        thumbnail: {
            url: 'https://imgur.com/t2EQfeV.png',
        },
        timestamp: new Date(),
        footer: {
            text: 'Want in on Plex? Message @cintay#2857 for info',
        },
    };
      message.channel.send({ embed: plexStatusEmbed });
    }, function(err) {
      message.channel.send('I think Plex is down. Notifying @cintay#2857...');
      message.client.users.fetch('162694154525081602').then((user) => {
        user.send(`Plex is down :( Link: ${message.url}`);
      });
      console.error('Could not connect to server', err);
    });
}

module.exports = {
    name: 'plexstatus',
    description: 'Check plex server status',
    execute(message) {
        plexStatus(message);
    },
};