module.exports = {
	name: 'interactionCreate',
	async execute(interaction,client) {
        if(interaction.isButton())
        {
            if(interaction.customId == 'moderaction-help')
            {
                interaction.reply("ừ");
            }
        }
		if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
	},
};