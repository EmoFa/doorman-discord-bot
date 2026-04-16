const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require("discord.js");
const { getWatchedChannels } = require('../trackedChannels.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('current-channel')
        .setDescription('View the current channel the bot is watching.'),

    async execute(interaction) {
        const guild = interaction.guild;
        const watchedChannels = getWatchedChannels();
        const existing = watchedChannels.find(item => item.guildId === guild.id);

        if (existing) {
            const embed = new EmbedBuilder()
                .setTitle('Currently watching')
                .setDescription(`Doorman is currently watching <#${existing.channelId}>.`)
                .setColor(0x1D9E75)
                .setThumbnail(interaction.client.user.displayAvatarURL())
                .addFields({
                    name: 'Channel ID',
                    value: existing.channelId,
                    inline: false,
                })
                .setFooter({
                    text: `Requested by ${interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL(),
                })
                .setTimestamp();

            await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
        } else {
            const embed = new EmbedBuilder()
                .setTitle('Not watching a channel')
                .setDescription('Doorman is not watching any channel yet. Use `/set-channel` to set one up.')
                .setColor(0xBA7517)
                .setThumbnail(interaction.client.user.displayAvatarURL())
                .setFooter({
                    text: `Requested by ${interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL(),
                })
                .setTimestamp();

            await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
        }
    },
};