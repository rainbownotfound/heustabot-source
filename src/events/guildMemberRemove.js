const { Embed } = require('../classes/Embed');

module.exports = (guild, client) => {
    let chan = guild.channels.find(c => c.name == "welcome");

    if(!chan) return;
    chan.send(new Embed(client, `Member Left`, `Goodbye, **${guild.member.user.tag}** :Sad:`));
}