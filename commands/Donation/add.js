module.exports = {
    name: 'add',
    aliases: ['note', 'dnote'],
    async execute(message, args, cmd, client, d, Profile) {
        const Discord = require('discord.js')
        /** @param {import('discord.js').Message} message */
        const user = await message.mentions.members.first()
        if (!user) {
            return message.reply("You need to mention someone.");
        }
        const pri = args[1]
        let prize
        if (!pri) {
            return message.reply(`❌ Not a valid amount of monet\n**Syntax:** \`${process.env.prefix}dnote <user> <amount>\``)
        }
        if (pri.toLowerCase().includes("m")) {
            p = pri.toLowerCase().replace("m", "")
            prize = parseInt(p * 1000000)
        } else if (pri.toLowerCase().includes("k")) {
            p2 = pri.toLowerCase().replace("k", "")
            prize = parseInt(p * 1000)
        } else {
            prize = parseInt(pri)
        }
        if (!prize || isNaN(prize)) {
            return message.reply(`❌ Not a valid amount of money`)
        }
        const profileModel = require(`../../models/profileSchema`)
        const response = await profileModel.findOneAndUpdate({
          userID: user.id
        }, {
            $inc: {
              dono: prize
            }
          }
        );
        message.channel.send('Added ' + prize + ' to <@'+user.id+'>')
    }
}