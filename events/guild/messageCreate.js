module.exports = async (Discord, client, message) => {
    const prefix = process.env.prefix
    const profileModel = require("../../models/profileSchema");
    let profileData;
    try {
        profileData = await profileModel.findOne({
            userID: message.author.id
        });
        if (!profileData) {
            let profile = await profileModel.create({
                userID: message.author.id,
                serverID: message.guild.id,
                moni: 1000,
                bank: 0,
                hugs: 0,
                kisses: 0,
                insults: 0,
                praises: 0,
                fucks: 0,
                pats: 0,
                slaps: 0
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
        command.execute(message, args, cmd, client, Discord,profileData)
    }

}