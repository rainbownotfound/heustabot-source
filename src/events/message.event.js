const { Embed } = require('../classes/Embed');
const sql = require('sqlite');
sql.open('./src/data/data.sqlite');

module.exports = (client, message) => {
    if(message.author.bot) return;

    if(message.content.indexOf(client.config.prefix) !== 0) return;

    const args = message.content.slice(client.config.prefix.length).trim().split(/ /g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);

    if(!cmd) return;

    if(client.config.modes.testing == "0" && client.config.modes.shutdown.activated == "1") {
        message.channel.send(new Embed(client, 'Shutdown Mode', `${client.config.modes.shutdownreason}`, [], {
            color: "#ff0000"
        }));
    } else if (client.config.modes.testing == "1" && client.config.modes.shutdown.activated == "0") {
        if(message.author.id !== client.config.devID) {
            message.channel.send(new Embed(client, 'Testing Mode', `This bot is currently being tested. You can not use this bot as of right now.`, [], {
                color: "#ff0000"
            }));
        } else {
            cmd.run(client, message, args);
        }
    } else if (client.config.modes.testing == "1" && client.config.modes.shutdown.activated == "1") {
        message.channel.send(new Embed(client, 'ERROR', '2 modes activated. Please contact developer as soon as possible.', [], {
            color: "#ff0000"
        }));
    } else if (client.config.modes.testing == "0" && client.config.modes.shutdown.activated == "0") {
        cmd.run(client, message, args);
    }
}