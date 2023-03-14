const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const client = require('../../index');

module.exports = {
    name: "interactionCreate"
};

client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (!interaction.type == 2) return;

    const command = client.slash.get(interaction.commandName);

    if (!command) return;

    try {
        if (command.ownerOnly) {
            if (!client.config.OWNER.includes(interaction.user.id)) {
                return interaction.reply({
                    content: `**${interaction.member}** Non hai i permessi`,
                    ephemeral: true
                })
            }
        }

        if (command.userPermissions) {
            const embed = new EmbedBuilder()
                .setTitle(`Permessi richiesti`)
                .setDescription(`${client.emoji.wrong} ${interaction.user} Non hai il permesso.`)
                .addFields({ name: `Permessi richiesti`, value: [command.userPermissions].join(", ") || [].join(", ") })
                .setColor(`#2f3136`)
            if (!interaction.member.permissions.has(PermissionsBitField.resolve(command.userPermissions || []))) return interaction.reply({
                embeds: [embed]
            })
        }

        if (command.botPermissions) {
            const embed = new EmbedBuilder()
                .setTitle(`Permessi richiesti`)
                .setDescription(`${client.emoji.wrong} Non ho abbastanza permessi per eseguire questo comando`)
                .addFields({ name: `Permessi di cui ho bisogno`, value: [command.botPermissions].join(", ") || [].join(", ") })
                .setColor(`#2f3136`)
            if (!interaction.channel.permissionsFor(client.user.id).has(PermissionsBitField.resolve(command.botPermissions || []))) return interaction.reply({
                embeds: [embed]
            })
        }

        await command.run(client, interaction, interaction.options)
    } catch (err) {
        console.log(err.stack)
    }
})