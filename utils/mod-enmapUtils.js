const Enmap = require("enmap");

const mod_myEnmap = new Enmap({
    name: "security",
    autoFetch: true,
    fetchAll: false
});

module.exports = mod_myEnmap;