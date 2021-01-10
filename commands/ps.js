const client = require('../plex.js');

function plexSearch(message, args) {
    const queryTerm = args.join(' ');
    message.channel.send('Searching... I\'ll show the top three results. Use exact titles for best results');
    client.query(`/search?query=${queryTerm}`).then(function(result) {
        const searchResultsPreTrim = result.MediaContainer.Metadata;
        if (searchResultsPreTrim) {
            const searchResults = searchResultsPreTrim.slice(0, 3);
            const embeds = searchResults.map(med => ({
                name: `${med.title} (${med.year})`,
                value: med.summary,
            }));
            const finalEmbed = {
                color: 0x00ffff,
                title: 'MotherlordPLEX Search Results',
                author: {
                    name: 'Cintay\'s Service Bot',
                    icon_url: 'https://imgur.com/l6LumOx.png',
                },
                description: `Search results for "${queryTerm}"`,
                thumbnail: {
                    url: 'https://imgur.com/t2EQfeV.png',
                },
                fields: embeds,
                timestamp: new Date(),
                footer: {
                    text: 'Want in on Plex? Message @cintay#2857 for info.',
                },
            };

            message.channel.send({ embed: finalEmbed });
        } else {
            const finalEmbed = {
                color: 0x00ffff,
                title: 'Whoops! Looks like that\'s not on my Plex',
                author: {
                    name: 'Cintay\'s Service Bot',
                    icon_url: 'https://imgur.com/l6LumOx.png',
                },
                description: `You can request this with \`%c pr ${queryTerm}\``,
                thumbnail: {
                    url: 'https://imgur.com/t2EQfeV.png',
                },
                timestamp: new Date(),
                footer: {
                    text: 'Want in on Plex? Message @cintay#2857 for info.',
                },
            };
            message.channel.send({ embed: finalEmbed });
        }

    }, function(err) {
        console.error('Search error: ', err);
    });
}

module.exports = {
    name: 'ps',
    description: 'Search Plex for a media entry',
    execute(message, args) {
        plexSearch(message, args);
    },
};