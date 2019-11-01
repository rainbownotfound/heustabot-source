const { Embed } = require('../classes/Embed');
const { PermChecker } = require('../classes/PermChecker');

const stripIndents = require('common-tags').stripIndents;
const sql = require('sqlite');
sql.open('./data.sqlite');

module.exports.run = (client, message, args) => {
    let perm = new PermChecker(message, message.member, "ADMINISTRATOR");

    if(perm == false) {
        message.channel.send(new Embed(client, `Oops!`, `Looks like you're missing one or more permissions to use this command!`, [
            {
                name: 'Required Permissions',
                value: `${perm.Perm()}`
            }
        ], {
            color: "#ff0000"
        }));
    } else {
        const id = args[0];

        sql.get(`SELECT * FROM warnings WHERE rowid=${id}`).then(async (row) => {
            if(!row) {
                message.channel.send(new Embed(client, `Oops!`, `I couldn't find this warn. You can view warnings through \`hb!warnings\``, [], {
                    color: "#ff0000"
                }));
            } else {
                message.channel.send(new Embed(client, `Yeet!`, `Successfully deleted warn #${id}`));

                message.guild.channels.find(c => c.name == "logs").send(new Embed(client, `Warn Deleted`, `**${message.author.username}** DELETED WARN **${id}**`, [
                    {
                        name: 'Warn Details',
                        value: stripIndents`
                        \`\`\`
                        ID      -       ${id}
                        To      -       ${client.users.get(row.user) == undefined ? 'User Left Server' : client.users.get(row.user).tag}
                        From    -       ${client.users.get(row.mod) == undefined ? 'User Left Server' : client.users.get(row.mod).tag}

                        Reason  -       ${row.reason}
                        \`\`\`
                        `
                    }
                ]));

                await sql.run(`DELETE FROM warnings WHERE rowid=${id}`)
            }
        }).catch(() => {
            message.channel.send(new Embed(client, `Oops!`, `Looks like there aren't any warns saved!`, [], {
                color: "#ff0000"
            }));
        });
    }
}