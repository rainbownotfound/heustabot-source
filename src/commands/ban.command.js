const { Embed } = require('../classes/Embed');
const { PermChecker } = require('../classes/PermChecker');

module.exports.run = (client, message, args) => {
    var user = message.mentions.members.first();
    var reason = args.slice(1).join(' ');

    let perm_checker = new PermChecker(message, message.member, "BAN_MEMBERS");

    if(perm_checker == false) {
        message.channel.send(new Embed(client, `Oops!`, `Looks like you don't have the permission required to use this command!`, [
            {
                name: 'Permissions Required',
                value: `${perm_checker.Perm()}`
            }
        ], {
            color: "#ff0000"
        }));
    } else if (!user) {
        message.channel.send(new Embed(client, `Oops!`, `Looks like you didn't tag a user!`, [], {
            color: "#ff0000"
        }));
    } else if (!user.bannable) {
        message.channel.send(new Embed(client, `Oops!`, `I can't seem to ban this user.`, [
            {
                name: 'Try The Following Solution',
                value: 'Put the bot\'s role above the user\'s role'
            }
        ], {
            color: "#ff0000"
        }));
    } else if (!reason) {
        user.ban({ reason: `[HB_MOD] Banned without user specified reason by ${message.author.username}` });

        message.channel.send(new Embed(client, ``, `Successfully banned ${user.user.username}!`));

        message.guild.channels.find(c => c.name == "logs").send(new Embed(client, `User Banned`, `**${message.author.tag}** BANNED **${user.user.tag}** with no specified reason!`, [], {
            footer: "HeustaLogger",
            timestamp: Date.now(),
            image: "https://thumbs.gfycat.com/MilkyBriskAnura-size_restricted.gif"
        }));
    } else {
        user.ban({ reason: `[HB_MOD] Banned for ${reason}` });

        message.channel.send(new Embed(client, `Yay!`, `Successfully banned **${user.user.tag}** for ${reason}`));

        message.guild.channels.find(c => c.name == "logs").send(new Embed(client, `User Banned`, `**${message.author.tag}** BANNED **${user.user.tag}** for **${reason}**!`, [], {
            footer: "HeustaLogger",
            timestamp: Date.now(),
            image: "https://thumbs.gfycat.com/MilkyBriskAnura-size_restricted.gif"
        }));
    }
}