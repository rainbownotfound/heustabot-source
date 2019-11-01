const { Embed } = require('../classes/Embed');

module.exports = async (member, client) => {
    var roleID = member.guild.roles.find(r => r.name == "Member");

    chan = member.guild.channels.find(c => c.name == "welcome")
    
    if(!chan) return;
    chan.send(new Embed(client, `Welcome!`, `Welcome to the server, ${member}! Make sure to leave your shoes at the door, read our house rules and have fun!`, [], {
        color: "#BC1FDE"
    }));
    await member.addRole(roleID);
}