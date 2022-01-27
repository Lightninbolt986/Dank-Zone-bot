const {
    MessageEmbed
} = require('discord.js')
const commas = require('../../functions').commas
module.exports = {
    name: 'itemcalc',
    aliases: ['icalc'],
    async execute(message, args, cmd, client) {
        const profileModel = require("../../models/itemSchema");
        ItemArr = await profileModel.find()
        let tofind = args.join(' ').split('+')
        if (!args[0]) return message.channel.send('Invalid args.')
        let input = []
        let invalid = []
        let money = []
        tofind.forEach(element => {
            element = element.trim()
            const arr = element.split(' ')
            const num = parseInt(arr.shift())
            if (!num || isNaN(num)) return message.reply('Invalid usage. Use `<amount> <item>` joined by a "+" for multiple items.')
            const item = arr.join(' ')
            const obj = getInfoObj(item, client)
            if (!obj) {
                if(item) return invalid.push(item)
                return
            }
            money.push(`${(obj.value*num)}`)
            input.push(`${num} ${obj.showname}`)
        });

        input = input.join(' + ')
        invalid = invalid.join(', ')
        if (!money.length) return message.channel.send('None of the items provided could be identified')
        const finalMoney = money.reduce((a, b) => parseInt(a) + parseInt(b))
        const embed = new MessageEmbed()
            .setTitle('**__Item Price Calculator__**')
            .setColor(15158332)
            .setAuthor({
                name: 'Dank Zone',
                iconURL: 'https:\/\/cdn.discordapp.com\/icons\/738394656211206234\/a_d7f833ef802f1f5341bdece5e3796c07.gif'
            })
            .addField('**Input**', `\`\`\`ml\n${input}\`\`\``)
            .addField('**Price of each Item**', `\`\`\`ml\n${commas(money.join(' + '))}\`\`\``)
        if (invalid.length) embed.addField('**Invalid items**', `\`\`\`ml\n${invalid}\`\`\``)
            embed.addField('**Total Price**', `\`\`\`ml\n${commas(finalMoney)}\`\`\``)
        message.channel.send({
            embeds: [embed]
        })
    }

}

function getInfoObj(p) {
return ItemArr.find(e=>{
    return e.showname == p || e.aliases.includes(p)
})
}