const emotes = require("../../data/emotes.json")
const Discord = require('discord.js')
const profileModel = require(`../../models/profileSchema`)

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
        const user = await message.mentions.members.first() || message.guild.users.cache.get(args[0])
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
            amount = parseInt(value)
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
                .setFooter({text:`ID: ${user.id}`})
                .setColor("BLURPLE")
            ],
            allowedMentions: {
                parse: ['users'],
                repliedUser: false
            }
        })

        //log donation
        donationlog.send({
            embeds: [new Discord.MessageEmbed()
                .setDescription(`${emotes.moon} **Donation Logs.**\n${emotes.replycont} User : \`${user.user.tag}\`\n${emotes.replycont} Amount : \`⏣ ${commas(amount.toString())}\`\n${emotes.replycont} Total Donation : \`⏣ ${commas(response.dono)}\`\n${emotes.replycont} Noted by : \`${message.author.tag}\`\n${emotes.reply} Link : [Jump](${message.url})`)
                .setFooter({text:`ID: ${user.id}`})
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