const { Embed } = require('../classes/Embed');
const { PermChecker } = require('../classes/PermChecker');

module.exports.run = (client, message, args) => {
    let perm = new PermChecker(message, message.member, "BAN_MEMBERS");

    if(perm == false) {
        message.channel.send(new Embed(client, `Oops!`, `Looks like you're missing 1 or more permissions required to use this command!`, [
            {
                name: 'Required Permissions',
                value: `${perm.Perm()}`
            }
        ], {
            color: "#ff0000"
        }));
    } else {
        var user = message.mentions.members.first();
        var reason = args.slice(1).join(' ');

        if(!user) {
            message.channel.send(new Embed(client, `Oops!`, `Looks like you forgot to tag a user!`, [], {
                color: "#ff0000"
            }));
        } else if (!user.bannable) {
            message.channel.send(new Embed(client, `Oops!`, `Looks like I can't softban this user!`, [
                {
                    name: 'Try the following',
                    value: `Reposition my role above the user's role`
                }
            ], {
                color: "#ff0000"
            }));
        } else if (!reason) {
            user.ban(`[HB_MOD] Softbanned without specified reason by ${message.author.username}`);
            user.unban(`[HB_MOD] Softbanned without specified reason by ${message.author.username}`);

            message.channel.send(new Embed(client, `Success!`, `Successfully softbanned ${user.user.username}`));
        } else {
            user.ban(`[HB_MOD] Softbanned for ${reason}`);
            user.unban(`[HB_MOD] Softbanned for ${reason}`);

            message.channel.send(new Embed(client, `Success!`, `Successfully softbanned ${user.user.username} for "${reason}"`));
        }
    }
}