const { Embed } = require('../classes/Embed');

module.exports.run = (client, message, args) => {
    message.channel.send(new Embed(client, `Oops!`, `This command is still under development! Please come back later!`, [], {
        color: "#ff0000"
    }));
}