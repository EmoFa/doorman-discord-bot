const { ActivityType } = require('discord.js');

module.exports = {
    name: 'clientReady',
    once: true,

    execute(client) {
        client.user.setActivity({name: '/set-channel to start', type: ActivityType.Listening});
        console.log(`Logged in as ${client.user.tag}`);
    },
};