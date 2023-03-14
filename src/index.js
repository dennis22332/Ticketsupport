const discord = require('discord.js')
const { Client, Partials, Collection } = require('discord.js');
const colors = require('colors');
const config = require('./config/config.json')

const client = new Client({
    intents: [
        "Guilds",
        "GuildMessages",
        "GuildPresences",
        "GuildMessageReactions",
        "DirectMessages",
        "MessageContent",
        "GuildVoiceStates"
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
        Partials.Reaction
    ]
})

if (!config.TOKEN) {
    console.log("MTA4NTMwMDgwMTAwNzc4ODA0Mg.GY0itt.hIfwLXPwLpZFm7WJQ9Z4QPaQS3RZAVy2THqE9M")
    return process.exit();
};

client.commands = new Collection()
client.events = new Collection()
client.slash = new Collection()
client.aliases = new Collection()
client.config = require("./config/config.json")

module.exports = client;

["event", "slash"].forEach(file => {
    require(`./handlers/${file}`)(client);
});

client.login(config.TOKEN)
    .catch((err) => {
        process.exit();
    })
