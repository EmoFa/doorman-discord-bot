const { ChannelType } = require('discord.js');
const { getWatchedChannels, getCreatedChannels, saveCreatedChannels } = require('../trackedChannels.js');

module.exports = {
    name: 'voiceStateUpdate',
    once: false,

    async execute(oldState, newState) {
        const watchedChannels = getWatchedChannels();
        const createdChannels = getCreatedChannels();

        if(watchedChannels.some(item => item.guildId === newState.guild.id && item.channelId === newState.channelId)) {
            const channel = await newState.guild.channels.create({
                name: `${newState.member.user.username}'s channel`,
                type: ChannelType.GuildVoice,
                parent: newState.channel.parentId,
            });
            await newState.member.voice.setChannel(channel.id);
            createdChannels.push(channel.id);
            saveCreatedChannels(createdChannels);
        }

        if(
            createdChannels.includes(oldState.channelId) && 
            oldState.channel.members.size === 0 && 
            !watchedChannels.some(item => item.channelId === oldState.channelId)
        ) {
            await oldState.guild.channels.delete(oldState.channelId);
            createdChannels.splice(createdChannels.indexOf(oldState.channelId), 1);
            saveCreatedChannels(createdChannels);
        }
    },
};