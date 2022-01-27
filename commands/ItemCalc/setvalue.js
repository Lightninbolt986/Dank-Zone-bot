const commas = require('../../functions').commas
const emotes = require("../../data/emotes.json")
module.exports = {
    name: 'setvalue',
    aliases: ['set'],
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
        const num = parseInt(args.shift())
        if (!num || isNaN(num)) return message.reply('Invalid usage. Use `<amount> <item>` to set the value.')
        const item = args.join(' ')
        const obj = getInfoObj(item)
        if (!obj) return message.reply('Invalid item.')
        profileModel.findOneAndUpdate({
            showname: obj.showname
        }, {
            value: num
        })
        message.reply(`Set the value of ${obj.showname} to ${commas(num)}`)
    }
}

function getInfoObj(p) {
    return ItemArr.find(e => {
        return e.showname == p || e.aliases.includes(p)
    })
}