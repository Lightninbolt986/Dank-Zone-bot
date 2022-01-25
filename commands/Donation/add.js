module.exports = {
    name: 'add',
    aliases: ['note', 'dnote', 'dn'],
    async execute(message, args, cmd, client, d, Profile) {
        const Discord = require('discord.js')
        /** @param {import('discord.js').Message} message */

     //staffrole
        if (!message.member.roles.cache.has("768724931806101524")) {
            return message.reply({
                content: "<:nx_cross:914921124670890064> You need the <@&768724931806101524> role to use this command.",
                allowedMentions: { parse: ['users'], repliedUser: false }
            })
        }
        
     //user
        const user = await message.mentions.members.first() || message.guild.users.cache.get(args[0])
        if (!user) { return message.reply("<:nx_cross:914921124670890064> You need to mention someone.") }
        
     //amount
        const value = args[1]
        let amount

     //if no args[1]
        if (!value) { return message.reply(`<:nx_cross:914921124670890064> Thats not a valid value.\n**Syntax:** \`${process.env.prefix}dnote <user> <amount>\``) }
        
     //replace m => 1,000,000
        if (value.toLowerCase().includes("m")) {
            val = value.toLowerCase().replace("m", "")
            amount = parseInt(val * 1000000)
        
     //replace mil => 1,000,000
        } else if (value.toLowerCase().includes("mil")) {
            val = value.toLowerCase().replace("mil", "")
            amount = parseInt(val * 1000000)
        
     //replace k => 1,000
        } else if (value.toLowerCase().includes("k")) {
            val = value.toLowerCase().replace("k", "")
            amount = parseInt(val * 1000)

     //if args[1] doesnt have m, mil, k
        } else { amount = parseInt(value) }

     //if no value or not integer
        if (!amount || isNaN(amount)) { return message.reply(`<:nx_cross:914921124670890064> Thats not a valid value.\n**Syntax:** \`${process.env.prefix}dnote <user> <amount>\``) }
        
     //profilemodel
        const profileModel = require(`../../models/profileSchema`)
        const profileData = await profileModel.findOne({
            userID: user.id
        });
        const response = await profileModel.findOneAndUpdate({
            userID: user.id
        }, {
          //increment value
            $inc: { dono: amount }
        });
     //send embed
        message.reply({
            embeds: [new Discord.MessageEmbed()
                .setDescription(`<a:bp_moon:935485565288190012> **Donation Noted.**\n<:bp_replycont:905405321277763624> User : \`${user.user.tag}\`\n<:bp_replycont:905405321277763624> Amount : \`⏣ ${commas(amount.toString())}\`\n<:bp_reply:905405401946783804> Total Donation : \`⏣ ${commas(profileData.dono)}\``)
                .setFooter({ text: `ID: ${user.id}` })
                .setColor("BLURPLE")],
            allowedMentions: { parse: ['users'], repliedUser: false }
        })

     //log donation
        let dnchannel = client.channels.cache.get("806143325270441985")
        dnchannel.send({
            embeds: [new Discord.MessageEmbed()
                .setDescription(`<a:bp_moon:935485565288190012> **Donation Logs.**\n<:bp_replycont:905405321277763624> User : \`${user.user.tag}\`\n<:bp_replycont:905405321277763624> Amount : \`⏣ ${commas(amount.toString())}\`\n<:bp_replycont:905405321277763624> Total Donation : \`⏣ ${commas(profileData.dono)}\`\n<:bp_replycont:905405321277763624> Noted by : \`${message.author.tag}\`\n<:bp_reply:905405401946783804> Link : [Jump](${message.url})`)
                .setFooter({ text: `ID: ${user.id}` })
                .setColor("BLURPLE")],
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
