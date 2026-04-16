const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, MessageFlags, ChannelType } = require('discord.js');
const { getWatchedChannels, saveWatchedChannels } = require('../trackedChannels.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-channel')
        .setDescription('Choose the channel you want the bot to watch.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addChannelOption(option =>
            option
                .setName('target-channel')
                .setDescription('The channel to watch.')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildVoice)
        ),

    async execute(interaction) {
        const channel = interaction.options.getChannel('target-channel');
        const guild = interaction.guild;
        const watchedChannels = getWatchedChannels();
        const existing = watchedChannels.find(item => item.guildId === guild.id);

        if(!existing) {
            watchedChannels.push({ guildId: guild.id, channelId: channel.id });
            saveWatchedChannels(watchedChannels);

            const embed = new EmbedBuilder()
                    .setTitle('Now watching!')
                    .setDescription(`Doorman will now watch ${channel} and create custom channels for users that join.`)
                    .setColor(0x1D9E75)
                    .setFooter({
                        text: `Set by ${interaction.user.username}`,
                        iconURL: interaction.user.displayAvatarURL(),
                    })
                    .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } else if(existing.channelId !== channel.id) {
            existing.channelId = channel.id;
            saveWatchedChannels(watchedChannels);

            const embed = new EmbedBuilder()
                    .setTitle('Channel updated!')
                    .setDescription(`Doorman will now watch ${channel} instead.`)
                    .setColor(0x378ADD)
                    .setFooter({
                        text: `Updated by ${interaction.user.username}`,
                        iconURL: interaction.user.displayAvatarURL(),
                    })
                    .setTimestamp();

            await interaction.reply({embeds: [embed] });
        } else {
            const embed = new EmbedBuilder()
                    .setTitle('Already watching!')
                    .setDescription(`Doorman is already watching ${channel} — no changes made.`)
                    .setColor(0xBA7517)
                    .setFooter({
                        text: `Requested by ${interaction.user.username}`,
                        iconURL: interaction.user.displayAvatarURL(),
                    })
                    .setTimestamp();

            await interaction.reply({embeds: [embed], flags: MessageFlags.Ephemeral});
        }
    },
};