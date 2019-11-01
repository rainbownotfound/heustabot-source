const sql = require('sqlite');
sql.open('./src/data/data.sqlite');

module.exports = async (client) => {
    console.log("All commands have been loaded! Configuring mode...");

        if(client.config.modes.testing == "1" && client.config.modes.shutdown.activated == "0") {
            client.user.setPresence({ game: { name: 'TESTING MODE', type: 'PLAYING' }, status: 'dnd' });

            console.log('Testing Mode enabled! Logging in...');
        } else if (client.config.modes.testing == "0" && client.config.modes.shutdown.activated == "1") {
            client.user.setPresence({ game: { name: 'SHUTDOWN MODE', type: 'PLAYING' }, status: 'dnd' });

            console.log('Shutdown Mode enabled! Logging in...');
        } else if (client.config.modes.testing == "1" && client.config.modes.shutdown.activated == "1") {
            client.user.setPresence({ game: { name: 'ModeError: Cannot have 2 or more modes enabled', type: 'PLAYING' }, status: 'idle' });
        } else if (client.config.modes.testing == "0" && client.config.modes.shutdown.activated == "0") {
            client.user.setPresence({ game: { name: 'hb!help', type: 'LISTENING' }, status: 'online' });

            console.log('Normal Mode enabled! Logging in...');
        }

    await console.log(`Logged in as ${client.user.tag}`);
}