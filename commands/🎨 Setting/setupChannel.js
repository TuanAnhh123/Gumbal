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

        const row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton().setCustomId('welcome-channel').setLabel('Welcome channel').setStyle('SECONDARY').setEmoji('<:humann:968530639726981130>'),
            new Discord.MessageButton().setCustomId('suggestion-channel').setLabel('Suggestion channel').setStyle('SECONDARY').setEmoji('<:light_bulb:973400987001843742>'),
            new Discord.MessageButton().setCustomId('chatbot-channel').setLabel('Chat bot channel').setStyle('SECONDARY').setEmoji('<:bot:973400987001819216>'),
        );

        //if(!myEnmap.has(`welcome_channel_${guild}`)) wlc = "null";
        //if(!myEnmap.has(`suggestion_channel_${guild}`)) suggest = "null";
        //if(!myEnmap.has(`chatbot_channel_${guild}`)) chat_bot = "null";

        const embed = new Discord.MessageEmbed()
            .setTitle('Setup channel')
            .setDescription(`<:setting:967618626351923250> Click one of the buttons below to setup channel.`)
            .setFooter({text : `${interaction.user.tag}` , iconURL : `${interaction.user.displayAvatarURL({dynamic : true})}`});

        const msg = await interaction.channel.send({embeds : [embed] , components : [row]});
        const collector = msg.createMessageComponentCollector({ componentType: 'BUTTON', time: 10000 });
        collector.on('collect', async (b) => {
            if(!b.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_CHANNELS))
            {
                return;
            }
            if(b.customId == 'suggestion-channel')
            {
                const row = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageButton().setCustomId('welcome-channel-disabled').setLabel('Welcome channel').setStyle('SECONDARY').setEmoji('<:humann:968530639726981130>').setDisabled(true),
                    new Discord.MessageButton().setCustomId('suggestion-channel-disabled').setLabel('Suggestion channel').setStyle('SECONDARY').setEmoji('<:light_bulb:973400987001843742>').setDisabled(true),
                    new Discord.MessageButton().setCustomId('chatbot-channel-disabled').setLabel('Chat bot channel').setStyle('SECONDARY').setEmoji('<:bot:973400987001819216>').setDisabled(true),
                );
                
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
        });
    }
}