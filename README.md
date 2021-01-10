# Discord Service Bot

This is a Discord Service Bot I built to check up on some of the cool service I run for my friends. This bot allows my friends, who primarily use Discord to communicate, to check the statuses of my Minecraft and Plex servers. In addition, there are commands that allow my friends to check if a certain media (movie, tv show, etc.) is already on my Plex server `%c ps <MEDIA TITLE>` or make a request if it isn't `%c pr <MEDIA TITLE>`.

In case a user is making a request, I used TheMovieDB's API to search for the title they asked for. This helps narrow down to the proper media they are referring to. Using Discord reactions, the user can shift through the top 5 results of this search, then select the relevant media using the reaction emojis (1 - 5). This sends me a DM with the relevant embed and a link to the request (so that I can confirm if its accuracy).

## Getting Started

If you want to run this yourself, you should be hosting these services (otherwise you can edit the code to exclude these functionalities):

- [Plex Media Server](https://plex.tv)
- [Minecraft Server](https://www.minecraft.net/)

### Install

You can probably use `npm` to install all of the requirements.

```
npm install
```

### Configuration

You need to create a `config.json` file in your main file directory with the following information:

```
{
    "prefix": "<YOUR PREFIX>",
    "token": "<YOUR DISCORD TOKEN>",
    "minecraftserverip": "<YOUR PUBLIC MINECRAFT IP>",
    "mcapi": "https://api.mcsrvstat.us/2/",
    "PLEX_IP": "<PLEX IP (local IP works if you're on LAN)>",
    "PLEX_USER": "<PLEX USERNAME>",
    "PLEX_PASS": "<PLEX PASSWORD",
    "MOVIEDB_API_KEY": "<MovieDB API Key>"
}
```

## Run it

Run it with `npm run start`.
