const Enmap = require("enmap");

const myEnmap = new Enmap({
    name: "settings",
    autoFetch: true,
    fetchAll: false
});

module.exports = myEnmap;