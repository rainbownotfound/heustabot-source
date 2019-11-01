const { Embed } = require('../classes/Embed');
const { PermChecker } = require('../classes/PermChecker');

const sql = require('sqlite');
sql.open('./data.sqlite');

module.exports.run = (client, message, args) => {
    let perm1 = new PermChecker(message, message.member, "MANAGE_MESSAGES");
    let perm2 = new PermChecker(message, message.member, "ADMINISTRATOR");

    if(perm1 == false && perm2 == false) {
        message.channel.send(new Embed(client, `Oops!`, `You're missing one or more permissions required to use this command!`, [
            {
                name: 'Required Permissions',
                value: `${perm1.Perm()}\n${perm2.Perm()}`
            }
        ], {
            color: "#ff0000"
        }));
    } else {
        var user = message.mentions.users.first();
        var mod = message.author;
        var reason = args.slice(1).join(' ');

        if(!user) {
            message.channel.send(new Embed(client, `Oops!`, `Looks like you didn't tag a user! Try again?`, [], {
                color: "#ff0000"
            }));
        } else if (!reason) {
            message.channel.send(new Embed(client, `Oops!`, `Looks like you didn't give a reason! Try again?`, [], {
                color: "#ff0000"
            }));
        } else {
            sql.run(`INSERT INTO warnings (user, mod, reason) VALUES (?, ?, ?)`, [`${user.id}`, `${mod.id}`, `${reason}`]).then((insertedRow) => {
                message.channel.send(new Embed(client, ``, `Successfully warned **${user.username}** for **${reason}**!`));

                message.guild.channels.find(c => c.name == "logs").send(new Embed(client, `User Warned`, `**${mod.username}** WARNED **${user.username}** for **${reason}**`, [], {
                    footer: "HeustaLogger",
                    timestamp: Date.now(),
                    image: 'https://media.giphy.com/media/xUA7aOH8GDVSmkXAEo/giphy.gif',
                    thumbnail: user.avatarURL
                }));
            }).catch(() => {
                sql.run(`CREATE TABLE IF NOT EXISTS warnings (user TEXT, mod TEXT, reason TEXT)`).then(() => {
                    sql.run(`INSERT INTO warnings (user, mod, reason) VALUES (?, ?, ?)`, [`${user.id}`, `${mod.id}`, `${reason}`]).then((insertedRow) => {
                        message.channel.send(new Embed(client, ``, `Successfully warned **${user.username}** for **${reason}**!`));

                        message.guild.channels.find(c => c.name == "logs").send(new Embed(client, `User Warned`, `**${mod.username}** WARNED **${user.username}** for **${reason}**`, [], {
                            footer: "HeustaLogger",
                            timestamp: Date.now(),
                            image: 'https://media.giphy.com/media/xUA7aOH8GDVSmkXAEo/giphy.gif',
                            thumbnail: user.avatarURL
                        }));
                    });
                })
            })
        }
    }
}