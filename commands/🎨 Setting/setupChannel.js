const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const myEnmap = require('../../utils/enmapUtils');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup-channel')
        .setDescription('Setup welcome channel,suggestion channel,...'),
    async execute(interaction,client) {
        const guild = interaction.guild.id;

        if(!interaction.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_CHANNELS))
        {
            const embed = {
                description : `<:false:964905677518696548> You do not have permission to use this command.`,
                color : 'RED',
            }
            return interaction.reply({embeds : [embed]});
        }

        const row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton().setCustomId('welcome-channel').setLabel('Welcome channel').setStyle('SECONDARY').setEmoji('<:humann:968530639726981130>'),
            new Discord.MessageButton().setCustomId('suggestion-channel').setLabel('Suggestion channel').setStyle('SECONDARY').setEmoji('<:light_bulb:973400987001843742>'),
            new Discord.MessageButton().setCustomId('chatbot-channel').setLabel('Chat bot channel').setStyle('SECONDARY').setEmoji('<:bot:973400987001819216>'),
            new Discord.MessageButton().setCustomId('music-request-channel').setLabel('Music request channel').setStyle('SECONDARY').setEmoji('<:music_command:967618626347741244>'),
        );

        const embed = new Discord.MessageEmbed()
            .setTitle('Setup channel')
            .setColor('BLUE')
            .setDescription(`<:setting:967618626351923250> Click one of the buttons below to setup channel.`)
            .setFooter({text : `${interaction.user.tag}` , iconURL : `${interaction.user.displayAvatarURL({dynamic : true})}`});

        const msg = await interaction.channel.send({embeds : [embed] , components : [row]});
        const collector = msg.createMessageComponentCollector({ componentType: 'BUTTON', time: 10000 });
        collector.on('collect', async (b) => {
            if(!b.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_CHANNELS))
            {
                return;
            }
            const row = new Discord.MessageActionRow().addComponents(
                new Discord.MessageButton().setCustomId('welcome-channel-disabled').setLabel('Welcome channel').setStyle('SECONDARY').setEmoji('<:humann:968530639726981130>').setDisabled(true),
                new Discord.MessageButton().setCustomId('suggestion-channel-disabled').setLabel('Suggestion channel').setStyle('SECONDARY').setEmoji('<:light_bulb:973400987001843742>').setDisabled(true),
                new Discord.MessageButton().setCustomId('chatbot-channel-disabled').setLabel('Chat bot channel').setStyle('SECONDARY').setEmoji('<:bot:973400987001819216>').setDisabled(true),
                new Discord.MessageButton().setCustomId('music-channel-disabled').setLabel('Music request channel').setStyle('SECONDARY').setEmoji('<:bot:973400987001819216>').setDisabled(true),
            );
            if(b.customId == 'suggestion-channel')
            {        
                const embed1 = {
                    description : `<:channel:973568065897906236> Which channel do you want?`,
                    color : 'BLUE',
                }
                const embed2 = {
                    description : `<:false:964905677518696548> No message sent,operation cancelled`,
                    color : 'RED',
                }
                
                b.update({components : [row]});
                const msg_wlc = await b.channel.send({embeds : [embed1]});
                await msg_wlc.channel.awaitMessages({filter: m => m.author.id == interaction.user.id , max: 1, time: 20000})
                    .then(async collected => {
                        var message = collected.first();
                        if(!message) 
                        {
                            return b.channel.send({embeds : [embed2]})
                        }
                        var channel = message.mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first();
                        if(channel)
                        {
                            const embed3 = {
                                description : `<:true:964905677824852018> Added suggestion channel : <#${channel.id}>.`,
                                color : 'BLUE',
                            }
                            myEnmap.set(`suggestion_channel_${guild}` , channel.id);
                            return b.channel.send({embeds : [embed3]});
                        }
                    })
            }
            else if(b.customId == 'welcome-channel')
            { 
                const embed1 = {
                    description : `<:channel:973568065897906236> Which channel do you want?`,
                    color : 'BLUE',
                }
                const embed2 = {
                    description : `<:false:964905677518696548> No message sent,operation cancelled`,
                    color : 'RED',
                }
                
                b.update({components : [row]});
                const msg_wlc = await b.channel.send({embeds : [embed1]});
                await msg_wlc.channel.awaitMessages({filter: m => m.author.id == interaction.user.id , max: 1, time: 20000})
                    .then(async collected => {
                        var message = collected.first();
                        if(!message) 
                        {
                            return b.channel.send({embeds : [embed2]})
                        }
                        var channel = message.mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first();
                        if(channel)
                        {
                            const embed3 = {
                                description : `<:true:964905677824852018> Added welcome channel : <#${channel.id}>.`,
                                color : 'BLUE',
                            }
                            myEnmap.set(`welcome_channel_${guild}` , channel.id);
                            return b.channel.send({embeds : [embed3]});
                        }
                    })
            }
            else if(b.customId == 'chatbot-channel')
            {
                const embed1 = {
                    description : `<:channel:973568065897906236> Which channel do you want?`,
                    color : 'BLUE',
                }
                const embed2 = {
                    description : `<:false:964905677518696548> No message sent,operation cancelled`,
                    color : 'RED',
                }
                
                b.update({components : [row]});
                const msg_wlc = await b.channel.send({embeds : [embed1]});
                await msg_wlc.channel.awaitMessages({filter: m => m.author.id == interaction.user.id , max: 1, time: 20000})
                    .then(async collected => {
                        var message = collected.first();
                        if(!message) 
                        {
                            return b.channel.send({embeds : [embed2]})
                        }
                        var channel = message.mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first();
                        if(channel)
                        {
                            const embed3 = {
                                description : `<:true:964905677824852018> Added chatbot channel : <#${channel.id}>.`,
                                color : 'BLUE',
                            }
                            myEnmap.set(`chatbot_channel_${guild}` , channel.id);
                            return b.channel.send({embeds : [embed3]});
                        }
                    })
            }
            else if(b.customId == 'music-request-channel')
            { 
                const embed1 = {
                    description : `<:channel:973568065897906236> Which channel do you want?`,
                    color : 'BLUE',
                }
                const embed2 = {
                    description : `<:false:964905677518696548> No message sent,operation cancelled`,
                    color : 'RED',
                }
                
                b.update({components : [row]});
                const msg_wlc = await b.channel.send({embeds : [embed1]});
                await msg_wlc.channel.awaitMessages({filter: m => m.author.id == interaction.user.id , max: 1, time: 20000})
                    .then(async collected => {
                        var message = collected.first();
                        if(!message) 
                        {
                            return b.channel.send({embeds : [embed2]})
                        }
                        var channel = message.mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first();
                        if(channel)
                        {
                            const embed3 = {
                                description : `<:true:964905677824852018> Added music request channel : <#${channel.id}>.`,
                                color : 'BLUE',
                            }
                            const request = {
                                description : `<:music_command:967618626347741244> Enter the song name or URLs to play song.`,
                                color : 'RED',
                            }
                            const queue = {
                                title : `__${b.guild.name}'s__ queue`,
                                description : `<:music_command:967618626347741244> There is no song in queue.`,
                                color : 'RED',
                            }
                            const row_request = new Discord.MessageActionRow().addComponents(
                                new Discord.MessageButton().setCustomId('pause-request').setLabel('Pause').setStyle('SECONDARY').setEmoji('<:pause:967350635466981437>'),
                                new Discord.MessageButton().setCustomId('resume-request').setLabel('Resume').setStyle('SECONDARY').setEmoji('<:pause:967350635466981437>'),
                                new Discord.MessageButton().setCustomId('skip-request').setLabel('Skip').setStyle('SECONDARY').setEmoji('<:pause:967350635466981437>'),
                                new Discord.MessageButton().setCustomId('loop-song-request').setLabel('Loop song').setStyle('SECONDARY').setEmoji('<:loop_song:967350635504742401>'),
                                new Discord.MessageButton().setCustomId('loop-queue-request').setLabel('Loop queue').setStyle('SECONDARY').setEmoji('<:loop_song:967350635504742401>'),
                            )
                            b.client.channels.cache.get(`${channel.id}`).send({embeds : [queue]}).then(msg => {
                                myEnmap.set(`music_channel_${guild}_msg` , msg.id);
                            });
                            b.client.channels.cache.get(`${channel.id}`).send({embeds : [request] , components : [row_request]}).then(msg => {
                                myEnmap.set(`music_channel_${guild}_msg2` , msg.id);
                            });
                            myEnmap.set(`music_channel_${guild}` , channel.id);
                            return b.channel.send({embeds : [embed3]});
                        }
                    })
            }
        });
    }
}