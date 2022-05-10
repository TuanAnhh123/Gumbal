const { MessageAttachment } = require('discord.js');
const { MessageActionRow , MessageEmbed } = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction,client) {
        const guild = interaction.guild.id;

        /*if(interaction.isButton())
        {
            if(interaction.customId == 'welcome-channel')
            {
                interaction.reply('ừ');
            }
        }*/

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