const { Embed } = require('../classes/Embed');
const { PermChecker } = require('../classes/PermChecker');

const SendLarge = require('../classes/SendLarge');

const sql = require('sqlite');
sql.open('./data.sqlite');

module.exports.run = (client, message, args) => {
    let perm = new PermChecker(message, message.member, "MANAGE_MESSAGES");
    let perm2 = new PermChecker(message, message.member, "ADMINISTRATOR");

    if(perm == false && perm2 == false) {
        message.channel.send(new Embed(client, `Oops!`, `Looks like you're missing one or more permissions to run this command!`, [
            {
                name: 'Required Permissions',
                value: `${perm.Perm()}\n${perm2.Perm()}`
            }
        ], {
            color: "#ff0000"
        }));
    } else {
        const action = args[0];

        if(!action) {
            message.channel.send(new Embed(client, `Oops!`, `Looks like you didn't specify an action! Try again?`, [
                {
                    name: 'Usage',
                    value: 'hb!warnings <action> [value]'
                },
                {
                    name: 'Available actions',
                    value: '`all` `userID`'
                }
            ], {
                color: "#ff0000"
            }));
        } else if (action == "all") {
            sql.all('SELECT rowid, * FROM warnings').then(rows => {
                warns = '';
                rows.forEach(function(row) {
                    warns += `**${row.rowid}.** ${client.users.get(row.user) ? client.users.get(row.user).tag : 'User left server'}\nBy ${client.users.get(row.mod) ? client.users.get(row.mod).tag : 'User left server'}\n*${row.reason}*\n\n`
                });

                message.channel.send(`${rows.length} total warnings`);
                SendLarge.sendLarge(message.channel, warns, { delay: 500 });
            });
        } else if (action == 'user') {
            var user = message.mentions.users.first();

            if(!user) {
                message.channel.send(new Embed(client, `Oops!`, `Looks like you used an incorrect format! Try tagging a user!`, [], {
                    color: '#ff0000'
                }));
            } else {
                sql.all(`SELECT rowid, * FROM warnings WHERE user = '${user.id}'`).then(async rows => {
                    warns = '';
                    rows.forEach(function(row) {
                        warns += `**${row.rowid}.** ${client.users.get(row.user) ? client.users.get(row.user).tag : 'User left server'}\nBy ${client.users.get(row.mod) ? client.users.get(row.mod).tag : 'User left server'}\n*${row.reason}*\n\n`;
                    });

                    let addition;
                    let length = rows.length;
                    if(length == 3) {
                        addition = 'User has 3 warnings. Kicking is permitted, if not done already.';
                    } else if (length == 4) {
                        addition = 'User has 4 warnings. Banning for 1 week is permitted, if not done already.';
                    } else if (length >= 5) {
                        message.channel.send('User has 5 or more warnings. Banning for 6 months is permitted, if not done already.')
                    } else {
                        addition = '';
                    }

                    SendLarge.sendLarge(message.channel, `${warns}`, { delay: 500 });
                    await message.channel.send(addition);
                }).catch((err) => {
                    console.log(err);
                });
            }
        } else {
            message.channel.send(new Embed(client, `Oops!`, `I couldn't recognise this argument! Try again using either \`all\` or \`user @Mention\``));
        }
    }
}