const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('rickroll')
        .setDescription('Rickroll someone')
        .addUserOption(options => options.setName('user').setDescription('The user you want')),
    async execute(interaction,client) {

        const user = interaction.options.getUser('user');

        if(!user) 
        {
            const embed = {
                author: {
                    name: 'Error',
                    icon_url: 'https://cdn.discordapp.com/emojis/965142498416685106.gif?size=96&quality=lossless',
                },
                description : '<:false:964905677518696548> You need to choose the user.',
                color : 'BLUE',
                timestamp: new Date(),
                footer: {
                    text: `${interaction.user.tag}`,
                    icon_url: `${interaction.user.displayAvatarURL({dynamic : true})}`,
                },
            }
            return interaction.reply({embeds : [embed]});
        }

        const embeds = {
            "color" : "GREEN",
            "description" : `<:hop:968430225094496256>・<@${user.id}> You won the previous giveaway.\n\n<:nitro:968430225367126027>・Prize : **Nitro classic yearly**.\n\n<:qua:968430225018978304>・Click the button below to claim your prize.`,
            "footer" : {
                "text" : `${user.tag}`,
                icon_url: `${user.displayAvatarURL({dynamic : true})}`,
            },
            "timestamp" : new Date(),
        }
        const row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton().setLabel('Nitro').setEmoji('<:nitro_boost:968430225073532969>').setStyle('LINK').setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ'),
        )
        interaction.reply({content : `🎉 __GIVEAWAY ENDED__ 🎉` , embeds : [embeds] , components : [row]});
    }
};