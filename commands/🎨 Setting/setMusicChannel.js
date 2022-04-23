const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('set-music-channel')
        .setDescription('Set music request channel')
        .addChannelOption(options => options.setName('channel').setDescription('The channel you want')),
    async execute(interaction,client) {
        try {
            const guild = interaction.guild.id;
            const db = interaction.client.db;

            if(!interaction.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_CHANNELS))
            {
                const embed = {
                    author: {
                        name: 'Error',
                        icon_url: 'https://cdn.discordapp.com/emojis/965142498416685106.gif?size=96&quality=lossless',
                    },
                    description : '<:false:964905677518696548> You do not have permission to use this command.',
                    color : 'BLUE',
                    timestamp: new Date(),
                    footer: {
                        text: `${interaction.user.tag}`,
                        icon_url: `${interaction.user.displayAvatarURL({dynamic : true})}`,
                    },
                }
                return interaction.reply({embeds : [embed]});
            }

            const channel = interaction.options.getChannel('channel');

            if(!channel) 
            {
                const embed = {
                    author: {
                        name: 'Error',
                        icon_url: 'https://cdn.discordapp.com/emojis/965142498416685106.gif?size=96&quality=lossless',
                    },
                    description : '<:false:964905677518696548> You need to choose the channel you want.',
                    color : 'BLUE',
                    timestamp: new Date(),
                    footer: {
                        text: `${interaction.user.tag}`,
                        icon_url: `${interaction.user.displayAvatarURL({dynamic : true})}`,
                    },
                }
                return interaction.reply({embeds : [embed]});
            }
            if(db.fetch(`${guild}_music_channel`) !== null)
            {
                const embed = {
                    author: {
                        name: 'Error',
                        icon_url: 'https://cdn.discordapp.com/emojis/965142498416685106.gif?size=96&quality=lossless',
                    },
                    description : '<:false:964905677518696548> This server is already has music request channel.',
                    color : 'BLUE',
                    timestamp: new Date(),
                    footer: {
                        text: `${interaction.user.tag}`,
                        icon_url: `${interaction.user.displayAvatarURL({dynamic : true})}`,
                    },
                }
                return interaction.reply({embeds : [embed]});
            }

            await db.set(`${guild}_music_channel` , channel.id);

            const embed = {
                author: {
                    name: 'Setup',
                    icon_url: 'https://cdn.discordapp.com/emojis/967049012626731028.webp?size=96&quality=lossless',
                },
                description : `<:true:964905677824852018> Added music request channel : <#${channel.id}>.`,
                color : 'BLUE',
                timestamp: new Date(),
                footer: {
                    text: `${interaction.user.tag}`,
                    icon_url: `${interaction.user.displayAvatarURL({dynamic : true})}`,
                },
            }
            const embed2 = {
                author: {
                    name: 'Music request',
                    icon_url: 'https://cdn.discordapp.com/emojis/956810425419329556.gif?size=96&quality=lossless',
                },
                description : `<:true:964905677824852018> Type the song name or URL in this channel to play music.`,
                color : 'BLUE',
            }
            const row = new Discord.MessageActionRow().addComponents(
                new Discord.MessageButton().setCustomId('stop').setLabel('Stop').setStyle('DANGER').setEmoji(`<:stop_music:967350636058386503>`),
                new Discord.MessageButton().setCustomId('pause').setLabel('Pause').setStyle('SECONDARY').setEmoji(`<:pause:967350635466981437>`),
                new Discord.MessageButton().setCustomId('resume').setLabel('Resume').setStyle('SECONDARY').setEmoji(`<:resume:967350635865440276>`),
                new Discord.MessageButton().setCustomId('loop').setLabel('Loop').setStyle('SECONDARY').setEmoji(`<:loop_song:967350635504742401>`),
                new Discord.MessageButton().setCustomId('queue').setLabel('Queue').setStyle('PRIMARY').setEmoji(`<:queue:967350635932565564>`),
            )
            interaction.reply({embeds : [embed]})
            channel.send({embeds : [embed2] , components : [row]});
        }
        catch(e)
        {
            client.channels.cache.get(`${interaction.channel.id}`).send(`${e}`);
        }
    }
};