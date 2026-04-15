require('dotenv').config();

const { Client, GatewayIntentBits, Guild, ActivityType, Collection } = require('discord.js');
const fs = require('fs');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

// -- COMMAND HANDLER
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(f => f.endsWith('.js'));

for (const file of commandFiles) {
    const cmd = require(`./commands/${file}`);
    client.commands.set(cmd.data.name, cmd);
}

// -- EVENT HANDLER
const eventFiles = fs.readdirSync('./events').filter(f => f.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    const method = event.once ? 'once' : 'on';
    client[method](event.name, (...args) => event.execute(...args, client));
}

client.login(process.env.TOKEN);