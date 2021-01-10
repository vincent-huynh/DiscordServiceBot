const axios = require('axios').default;
const { mcapi, minecraftserverip } = require('../config.json');

async function getStatus(message) {
    try {
        message.channel.send('Fetching data...');
        const response = await axios.get(mcapi + minecraftserverip);
        if (response) {
            const { data } = response;
            const { online, players, version, hostname } = data;

            const serverStatusEmbed = {
                color: 0x00ffff,
                title: 'Minecraft Server Status',
                author: {
                    name: 'Cintay\'s Service Bot',
                    icon_url: 'https://imgur.com/l6LumOx.png',
                },
                description: `Online: ${online ? 'TRUUUU' : 'nope, yikes'}`,
                thumbnail: {
                    url: 'https://imgur.com/t2EQfeV.png',
                },
                fields: [
                    {
                        name: `Currently Online (${players.online}):`,
                        value: `${players.list || 'Nobody\'s Online :('}`,
                    },
                    {
                        name: 'Server Info',
                        value: `MC Version: ${version} \nIP: ${hostname}`,
                    },
                ],
                timestamp: new Date(),
                footer: {
                    text: 'This server is whitelisted. Message Cintay if interested.',
                },
            };

            message.channel.send({ embed: serverStatusEmbed });
        }

    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    name: 'mcstatus',
    description: 'Gets the status of the minecraft server',
    execute(message) {
        getStatus(message);
    },
};