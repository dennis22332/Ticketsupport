const { EmbedBuilder, Client, CommandInteraction } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Pong',
    run: async (client, interaction, args) => {
        const embed = new EmbedBuilder()
            .setDescription(`🏓 ${client.ws.ping}ms!`)
            .setColor('Green')
        interaction.reply({
            embeds: [embed]
        })
    }
}
