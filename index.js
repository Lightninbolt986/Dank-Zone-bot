const Discord = require('discord.js');
const client = new Discord.Client({
    allowedMentions: {
        parse: ['users', 'roles']
    },
    repliedUser: true,
    intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_PRESENCES', 'GUILD_VOICE_STATES', 'DIRECT_MESSAGES'],
    partials: ['CHANNEL']
})
require('dotenv').config()
const token = process.env.token
client.events = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.commands = new Discord.Collection();
['event_handler', 'slash_command_handler','command_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});
const mongoose = require('mongoose')
mongoose
    .connect(
        process.env.MONGODB_srv, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }
    )
    .then(() => {
        console.log('Connected to mongoosedb');
    })
    .catch(err => {
        console.log(err);
    });
process.on('unhandledRejection', (err) => {
    console.log(err)
})

client.login(token);