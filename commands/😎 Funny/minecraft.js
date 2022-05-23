const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('minecraft')
        .setDescription('Minecraft'),
    async execute(interaction) {
        fetch(`https://some-random-api.ml/mc?username=${interaction.user.username}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
    }
}