module.exports = {
    name: 'interactionCreate',
    once: false,

    async execute(interaction, client) {
        const command = client.commands.get(interaction.commandName);
        if(!command) return;

        try {
            await command.execute(interaction);
        } catch (err) {
            console.error(err);
            await interaction.reply({
                content: 'Something went wrong!',
                ephemeral: true,
            });
        }
    },
};