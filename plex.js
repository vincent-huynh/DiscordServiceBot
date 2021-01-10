const { PLEX_IP, PLEX_USER, PLEX_PASS } = require('./config.json');
const PlexAPI = require('plex-api');

const client = new PlexAPI({
    hostname: PLEX_IP,
    username: PLEX_USER,
    password: PLEX_PASS,
});

module.exports = client;