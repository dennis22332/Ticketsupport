const client = require('../index');
const config = require("../config/config.json");
const { REST, Routes } = require('discord.js');
const fs = require('fs')
const colors = require('colors');

module.exports = async () => {
    console.log("----------------------------------------".yellow);

    const slash = [];

    fs.readdirSync('./src/slashCommands/').forEach(dir => {
        const commands = fs.readdirSync(`./src/slashCommands/${dir}`).filter(file => file.endsWith('.js'));
        for (let file of commands) {
            let pull = require(`../slashCommands/${dir}/${file}`);

            if (pull.name) {
                slash.push(pull)
                client.slash.set(pull.name, pull);
                console.log(`File caricato : ${pull.name}`.green);

            } else {
                console.log(`Non posso caricare il file ${file}, modulo mancante.`.red)
                continue;
            }
        }
    });

    if (!config.CLIENTID) {
        console.log("Devi inserire un client id valido all'interno del config".red + "\n");
        return process.exit()
    };

    const rest = new REST({ version: '10' }).setToken(config.TOKEN);

    await rest.put(
        Routes.applicationCommands(config.CLIENTID),
        { body: slash }
    ).then(() => {
        console.log("----------------------------------------".magenta);
        console.log(`Tutti i comandi sono stati correttamente caricati`.magenta.bold);
        console.log("----------------------------------------".magenta);
    })
}
