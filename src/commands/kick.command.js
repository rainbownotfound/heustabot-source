const { Embed } = require('../classes/Embed');
const { PermChecker } = require('../classes/PermChecker');

module.exports.run = (client, message, args) => {
    var user = message.mentions.members.first();
    var reason = args.slice(1).join(' ');

    let perm = new PermChecker(message, message.member, "KICK_MEMBERS");

    if(perm == false) {
        message.channel.send(new Embed(client, `Oops!`, `You're missing one or more required permissions to use this command!`, [
            {
                name: 'Permissions Required',
                value: `${perm.Perm()}`
            }
        ], {
            color: "#ff0000"
        }));
    } else if (!user) {
        message.channel.send(new Embed(client, `Oops!`, `Looks like you didn't tag a user!`, [], {
            color: "#ff0000"
        }));
    } else if (!user.kickable) {
        message.channel.send(new Embed(client, `Oops!`, `Looks like I can't kick this user!`, [
            {
                name: 'Possible Solutions',
                value: 'Try putting my role above the user\'s role!'
            }
        ], {
            color: "#ff0000"
        }));
    } else if (!reason) {
        user.kick({ reason: `[HB_MOD] Kicked without user specified reason by ${message.author.username}` });

        message.channel.send(new Embed(client, ``, `Successfully kicked ${user.user.username}!`));
    } else {
        user.kick({ reason: `[HB_MOD] Kicked for ${reason}` });

        message.channel.send(new Embed(client, ``, `Successfully kicked ${user.user.username} for "${reason}"!`));
    }
}