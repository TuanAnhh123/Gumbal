const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('help')
        .setDescription('View all the commands of this bot'),
    async execute(interaction,client) {

        const icons = `https://discord.gg/gGpQurZHbz`;
        const icons2 = `https://discord.gg/PytH9HNzXA`;
        const icons3 = `https://discord.gg/vDYUG2MgHe`;
        const icons4 = `https://discord.gg/4fWVpesJhx`;

        const embeds = {
            "author" : {
                "name" : "Gumbal help desk"
            },
            "color" : "GREEN",
            "thumbnail" : {
                url: 'https://cdn.discordapp.com/attachments/958656143377436742/967624965799157790/unknown.png',
            },
            "description" : "**Category** :\n<:moderation:967618626343563274>・Moderation.\n<:music_command:967618626347741244>・Music.\n<:setting:967618626351923250>・Setting.",
            "footer" : {
                "text" : `${interaction.user.tag}`,
                icon_url: `${interaction.user.displayAvatarURL({dynamic : true})}`,
            },
            "timestamp" : new Date(),
            "fields" : [
                {
                    "name" : "Credits",
                    "value" : `This bot is using __icon__ from:\n> [Icons](${icons})\n> [Icons 2](${icons2})\n> [Icons 3](${icons3})\n> [Icons 4](${icons4}).`
                },
                {
                    "name" : "Links",
                    "value" : "> [Support](https://discord.gg/vcJU7xJtV4)\n> [Invite link](https://discord.com/api/oauth2/authorize?client_id=964384121226940467&permissions=8&scope=bot%20applications.commands)"
                },
            ]
        }
        const row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton().setCustomId('moderaction-help').setEmoji(`<:moderation:967618626343563274>`).setLabel('Moderation').setStyle('SECONDARY'),
            new Discord.MessageButton().setCustomId('music-help').setEmoji(`<:music_command:967618626347741244>`).setLabel('Music').setStyle('SECONDARY'),
            new Discord.MessageButton().setCustomId('setting-help').setEmoji(`<:setting:967618626351923250>`).setLabel('Setting').setStyle('SECONDARY'),
        )
        interaction.reply({embeds : [embeds] , components : [row]});
    }
};