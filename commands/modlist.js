const axios = require('axios').default;
const { mcapi, minecraftserverip } = require('../config.json');

async function getMods(message) {
    try {
        const response = await axios.get(mcapi + minecraftserverip);
        if (response) {
            const { data } = response;
            const { mods } = data;

            const modEmbed = {
                color: 0x00ffff,
                title: 'Minecraft Mod List',
                author: {
                    name: 'Cintay\'s Service Bot',
                    icon_url: 'https://imgur.com/l6LumOx.png',
                },
                description: `${mods.names}`,
                footer: {
                    text: 'This server is whitelisted. Message Cintay if interested.',
                },
            };
            message.channel.send({ embed: modEmbed });
        }

    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    name: 'modlist',
    description: 'Gets the mods of the minecraft server',
    execute(message) {
        getMods(message);
    },
};