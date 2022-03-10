const { MessageEmbed } = require('discord.js')
const emotes = require('../../data/emotes.json')
const profileModel = require("../../models/itemSchema")
const Discord = require('discord.js')
const profileModel2 = require(`../../models/profileSchema`)

const one = '767026839440326698' 
const five = '772005506520186880' 
const ten = '767026844221702154' 
const twofive = '772004082277285918' 
const fifty = '772004100953866263'
const hundred = '779268054953492503'
const twofifty = '779268051123830784'
const fivehundred = '772005497762218024'
const sevenfifty = '798558270104010752'
const billion = '772005505278935050'
const twobillion = '815507562107633684' 


module.exports = {
    name: 'itemnote',
    aliases: ['in', 'inote'],
    async execute(message, args, cmd, client, d, Profile) {

        //defining
        const staffrole = message.guild.roles.cache.get("768724931806101524")
        const donationlog = message.guild.channels.cache.get("806143325270441985")
        
        //staffrole
        if (!message.member.roles.cache.has(staffrole.id)) {
            return message.reply({
                content: `${emotes.cross} You need the ${staffrole} role to use this command.`,
                allowedMentions: {
                    parse: ['users'],
                    repliedUser: false
               }
            })
        }

        //user
        const user = await message.mentions.members.first() || message.guild.users?.cache.get(args[0])
        if (!user) {
            return message.reply(`${emotes.cross} You need to mention someone.`)
        }
                
        ItemArr = await profileModel.find()
        let tofind = args.slice(1).join(' ').split('+')
        if (!args[0]) return message.reply(`${emotes.cross} Please input an item.`)
        let input = []
        let invalid = []
        let money = []
        tofind.forEach(element => {
            element = element.trim()
            const arr = element.split(' ')
            const num = (arr.shift())
            const num2 = parseInt(num)
            if (!num2 || isNaN(num2)) {
                invalid.push(`${num} ${arr.join(' ')}`)
            }
            const item = arr.join(' ')
            const obj = getInfoObj(item, client)
            if (!obj) {
                if (item) return invalid.push(`${num} ${item}`)
                return
            }
            money.push(`${(obj.value*num2)}`)
            input.push(`${obj.emoji} \`${num2}x\` ${obj.showname} - \`⏣ ${commas(obj.value*num)}\``)
        })
        input = input.join('\n')
        invalid = invalid.join(', ')
        if (!money.length) return message.reply('None of the items provided could be identified')
        const finalMoney = money.reduce((a, b) => parseInt(a) + parseInt(b))
        
        //increment to mongo
        const response = await profileModel2.findOneAndUpdate({
            userID: user.id
        }, {
            $inc: { dono: finalMoney }
        }, {
            new: true
        });
        
        const embed = new MessageEmbed()
            .setTitle('Donation Noted')
            .setColor("BLURPLE")
            .setDescription(`${input}\n\nUser : \`${user.user.tag}\`\nAmount : \`⏣ ${commas(finalMoney)}\`\nTotal Donation : \`⏣ ${commas(response.dono)}\``)

        if (invalid.length) embed.addField('Invalid items', `\`\`\`js\n${invalid}\`\`\``)
       
        message.reply({
            embeds: [embed]
        })

        const allroles = [one, five, ten, twofive, fifty, hundred, twofifty, fivehundred, sevenfifty, billion, twobillion]
        let roles
        if (response.dono >= 2500000000) { roles = [one, five, ten, twofive, fifty, hundred, twofifty, fivehundred, sevenfifty, billion, twobillion] }
        else if (response.dono >= 1000000000 && response.dono < 2500000000) { roles = [one, five, ten, twofive, fifty, hundred, twofifty, fivehundred, sevenfifty, billion] }
        else if (response.dono >= 750000000 && response.dono < 1000000000) { roles = [one, five, ten, twofive, fifty, hundred, twofifty, fivehundred, sevenfifty] }
        else if (response.dono >= 500000000 && response.dono < 750000000) { roles = [one, five, ten, twofive, fifty, hundred, twofifty, fivehundred] }
        else if (response.dono >= 250000000 && response.dono < 500000000) { roles = [one, five, ten, twofive, fifty, hundred, twofifty] }
        else if (response.dono >= 100000000 && response.dono < 250000000) { roles = [one, five, ten, twofive, fifty, hundred] }
        else if (response.dono >= 50000000 && response.dono < 100000000) { roles = [one, five, ten, twofive, fifty] }
        else if (response.dono >= 25000000 && response.dono < 50000000) { roles = [one, five, ten, twofive] }
        else if (response.dono >= 10000000 && response.dono < 25000000) { roles = [one, five, ten] }
        else if (response.dono >= 5000000 && response.dono < 10000000) { roles = [one, five] }
        else if (response.dono >= 1000000 && response.dono < 50000000) { roles = [one] }
        else if (response.dono < 1000000) { roles = "none" }

        allroles.forEach(r => {
            user.roles.remove(r).catch(() => {})
        })
        if (roles !== "none") {
            roles.forEach(r => {
                user.roles.add(r).catch(() => {})
            })
        }

        //log donation
        donationlog.send({
            embeds: [new Discord.MessageEmbed()
                .setFooter({
                    text: `ID: ${user.id}`
                })
                .setTitle('Donation Noted')
                .setColor("BLURPLE")
                .setDescription(`${input}\n\nUser : \`${user.user.tag}\`\n Amount : \`⏣ ${commas(finalMoney)}\`\nTotal Donation : \`⏣ ${commas(response.dono)}\`\nNoted by : \`${message.author.tag}\`\nLink : [Jump](${message.url})`)
            ],
        })
    }
}

function getInfoObj(p) {
    return ItemArr.find(e => {
        return e.showname.toLowerCase() === p.toLowerCase() || e.aliases.includes(p.toLowerCase())
    })
}

function commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
