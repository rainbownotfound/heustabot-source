const { Embed } = require('../classes/Embed');
const { PermChecker } = require('../classes/PermChecker');

module.exports.run = (client, message, args) => {
    var perm = new PermChecker(message, message.member, "BOT_DEVELOPER");

    if(perm == false) {
        message.channel.send(new Embed(client, `Oops!`, `Looks like you're missing one or more permissions required to use this command!`, [
            {
                name: 'Required Permissions',
                value: `${perm.Perm()}`
            }
        ], {
            color: "#ff0000"
        }));
    } else {
        const commandName = args[0];

        if(!client.commands.has(commandName)) {
            message.channel.send(new Embed(client, `Oops!`, `Looks like the command **${commandName}** wasn't found! Did you make a typo?`, [], {
                color: "#ff0000"
            }));
        } else {
            delete require.cache[require.resolve(`./${commandName}.command.js`)];
            client.commands.delete(commandName);

            const props = require(`./${commandName}.command.js`);
            client.commands.set(commandName, props);

            message.channel.send(new Embed(client, `Success!`, `I successfully reloaded the command **${commandName}**!`));
        }
    }
}