const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('set-verification')
        .setDescription('Set verification system')
        .addRoleOption(options => options.setName('verified_role').setDescription('Role-added after verify successfully'))
        .addChannelOption(options => options.setName('channel').setDescription('Verification'))
        .addStringOption(options => 
            options.setName('verification_mode')
                .setDescription('Verification mode')
                .addChoice('Captcha' , 'captcha')
                .addChoice('None' , 'none')
            ),
    async execute(interaction,client) {
        const guild = interaction.guild.id;
        const db = interaction.client.db;

        if(!interaction.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR))
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
        const role = interaction.options.getRole('verified_role');
        const mode = interaction.options.getString('verification_mode');

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
        if(channel.type !== 'GUILD_TEXT')
        {
            const embed = {
                author: {
                    name: 'Error',
                    icon_url: 'https://cdn.discordapp.com/emojis/965142498416685106.gif?size=96&quality=lossless',
                },
                description : '<:false:964905677518696548> Please choose a text channel.',
                color : 'BLUE',
                timestamp: new Date(),
                footer: {
                    text: `${interaction.user.tag}`,
                    icon_url: `${interaction.user.displayAvatarURL({dynamic : true})}`,
                },
            }
            return interaction.reply({embeds : [embed]});
        }
        if(!role)
        {
            const embed = {
                author: {
                    name: 'Error',
                    icon_url: 'https://cdn.discordapp.com/emojis/965142498416685106.gif?size=96&quality=lossless',
                },
                description : '<:false:964905677518696548> You need to choose verified role.',
                color : 'BLUE',
                timestamp: new Date(),
                footer: {
                    text: `${interaction.user.tag}`,
                    icon_url: `${interaction.user.displayAvatarURL({dynamic : true})}`,
                },
            }
            return interaction.reply({embeds : [embed]});
        }
        if(!mode)
        {
            const embed = {
                author: {
                    name: 'Error',
                    icon_url: 'https://cdn.discordapp.com/emojis/965142498416685106.gif?size=96&quality=lossless',
                },
                description : '<:false:964905677518696548> You need to choose verification mode.',
                color : 'BLUE',
                timestamp: new Date(),
                footer: {
                    text: `${interaction.user.tag}`,
                    icon_url: `${interaction.user.displayAvatarURL({dynamic : true})}`,
                },
            }
            return interaction.reply({embeds : [embed]});
        }
        if(interaction.guild.me.roles.highest.comparePositionTo(role) <= 0)
        {
            const embed = {
                author: {
                    name: 'Error',
                    icon_url: 'https://cdn.discordapp.com/emojis/965142498416685106.gif?size=96&quality=lossless',
                },
                description : '<:false:964905677518696548> The verified role is higher than my highest role.',
                color : 'BLUE',
                timestamp: new Date(),
                footer: {
                    text: `${interaction.user.tag}`,
                    icon_url: `${interaction.user.displayAvatarURL({dynamic : true})}`,
                },
            }
            return interaction.reply({embeds : [embed]});
        }
        if(db.fetch(`${guild}_verify`) !== null)
        {
            const embed = {
                author: {
                    name: 'Error',
                    icon_url: 'https://cdn.discordapp.com/emojis/965142498416685106.gif?size=96&quality=lossless',
                },
                description : '<:false:964905677518696548> This server is already verification system.',
                color : 'BLUE',
                timestamp: new Date(),
                footer: {
                    text: `${interaction.user.tag}`,
                    icon_url: `${interaction.user.displayAvatarURL({dynamic : true})}`,
                },
            }
            return interaction.reply({embeds : [embed]});
        }

        await db.set(`${guild}_verify` , channel.id);
        await db.set(`${guild}_verified_role` , role.id);
        await db.set(`${guild}_verify_mode` , mode);

        const embed = {
            author: {
                name: 'Setup',
                icon_url: 'https://cdn.discordapp.com/emojis/967049012626731028.webp?size=96&quality=lossless',
            },
            description : `<:true:964905677824852018> Added verification channel : <#${channel.id}>\n<:true:964905677824852018> Added verified role : <@&${role.id}>.\n<:true:964905677824852018> Added verification mode : ${mode}.`,
            color : 'BLUE',
            timestamp: new Date(),
            footer: {
                text: `${interaction.user.tag}`,
                icon_url: `${interaction.user.displayAvatarURL({dynamic : true})}`,
            },
        }
        const embed2 = {
            title : `Verification required`,
            color : 'GREEN',
            description : `<:click:968068045039882263> Click the button below to verify yourself.`,
        }
        const row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton().setCustomId('verify').setLabel('Verify').setStyle('SUCCESS').setEmoji('<:verify:968068045673222155>'),
        )
        interaction.reply({embeds : [embed]});
        interaction.client.channels.cache.get(channel.id).send({embeds : [embed2] , components : [row]});
    }
};