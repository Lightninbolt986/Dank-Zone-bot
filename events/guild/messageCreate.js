const Discord = require('discord.js')
const textSmall = require('../../functions').TextSmall
module.exports = async (d, client, message) => {
    const prefix = process.env.prefix
    if(message.author.bot) return
    const profileModel = require("../../models/profileSchema");
    let profileData;
    try {
        profileData = await profileModel.findOne({
            userID: message.author.id
        });
        if (!profileData) {
            profileData = await profileModel.create({
                userID: message.author.id,
                dono: 0
            });
            profileData.save();

        }
    } catch (err) {
        console.log(err);
    }
    if (profileData.is_afk) {
        message.channel.send('Welcome back `' + message.author.username + '`! You are no longer afk.');
        profileData.is_afk = false;
        profileData.afkreason = null;
        const msg = profileData.afkPings.map(i => {
            return `- <@${i.pinger}> [pinged you in](${i.url}) <#${i.channel}> <t:${i.time}:R>\n**Message Content**: ${i.content}`
        }).join('\n')
        if(msg) message.reply({
            embeds: [new Discord.MessageEmbed().setDescription(textSmall(msg, 4000))]
        })
        profileData.afkPings = []
        await profileData.save()
    }

    message.mentions.users.forEach(async (u) => {
        if (u.id === message.author.id) return
        const pingUser = await profileModel.findOne({
            userID: u.id
        })
        if (pingUser?.is_afk) {
            const e = await profileModel.findOneAndUpdate({
                userID: u.id
            }, {
                $push: {
                    afkPings: {
                        pinger: message.author.id,
                        url: message.url,
                        channel: message.channel.id,
                        content: textSmall(message.content, 100),
                        time: (Date.now() / 1000).toFixed(0)
                    }
                }
            }, {
                new: true
            })
            e.save()
            message.channel.send(`\`${u.tag}\` is currently afk for: \`${pingUser.afkreason}\``, {
                allowedMentions: {
                    roles: [],
                    users: [],
                    parse: []
                }
            })
        }
    });
    if ((!message.content.startsWith(prefix) || message.author.bot)) return
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
    if (command) {
        command.execute(message, args, cmd, client, Discord, profileData)
    }

}