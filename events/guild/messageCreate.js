const Discord = require('discord.js')
const { TextSmall, paginate } = require('../../functions')

module.exports = async (d, client, message) => {
    const prefix = process.env.prefix
    if (message.author.bot) return
    const profileModel = require("../../models/profileSchema");
    const ARModel = require(`../../models/ARSchema`)
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
        message.member.setNickname(`${message.member?.nickname?.replace('[AFK] ', '') || message.author.username}`).catch(() => { })
        profileData.is_afk = false;
        profileData.afkreason = null;
        const ping = profileData.afkPings.map(i => {
            return `<:bp_dot:918074237992988722> <@${i.pinger}> - <t:${i.time}:R> [Jump to message](${i.url})\n**Message Content**: *${i.content}*\n━\━\━\━\━\━\━\━\━\━\━\━\━\━\━\━\━\━\━\━\━\━\━\━\━\━\━\n`
        })
        const embed = {}
        let embedslist = []
        var i, j, temporary, chunk = 5;
        for (i = 0, j = ping.length; i < j; i += chunk) {
            temporary = ping.slice(i, i + chunk);
            embed[`${i / chunk}`] = new Discord.MessageEmbed()
                .setDescription(`${temporary.join(``)}`)
                .setColor('BLURPLE')
        }
        for (let i = 0; i < (Object.keys(embed).length); i++) {
            embedslist.push(embed[i])
        }
        profileData.afkPings = []
        await profileData.save()
        if (embedslist.length > 1) paginate(embedslist, message)
        else if (embedslist.length) message.channel.send({ embeds: embedslist })
    }

    message.mentions.users.forEach(async (u) => {
        if (message.author.id == u.id) return

        const pingUser = await profileModel.findOne({
            userID: u.id
        })
        const pingUserAR = await ARModel.findOne({
            UserID: u.id
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
                        content: TextSmall(message.content, 100),
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
        if (pingUserAR?.ARs?.length) {
            pingUserAR.ARs.forEach(e => {
                message.react(e).catch(async (err) => {
                    if (err.toString().startsWith('DiscordAPIError: Unknown Emoji')) {
                        await ARModel.findOneAndUpdate({
                            UserID: u.id
                        }, {
                            $pull: {
                                ARs: e
                            }
                        })
                        message.channel.send(`I do not have access to the emoji ${e} anymore. It has been removed from your AR.`)
                    } else {
                        console.log(err)
                    }
                })
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