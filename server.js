const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();
const config = require('./config.json');

client.config = config;

fs.readdir("./src/events/", (err, files) => {
    if(err) return console.error(err);

    files.forEach(file => {
        const event = require(`./src/events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

client.commands = new Discord.Collection();

fs.readdir("./src/commands/", (err, files) => {
    if(err) return console.error(err);

    files.forEach(file => {
        if(!file.endsWith(".js")) return;
        let props = require(`./src/commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`${commandName} has been loaded.`);
        client.commands.set(commandName, props);
    });
});

client.login(client.config.token);