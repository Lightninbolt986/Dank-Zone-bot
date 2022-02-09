const Discord = require("discord.js");
const emotes = require("../../data/emotes.json")
const chnlcreate = ['erer', 're', 'er', 'r', 're']
module.exports = {
    name: "ar",
    aliases: ["autoreact"],
    async execute(message, args, cmd, client) {
        const chnlData = require("../../functions").CanGetARWithInfo(message.member);
        const isNumeric = require(`../../functions`).isNumeric
        if (!chnlData.has) {
            return message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                        .setColor(16724533)
                        .setThumbnail('https://images-ext-2.discordapp.net/external/TLvA6RAOze3jWk_uDiSWQaZr6q7pNze0sCMmy4dImak/https/media.discordapp.net/attachments/909344848761466881/914774250219511848/1qrL0Pk2sWbLmTcHh5f4iMTW8478OwNG4P8BP9wIb9U4JZUAAAAASUVORK5CYII.png')
                        .setAuthor({
                            name: "Missing roles",
                            iconURL: "https://cdn.discordapp.com/emojis/914921124670890064.png",
                        })
                        .setDescription(`Oops! You need any of the following roles to create a channel\n\n>>> <:nx_tick:910049767910952961> ${chnlcreate.join('\n<:nx_tick:910049767910952961> ')}`)
                ]
            })
        } else {
            const ARSchema = require(`../../models/ARSchema`);
            const ARData = await ARSchema.findOne({
                UserID: message.author.id
            });

            if (["add", "remove", "list"].includes(args[0])) {
                if (args[0] == "add") {
                    args.shift()

                    if (!args[0]) {
                        return message.channel.send('gib emo')
                    }
                    let id = args[0].match(/:[0-9]+>/gi)[0].substr(1).slice(0, -1);
                    const emo = client.emojis.cache.get(id)
                    if (!emo) return message.reply('I dont hab that emo')
                    if (ARData) {
                        //already has a schema
                        if (ARData.ARs.length >= chnlData.num) {
                            return message.channel.send('you have max ars - ' + chnlData.num)
                        }
                        if (ARData.ARs.includes(id)) {
                            return message.reply('You already hab that emo')
                        }
                        const newARData = await ARSchema.findOneAndUpdate({
                            UserID: message.author.id
                        }, {
                            $push: {
                                ARs: emo.id
                            }
                        }, {
                            new: true
                        })
                        message.reply(`Added <${emo.animated ? 'a' : ''}:${emo.name}:${emo.id}>, you hab ${newARData.ARs.length} ars. You can add ${chnlData.num - newARData.ARs.length} more`)
                    } else {
                        const i = await ARSchema.create({
                            UserID: message.author.id,
                            ARs: [emo.id],
                        });
                        i.save();
                        message.reply(`Added <${emo.animated ? 'a' : ''}:${emo.name}:${emo.id}>, you hab ${i.ARs.length} ars. You can add ${chnlData.num - i.ARs.length} more`)
                    }
                } else if (args[0] == "remove") {
                    if (!ARData?.ARs?.length) {
                        return message.reply('You have no ars')
                    }
                    args.shift()
                    if (isNumeric(args[0])) {
                        //gave number
                        const e = ARData.ARs[args[0] - 1]
                        if (!e) return message.channel.send('The is no AR at that index')
                        const emo = client.emojis.cache.get(e)
                        const newARData = await ARSchema.findOneAndUpdate({
                            UserID: message.author.id
                        }, {
                            $pull: {
                                ARs: e
                            }
                        }, {
                            new: true
                        })
                        message.reply(`Removed <${emo.animated ? 'a' : ''}:${emo.name}:${emo.id}>, you hab ${newARData.ARs.length} ars. You can add ${chnlData.num - newARData.ARs.length} more`)

                    } else {
                        //gave emo
                        if (!args[0]) {
                            return message.channel.send('gib emo or number of emo to remove')
                        }
                        let id = args[0].match(/:[0-9]+>/gi)[0].substr(1).slice(0, -1);
                        const emo = client.emojis.cache.get(id)
                        if (!emo) return message.reply('I dont hab that emo')
                        if (!ARData.ARs.includes(id)) {
                            return message.reply('You dont hab that emo')
                        }
                        const newARData = await ARSchema.findOneAndUpdate({
                            UserID: message.author.id
                        }, {
                            $pull: {
                                ARs: id
                            }
                        }, {
                            new: true
                        })
                        message.reply(`Removed <${emo.animated ? 'a' : ''}:${emo.name}:${emo.id}>, you hab ${newARData.ARs.length} ars. You can add ${chnlData.num - newARData.ARs.length} more`)

                    }
                } else if (args[0] == 'list') {
                    if (!ARData?.ARs?.length) {
                        return message.reply('You have no ars')
                    }
                    return message.channel.send(`${ARData.ARs.map((e, i) => {
                        const emo = client.emojis.cache.get(e)
                        return `${i + 1}) <${emo.animated ? 'a' : ''}:${emo.name}:${emo.id}>`
                    }).join('\n')}`)
                }
            } else {
                message.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                            .setDescription('Use correct args nubw')  ]
                })
            }
        }
    },
};
