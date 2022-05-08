const { GiveawaysManager } = require('discord-giveaways');
const client = require('../index');

const giveaways_manager = new GiveawaysManager(client , {
	storage : `./giveaways.json`,
	default: {
        botsCanWin: false,
        embedColor: '#FF0000',
        embedColorEnd: '#28fc03',
        reaction: '<:gift_1:967703691031371827>'
    },
})

module.exports = giveaways_manager;