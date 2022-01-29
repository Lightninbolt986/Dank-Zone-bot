const Discord = require("discord.js")

module.exports = {
    name: 'afk',
    aliases: ['away'],
    async execute(message, args, a, b, c, profileData) {
        
        const afkreason = args.join(' ') || 'User is currently afk';
        if (afkreason.length > 1000) { return message.reply("Keep afk reason under 1000 characters.") }
     
        profileData.is_afk = true;
        profileData.afkreason = afkreason;
        profileData.afkPings = []
        await profileData.save()

        message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setDescription('I have set your afk! Sending a message will bring you back.')
                .setColor("BLURPLE")
            ], 
            allowedMentions: {
                repliedUser: false,
            }
        }).then(m => { setTimeout(() => { m.delete() }, 10000) })


        message.member.setNickname(`[AFK] ${message.member.nickname}`).catch(e => {
            message.reply("Couldn't update your nickname.").then(m => { setTimeout(() => { m.delete() }, 5000) })
        })
    }
}
