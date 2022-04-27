const { DisTube } = require('distube');
const { YtDlpPlugin } = require("@distube/yt-dlp");
const client = require('./index');

const distube = new DisTube(client, {
    searchSongs: 5,
    searchCooldown: 30,
    leaveOnEmpty: true,
    leaveOnFinish: false,
    leaveOnStop: true,
	youtubeDL : false,
	plugins: [new YtDlpPlugin()],
})

module.exports = distube;