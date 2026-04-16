require('dotenv').config();
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Get a bot invite link'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Invite Doorman')
            .setDescription('Click the link below to add Doorman to your server!')
            .setColor(0x7F77DD)
            .setThumbnail(interaction.client.user.displayAvatarURL())
            .addFields(
                {
                    name: 'Invite Link',
                    value: `[Click here to invite!](https://discord.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=16796688&scope=bot+applications.commands)`,
                    inline: false,
                },
                {
                    name: 'What does Doorman do?',
                    value: 'Doorman watches a voice channel and automatically creates a private channel for each user that joins, then deletes it when they leave.',
                    inline: false,
                }
            )
            .setFooter({
                text: `Requested by ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL(),
            })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};