const axios = require('axios').default;
const { minecraftserverip } = require('../config.json');
const mcping = require('mcping-js');

const mcserver = new mcping.MinecraftServer(minecraftserverip, 25565);
const timeout = 1000;
const versionNumber = 754;
async function getStatus(message) {
    try {
        message.channel.send('Fetching data...');
        mcserver.ping(timeout, versionNumber, (err, res) => {
            if(err) {
                message.client.users.fetch('162694154525081602').then((user) => {
                    user.send(`Minecraft Server is down :( Link: ${message.url}`);
                });
                const serverStatusEmbed = {
                    color: 0x00ffff,
                    title: 'Minecraft Server Status',
                    author: {
                        name: 'Cintay\'s Service Bot',
                        icon_url: 'https://imgur.com/l6LumOx.png',
                    },
                    description: 'Yikes, sent message to Cintay',
                    thumbnail: {
                        url: 'https://imgur.com/t2EQfeV.png',
                    },
                    timestamp: new Date(),
                    footer: {
                        text: 'This server is whitelisted. Message Cintay if interested.',
                    },
                };
                message.channel.send({ embed: serverStatusEmbed });
            }
            if(res) {

                const { players, version, description } = res;
                const { max, online } = players;
                const playerList = online > 0 ?
                players.sample.map(player => player.name) : false;
                const serverStatusEmbed = {
                    color: 0x00ffff,
                    title: 'Minecraft Server Status',
                    author: {
                        name: 'Cintay\'s Service Bot',
                        icon_url: 'https://imgur.com/l6LumOx.png',
                    },
                    description: 'Online: TRUUUU',
                    thumbnail: {
                        url: 'https://imgur.com/t2EQfeV.png',
                    },
                    fields: [
                        {
                            name: `Currently Online (${online}/${max}):`,
                            value: `${playerList || 'Nobody\'s Online :('}`,
                        },
                        {
                            name: 'Server Info',
                            value: `MC Version: ${version.name}\n${description.text}`,
                        },
                    ],
                    timestamp: new Date(),
                    footer: {
                        text: 'This server is whitelisted. Message Cintay if interested.',
                    },
                };
                message.channel.send({ embed: serverStatusEmbed });
            }
        });
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
