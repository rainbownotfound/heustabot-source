var { Embed } = require('../classes/Embed');
var { PermChecker } = require('../classes/PermChecker');

module.exports.run = async (client, message, args) => {
    var perm = new PermChecker(message, message.member, "MANAGE_MESSAGES");

    if(perm == false) {
        message.channel.send(new Embed(client, `Oops!`, `Looks like you're missing 1 or more permissions to use this command!`, [
            {
                name: "Permissions Required",
                value: `${perm.Perm()}`
            }
        ], {
            color: "#ff0000"
        }));
    } else {
        const deleteCount = parseInt(args[0]);

        if(!deleteCount || deleteCount < 2 || deleteCount > 100) {
            message.channel.send(new Embed(client, `Oops!`, `Ploease enter a number between 2 and 100!`));
        } else {
            const fetched = await message.channel.fetchMessages({ limit: deleteCount });
            message.channel.bulkDelete(fetched)
                .catch(err => message.channel.send(new Embed(client, `Oops!`, `Something went wrong while purging ${args[0]} messages! Please contact Head Admin Cherry with the following error:\n\`\`\`\n${err}\n\`\`\``, [], {
                    color: "#ff0000"
                })));

            message.channel.send(new Embed(client, `Success!`, `I have successfully purged ${args[0]} messages!`)).then(m => m.delete(5000));
        }
    }
}