const Discord = require('discord.js')
const textSmall = require('../../functions').TextSmall
module.exports = async (d, client, message) => {
    const prefix = process.env.prefix
    if (message.author.bot) return
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
        let string = ''
        let maxed = false
        const msg = profileData.afkPings.map((i, ind, arr) => {
            if (string.length < 3700) string = string + `<:bp_dot:918074237992988722> <@${i.pinger}> - <t:${i.time}:R> [Jump to message](${i.url})\n**Message Content**: *${i.content}*\n\━\━\━\━\━\━\━\━\━\━\━\━\━\━\━\━\━\━\n`
            else if (maxed == false) {
                maxed = true;
                if (!(arr.length - (ind + 1) == 0)) {
                    string = string + `+${(arr.length - (ind + 1))} more`
                }
            }
        })
        if (msg) message.reply({
            embeds: [new Discord.MessageEmbed().setDescription(textSmall(string, 4000)).setColor("BLURPLE")]
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
            const afk = new Discord.MessageEmbed()
                .setAuthor({
                    name: `${u.username} is AFK`,
                    iconURL: u.displayAvatarURL({
                        dynamic: true
                    })
                })
                .setDescription(`${pingUser.afkreason}`)
                .setColor("BLURPLE")

            message.reply({
                    embeds: [afk],
                    allowedMentions: {
                        repliedUser: true
                    }
                })
                .then(m => {
                    setTimeout(() => {
                        m.delete()
                    }, 20000)
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