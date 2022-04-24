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

        const icons = `https://discord.gg/gGpQurZHbz`;

        const embeds = {
            "color" : "GREEN",
            "description" : `<a:giveaway:967703458218119168>・<@${user.id}> You won the previous giveaway.\n\n<:nitro:967702931707133962>・Prize : **Nitro classic yearly**.\n\n<:gift_1:967703691031371827>・Click [**https://discord.gift/abdhsHGsd**](https://www.youtube.com/watch?v=dQw4w9WgXcQ) to claim your prize.`,
            "footer" : {
                "text" : `${user.tag}`,
                icon_url: `${user.displayAvatarURL({dynamic : true})}`,
            },
            "timestamp" : new Date(),
        }
        interaction.reply({content : `🎉 __GIVEAWAY ENDED__ 🎉` , embeds : [embeds]});
    }
};