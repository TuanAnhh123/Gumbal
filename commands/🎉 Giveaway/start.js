const { SlashCommandBuilder } = require('@discordjs/builders');
const ms = require('ms');
const Discord = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('giveaway-start')
        .setDescription('Start a giveaway')
        .addStringOption(options => options.setName('duration').setDescription('Duration of giveaway'))
        .addChannelOption(options => options.setName('channel').setDescription('Channel of giveaway'))
        .addNumberOption(options => options.setName('amount_winner').setDescription('Amout of winner'))
        .addStringOption(options => options.setName('prize').setDescription('Prize of giveaway')),
    async execute(interaction,client) {

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
        const duration = interaction.options.getString('duration');
        const amount = interaction.options.getNumber('amount_winner');
        const prize = interaction.options.getString('prize');

        if(!channel || !duration || !amount || !prize)
        {
            const embed = {
                author: {
                    name: 'Error',
                    icon_url: 'https://cdn.discordapp.com/emojis/965142498416685106.gif?size=96&quality=lossless',
                },
                description : '<:false:964905677518696548> You need to enter all the data of giveaway.',
                color : 'BLUE',
                timestamp: new Date(),
                footer: {
                    text: `${interaction.user.tag}`,
                    icon_url: `${interaction.user.displayAvatarURL({dynamic : true})}`,
                },
            }
            return interaction.reply({embeds : [embed]});
        }
        
        interaction.client.giveawaysManager.start(channel, {
            duration: ms(duration),
            amount,
            prize,
            messages: {
                giveaway: (client.config.everyoneMention ? "@everyone\n\n" : '') + "Giveaway",
                giveawayEnd: (client.config.everyoneMention ? "@everyone\n\n" : '') + "Giveaway Ended",
                timeRemaining: "Time Remaining **{duration}**",
                inviteToParticipate: "React with 🎉 to join the giveaway",
                winMessage: "Congrats {winners}, you have  won the giveaway",
                embedFooter: "Giveaway Time!",
                noWinner: "Could not determine a winner",
                hostedBy: 'Hosted by {user}',
                winners: "winners",
                endedAt: 'Ends at',
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: 'hours',
                    days: 'days',
                    pluralS: false
                }
            },
        })
    }
};