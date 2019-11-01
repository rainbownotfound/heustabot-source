const { Embed } = require('../classes/Embed');
const { PermChecker } = require('../classes/PermChecker');

module.exports.run = (client, message, args) => {
    var dev = new PermChecker(message, message.member, 'BOT_DEVELOPER');

    if(dev == false) {
        message.channel.send(new Embed(client, `Oops!`, `Looks like you're missing one or more permissions!`, [
            {
                name: 'Missing Permissions',
                value: `${dev.Perm()}`
            }
        ], {
            color: "#ff0000"
        }));
    } else {
        let code = args.join(' ');
        let output;

        try {
            output = eval(code);
        } catch (err) {
            let msg = err;
            if(err && err.response && err.response.body && err.response.body.message) {
                message = err.response.body.message;
            }
            return ErrorHandler(message, client, code, `${msg}`);
        }

        if(typeof output !== "string") {
            output = require('util').inspect(output);
        }

        output = Clean(output).replace(new RegExp(quoteRegex(client.token), 'g'), 'BOT_TOKEN');

        message.channel.send(new Embed(client, ``, ``, [
            {
                name: 'Input',
                value: `\`\`\`js\n${code}\n\`\`\``
            },
            {
                name: 'Output',
                value: `\`\`\`js\n${output}\n\`\`\``
            }
        ]));
    }
}

function quoteRegex(input) {
    return `${input}`.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&');
}

function ErrorHandler(message, client, code, err) {
    message.channel.send(new Embed(client, ``, ``, [
        {
            name: 'Input',
            value: `\`\`\`js\n${code}\n\`\`\``
        },
        {
            name: 'Error!',
            value: `\`\`\`xl\n${Clean(err)}\n\`\`\``
        }
    ], {
        color: "#ff0000"
    }));
}

function Clean(text) {
    return text.replace(/([`@#])/g, '$1\u200b');
}