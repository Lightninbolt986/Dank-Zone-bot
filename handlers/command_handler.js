const fs = require('fs')
const categories = fs.readdirSync('./commands');
module.exports = (client, Discord) => {
    for (const category of categories) {
        const command_Files = fs.readdirSync(`./commands/${category}`).filter(File => File.endsWith('.js'));
        for (const file of command_Files) {
            const command = require(`../commands/${category}/${file}`);
            if (command.name) {
                client.commands.set(command.name, command)
            } else {
                continue;
            }
        }


    }


}