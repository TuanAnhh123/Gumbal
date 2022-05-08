const { SlashCommandBuilder } = require('@discordjs/builders');
const ms = require('ms');
const Discord = require('discord.js');
const giveaways_manager = require('../../utils/giveawayUtils');

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
        
        giveaways_manager.start(channel, {
            duration: ms(duration),
            prize : prize,
            winnerCount: amount,
            messages: {
                giveaway: '<a:giveaway:967703458218119168> **__GIVEAWAY__** <a:giveaway:967703458218119168>',
                giveawayEnded: '<a:giveaway:967703458218119168> **__GIVEAWAY ENDED__** <a:giveaway:967703458218119168>',
                drawing: '<:qua:968430225018978304>・End in : {timestamp}',
                inviteToParticipate: '<:click:968068045039882263>・React with <:gift_1:967703691031371827> to join the giveaway!',
                winMessage: 'Congratulations, {winners}! You won **{this.prize}** from the previous giveaway\nJump to giveaway : {this.messageURL}.',
                embedFooter: '{this.winnerCount} winner(s)',
                noWinner: 'Giveaway cancelled,no valid participations.',
                hostedBy: '<:humann2:968679355377156177>・Hosted by : ',
                winners: '<:humann:968530639726981130>・Winner(s) : ',
                endedAt: 'Ended at',
            }
        })
    }
};