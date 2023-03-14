const { Client, CommandInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, AttachmentBuilder, ApplicationCommandOptionType, ChannelType } = require('discord.js');

module.exports = {
    name: 'ticket',
    description: "Ticket canale",
    clientPermissions: ["Administrator"],
    options: [
        {
            name: "channel",
            description: "Ticket",
            type: ApplicationCommandOptionType.Channel,
            required: true
        },
        {
            name: "category",
            description: "Ticket",
            type: ApplicationCommandOptionType.Channel,
            required: true
        }
    ],
    run: async (client, interaction, args) => {
        const data = interaction.options.getChannel("channel");
        const data2 = interaction.options.getChannel("category")
        const channel = interaction.guild.channels.cache.get(`${data.id}`);
        const category = interaction.guild.channels.cache.get(`${data2.id}`)

        if (!channel.viewable) {
            return interaction.reply({
                content: "Canale non visibile a me",
                ephemeral: true
            })
        }

        if (category.type !== ChannelType.GuildCategory) {
            return interaction.reply({
                content: "La categoria inserita non è valida",
                ephemeral: true
            })
        }

        if (!category.viewable) {
            return interaction.reply({
                content: "Categoria non visibile a me",
                ephemeral: true
            })
        }

        if (!category.permissionsFor(client.user.id).has("ManageChannels")) {
            return interaction.reply({
                content: "Il bot non ha abbastanza permessi per creare i ticket.",
                ephemeral: true
            })
        }
        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`ticket-setup-${interaction.guild.id}-${category.id}`)
                    .setLabel('Create Ticket')
                    .setStyle(ButtonStyle.Danger),
            );

        const attachments = new AttachmentBuilder()
            .setFile("assets/ticket.png")

        await interaction.reply({
            content: `Il canale per i ticket è statp settato nel canale ${channel}.`,
            ephemeral: true
        })

        channel.send({
            components: [button],
            files: [attachments]
        })
    }
}