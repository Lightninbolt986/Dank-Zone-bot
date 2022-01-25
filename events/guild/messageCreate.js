module.exports = async (Discord, client, message) => {
    const prefix = process.env.prefix
    const profileModel = require("../../models/profileSchema");
    let profileData;
    try {
        profileData = await profileModel.findOne({
            userID: message.author.id
        });
        if (!profileData) {
             profileData = await profileModel.create({
                userID: message.author.id,
                dono: 0
            });
            profile.save();

        }
    } catch (err) {
        console.log(err);
    }

    if ((!message.content.startsWith(prefix) || message.author.bot)) return
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
    if (command) {
        command.execute(message, args, cmd, client, Discord, profileData)
    }

}