module.exports.run = (client, message, args) => {
    message.channel.send('Ping?').then(async m => {
        await m.edit(`Pong! \`${Math.round(client.ping)}ms\``);
    });
}