const { MOVIEDB_API_KEY } = require('../config.json');
const axios = require('axios').default;
const imgURL = 'https://image.tmdb.org/t/p/w500';
const Discord = require('discord.js');

const emojiNext = '➡';
const emojiPrevious = '⬅';
const emojiOne = '1️⃣';
const emojiTwo = '2️⃣';
const emojiThree = '3️⃣';
const emojiFour = '4️⃣';
const emojiFive = '5️⃣';

const reactionsList = [
    emojiPrevious,
    emojiNext,
    emojiOne,
    emojiTwo,
    emojiThree,
    emojiFour,
    emojiFive,
];

const time = 60000;

async function plexRequest(message, args) {
    const desc = args.join(' ');
    let queryTerm;
    if (args.length > 1) {
        queryTerm = args.join('%20');
    } else {
        queryTerm = args[0];
    }
    const mdbURL = `https://api.themoviedb.org/3/search/multi?api_key=${MOVIEDB_API_KEY}&query=${queryTerm}&page=1`;
    axios.get(mdbURL).then(function(response) {
        const trimmedSearch = response.data.results.slice(0, 5);
        const embedList = trimmedSearch.map((med, index) => (
            new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle('Which are you talking about?')
            .setAuthor('Cintay\'s Service Bot', 'https://imgur.com/l6LumOx.png')
            .setDescription(`Search results for "${desc}"`)
            .setThumbnail('https://imgur.com/t2EQfeV.png')
            .addField(`${med.media_type === 'movie' ? med.title : med.media_type === 'tv' ? med.name : desc} (${med.media_type === 'movie' ? med.release_date : med.media_type === 'tv' ? med.first_air_date : ''})`, 
            `${med.overview || 'No available description'}`)
            .setImage(`${imgURL}${med.poster_path}`)
            .setFooter(`Want in on Plex? Message @cintay#2857 for info. | Page ${index + 1}/${trimmedSearch.length}`)
        ));
        sendList(message, embedList);
    })
    .catch(function(err) {
        console.error(err);
    });
}
function filter(reaction, user) {
    return (!user.bot) && (reactionsList.includes(reaction.emoji.name));
}

function onCollect(emoji, message, i, embedList) {
    if ((emoji.name === emojiPrevious) && (i > 0)) {
        message.edit(embedList[--i]);
    } else if ((emoji.name === emojiNext) && (i < embedList.length - 1)) {
        message.edit(embedList[++i]);
    } else if ((emoji.name === emojiNext) && (i === embedList.length - 1)) {
        message.edit(embedList[i = 0]);
    } else if ((emoji.name === emojiPrevious) && (i === 0)) {
        message.edit(embedList[i = embedList.length - 1]);
    } else if (reactionsList.includes(emoji.name)) {
        sendToCintay(message, embedList, emoji, i);
    }
    return i;
}
function sendToCintay(message, embedList, emoji, i) {
    message.client.users.fetch('162694154525081602').then((user) => {
        user.send(`Plex Request, Selected ${emoji} Link: ${message.url}`);
        user.send(embedList[i]);
    });
    message.channel.send('Requested.');
}
function createCollectorMessage(message, embedList) {
    let i = 0;
    const collector = message.createReactionCollector(filter, { time });
    collector.on('collect', r => {
        i = onCollect(r.emoji, message, i, embedList);
    });
}

function sendList(message, embedList) {
    message.channel.send(embedList[0])
    .then(msg => msg.react(emojiPrevious))
    .then(msgReaction => msgReaction.message.react(emojiNext))
    .then(msgReaction => msgReaction.message.react(emojiOne))
    .then(msgReaction => msgReaction.message.react(emojiTwo))
    .then(msgReaction => msgReaction.message.react(emojiThree))
    .then(msgReaction => msgReaction.message.react(emojiFour))
    .then(msgReaction => msgReaction.message.react(emojiFive))
    .then(msgReaction => createCollectorMessage(msgReaction.message, embedList));
}

module.exports = {
    name: 'pr',
    description: 'Request a movie, show, or whatever.',
    execute(message, args) {
        plexRequest(message, args);
    },
};