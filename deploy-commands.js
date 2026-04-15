require('dotenv').config();

const { REST, Routes } = require('discord.js');
const fs = require('fs');

const commands = fs.readdirSync('./commands').filter(f => f.endsWith('.js')).map(f => {
    const cmd = require(`./commands/${f}`);
    return cmd.data.toJSON();
});

const rest = new REST().setToken(process.env.TOKEN);

(async () => {
    try {
        console.log(`Deploying ${commands.length} command(s)...`);
        await rest.put(
            Routes.applicationCommands(
                process.env.CLIENT_ID,
            ),
            { body: commands },
        );

        console.log('Commands deployed successfuly!');
    } catch(err) {
        console.error(err);
    }
})();