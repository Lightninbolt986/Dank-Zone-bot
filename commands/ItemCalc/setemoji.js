const commas = require('../../functions').commas
const emotes = require("../../data/emotes.json")
module.exports = {
    name: 'setemoji',
    aliases: ['sete'],
    async execute(message, args) {

        const staffrole = message.guild.roles.cache.get("768724931806101524")
        if (!message.member.roles.cache.has(staffrole.id)) {
            return message.reply({
                content: `${emotes.cross} You need the ${staffrole} role to use this command.`,
                allowedMentions: {
                    parse: ['users'],
                    repliedUser: false
                }
            })
        }

        const profileModel = require("../../models/itemSchema");
        ItemArr = await profileModel.find()
        const emo = (args.shift())
        if (!emo) return message.reply('Invalid usage. Use `<emoji> <item>` to set the value.')
        const item = args.join(' ')
        const obj = getInfoObj(item)
        if (!obj) return message.reply('Invalid item.')
        const i = await profileModel.findOneAndUpdate({
            showname: obj.showname
        }, {
            emoji: emo
        },{
            new:true
        })
        message.reply(`Set the emoji of ${obj.showname} to ${(emo)}`)
    }
}

function getInfoObj(p) {
    return ItemArr.find(e => {
        return e.showname == p || e.aliases.includes(p)
    })
}