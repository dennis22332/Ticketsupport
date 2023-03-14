const client = require('../../index');
const colors = require('colors');

module.exports = {
    name: "ready"
};

client.once('ready', async () => {
    console.log(`${client.user.tag} Online.`)
})
