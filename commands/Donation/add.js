const emotes = require("../../data/emotes.json")
const Discord = require('discord.js')
const profileModel = require(`../../models/profileSchema`)

const one = '767026839440326698' 
const five = '772005506520186880' 
const ten = '767026844221702154' 
const twofive = '772004082277285918' 
const fifty = '772004100953866263'
const hundred = '779268054953492503'
const twofifty = '779268051123830784'
const fivehundred = '772005497762218024'
const sevenfifty '798558270104010752'
const billion = '772005505278935050'
const twobillion = '815507562107633684' 

module.exports = {
    name: 'add',
    aliases: ['note', 'dnote', 'dn'],
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

        //amount
        const value = args[1]
        let amount

        //if no args[1]
        if (!value) {
            return message.reply(`${emotes.cross} Thats not a valid value.\n**Syntax:** \`${process.env.prefix}dnote <user> <amount>\``)
        }

                //replace m => 1,000,000
        if (value.toLowerCase().includes("m")) {
            val = value.toLowerCase().replace("m", "")
            amount = parseInt(val * 1000000)

            //replace mil => 1,000,000
        } else if (value.toLowerCase().includes("mil")) {
            val = value.toLowerCase().replace("mil", "")
            amount = parseInt(val * 1000000)

            //replace b => 1,000,000,000
        } else if (value.toLowerCase().includes("b")) {
            val = value.toLowerCase().replace("b", "")
            amount = parseInt(val * 1000000000)

            //replace bil => 1,000,000,000
        } else if (value.toLowerCase().includes("bil")) {
            val = value.toLowerCase().replace("bil", "")
            amount = parseInt(val * 1000000000)
            
            //replace k => 1,000
        } else if (value.toLowerCase().includes("k")) {
            val = value.toLowerCase().replace("k", "")
            amount = parseInt(val * 1000)

            //if args[1] doesnt have m, mil, k
        } else {
            amount = Number(value) || parseInt(value)
        }

        //if no value or not integer
        if (!amount || isNaN(amount)) {
            return message.reply(`${emotes.cross} Thats not a valid value.\n**Syntax:** \`${process.env.prefix}dnote <user> <amount>\``)
        }

        //increment to mongo
        const response = await profileModel.findOneAndUpdate({
            userID: user.id
        }, {
            //increment value
            $inc: {
                dono: amount
            }
        }, {
            new: true
        });

        //send embed
        message.reply({
            embeds: [new Discord.MessageEmbed()
                .setDescription(`${emotes.moon} **Donation Noted.**\n${emotes.replycont} User : \`${user.user.tag}\`\n${emotes.replycont} Amount : \`⏣ ${commas(amount.toString())}\`\n${emotes.reply} Total Donation : \`⏣ ${commas(response.dono)}\``)
                .setFooter({
                    text: `ID: ${user.id}`
                })
                .setColor("BLURPLE")
            ],
            allowedMentions: {
                parse: ['users'],
                repliedUser: false
            }
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
                .setDescription(`${emotes.moon} **Donation Logs.**\n${emotes.replycont} User : \`${user.user.tag}\`\n${emotes.replycont} Amount : \`⏣ ${commas(amount.toString())}\`\n${emotes.replycont} Total Donation : \`⏣ ${commas(response.dono)}\`\n${emotes.replycont} Noted by : \`${message.author.tag}\`\n${emotes.reply} Link : [Jump](${message.url})`)
                .setFooter({
                    text: `ID: ${user.id}`
                })
                .setColor("BLURPLE")
            ],
        })
    }
}

//comma func
function commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/*
                /´¯/) 
               /¯.../ 
              /¯.../ 
             /..../ 
        /´¯/'...'/´¯¯`·¸ 
     /'/.../..../......./¨¯\ 
    ('(...´...´.... ¯~/'...') 
     \.................'..../ 
      ''...\.......... _.·´ 
       \..............( 
        \.............\

*/
