const stripIndents = require('common-tags').stripIndents;

const { Embed } = require('../classes/Embed');
const PageTron = require('../classes/PageTron');

module.exports.run = (client, message, args) => {
    const embed1 = new Embed(client, `Greetings!`, `I am HeustaBot! I was created to bring ease and fun to this server!`, [
        {
            name: 'Utility Commands',
            value: '`help` `ping` `botinfo`'
        }
    ]);

    const embed2 = new Embed(client, `Greetings!`, `I am HeustaBot! I was created to bring ease and fun to this server!`, [
        {
            name: 'Moderator Commands',
            value: '`warn` `warnings` `deletewarn` `kick` `ban` `softban` `purge`'
        }
    ]);

    const embed3 = new Embed(client, `Greetings`, `I am HeustaBot! I was created to bring ease and fun to this server!`, [
        {
            name: 'Developer Commands',
            value: '`eval` `reload`'
        }
    ]);

    const embedEnd = new Embed(client, `Credits`, stripIndents`
    \`\`\`
    Original Bot    -   Eastah
    Bot Remake      -   Cherry P. Arrot
    Discord Server  -   Eastah
    Hosting         -   BackSpin-Hosting.com
    \`\`\`
    `);

    var pages = [
        embed1,
        embed2,
        embed3,
        embedEnd
    ];

    PageTron(message, pages);
}