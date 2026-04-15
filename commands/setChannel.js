const { SlashCommandBuilder } = require('discord.js');
const { getWatchedChannels, saveWatchedChannels } = require('../trackedChannels.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-channel')
        .setDescription('Choose the channel you want the bot to watch.')
        .addChannelOption(option =>
            option
                .setName('target-channel')
                .setDescription('The channel to watch.')
                .setRequired(true)
        ),

    async execute(interaction) {
    const channel = interaction.options.getChannel('target-channel');
    const guild = interaction.guild;
    const watchedChannels = getWatchedChannels();
    const existing = watchedChannels.find(item => item.guildId === guild.id);

    if(!existing) {
        watchedChannels.push({ guildId: guild.id, channelId: channel.id });
        saveWatchedChannels(watchedChannels);
        await interaction.reply(`Now watching ${channel}!`);
    } else if(existing.channelId !== channel.id) {
        existing.channelId = channel.id;
        saveWatchedChannels(watchedChannels);
        await interaction.reply(`Updated to ${channel}!`);
    } else {
        await interaction.reply(`Already watching ${channel}!`);
    }
}
};