const { SlashCommandBuilder } = require("discord.js");
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
            await interaction.reply(`I am watching <#${existing.channelId}>!`);
        } else {
            await interaction.reply('I am not watching a channel :(');
        }
    },
};