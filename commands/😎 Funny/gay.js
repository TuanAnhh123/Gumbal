const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gay')
        .setDescription('Make a user more gay')
        .addUserOption(options => options.setName('user').setDescription('The user you want')),
    async execute(interaction) {
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
        else 
        {
            fetch(`https://some-random-api.ml/canvas/gay?avatar=${user.displayAvatarURL({dynamic : true , format : 'png'})}&key=s1HpWsm7B8J56EZoZjwZsb7nhbZhYqZmRezxQGznVS7xC60Vo9dvGoDrZd8NKzCZ`)
                .then(async response => Buffer.from(await response.arrayBuffer()))
                .then(data => {
                    interaction.reply({files: [new Discord.MessageAttachment(data, "gay.png")]
                 })
               });
        }
    }
}