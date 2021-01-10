function help(message) {
    const helpEmbed = {
        color: 0x00ffff,
        title: 'Commands',
        author: {
            name: 'Cintay\'s Service Bot',
            icon_url: 'https://imgur.com/l6LumOx.png',
        },
        description: 'All commands start with `%c`. Here are the available commands.',
        thumbnail: {
            url: 'https://imgur.com/t2EQfeV.png',
        },
        fields: [
            {
                name: '%c mcstatus',
                value: 'Checks if the server is down and shows players currently online.',
            },
            {
                name: '%c modlist',
                value: 'Displays all of the mods currently on the server.',
            },
            {
                name: '%c plexstatus',
                value: 'Checks if Plex is online',
            },
            {
                name: '%c ps <MEDIA TITLE>',
                value: 'Checks if a certain media is already on the Plex server. \nExample: `%c ps Captain America`',
            },
            {
                name: '%c pr <MEDIA TITLE>',
                value: 'Make a Plex request. Use the reactions to browse through possible options, then click on a reaction to choose the media you want added. **Please check if it\'s on Plex already with** `%c ps`',
            },
        ],
        timestamp: new Date(),
        footer: {
            text: 'Bugs? Let me know! cintay#2857',
        },
    };
      message.channel.send({ embed: helpEmbed });
}

module.exports = {
    name: 'help',
    description: 'Display the current list of commands and some descriptions of them.',
    execute(message) {
        help(message);
    },
};