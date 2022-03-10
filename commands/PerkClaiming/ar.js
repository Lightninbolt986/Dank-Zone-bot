const Discord = require("discord.js");
const emotes = require("../../data/emotes.json")
const arcreate = ['<@&772005497762218024>', '<@&768756245993619467>', '<@&782502710099836929>', '<@&930494768377630731>']
const bar = require("../../functions").bar
const emojiRegex = require('emoji-regex');
module.exports = {
    name: "ar",
    aliases: ["autoreact"],

    async execute(message, args, cmd, client) {

        const arData = require("../../functions").CanGetARWithInfo(message.member);
        const isNumeric = require(`../../functions`).isNumeric

        if (!arData.has) {
            return message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                        .setColor(16724533)
                        .setThumbnail('https://images-ext-2.discordapp.net/external/TLvA6RAOze3jWk_uDiSWQaZr6q7pNze0sCMmy4dImak/https/media.discordapp.net/attachments/909344848761466881/914774250219511848/1qrL0Pk2sWbLmTcHh5f4iMTW8478OwNG4P8BP9wIb9U4JZUAAAAASUVORK5CYII.png')
                        .setAuthor({
                            name: "Missing roles",
                            iconURL: "https://cdn.discordapp.com/emojis/914921124670890064.png",
                        })
                        .setDescription(`Oops! You need any of the following roles to add an autoreact\n\n>>> <:nx_tick:910049767910952961> ${arcreate.join('\n<:nx_tick:910049767910952961> ')}`)
                ]
            })
        } else {
            const ARSchema = require(`../../models/ARSchema`);
            const ARData = await ARSchema.findOne({
                UserID: message.author.id
            });

            if (["add", "remove", "list", "-", "+"].includes(args[0])) {
                if (args[0] == "add" || args[0] == '+') {
                    args.shift()

                    if (!args[0]) { return message.reply(`${emotes.cross} Please enter a valid \`Emoji/EmojiID\``) }

                    let id = args[0].match(/:[0-9]+>/gi)
                    if (id) id = id[0].substr(1).slice(0, -1)
                    const regex = emojiRegex();
                    const emo = client.emojis.cache.get(id) || client.emojis.cache.get(args[0]) || args[0].match(regex)?.[0]
                    if (!emo) return message.reply(`${emotes.cross} Either that's not a valid emoji or **${client.user.username}** can't access it.`)
                    if (ARData) {
                        //already has a schema
                        if (ARData.ARs.length >= arData.num) {
                            return message.reply(`${emotes.cross} You have attained max autoreacts - \`${arData.num}/${arData.num}\``)
                        }
                        if (ARData.ARs.includes(id)) {
                            return message.reply(`${emotes.cross} You have already added that emoji as an autoreact.`)
                        }
                        const newARData = await ARSchema.findOneAndUpdate({
                            UserID: message.author.id
                        }, {
                            $push: {
                                ARs: emo.id || emo
                            }
                        }, {
                            new: true
                        })
                        message.reply({
                            embeds: [new Discord.MessageEmbed()
                                .setFooter({
                                    text: message.author.tag,
                                })
                                .setAuthor({
                                    name: "Autoreact Added!",
                                    iconURL: "https://cdn.discordapp.com/emojis/910049767910952961.png",
                                })
                                .setColor("#00ff9d")
                                .setTimestamp()
                                .setDescription(`Successfully added ${id?`<${emo.animated ? 'a' : ''}:${emo.name}:${emo.id}>`:emo} to your autoreacts.\nYou now have \`${newARData.ARs.length}/${arData.num}\` ar(s).`)
                            ]
                        })
                    } else {
                        const thing = emo.id||emo
                        const i = await ARSchema.create({
                            UserID: message.author.id,
                            ARs: [thing],
                        });
                        i.save();
                        message.reply({
                            embeds: [new Discord.MessageEmbed()
                                .setFooter({
                                    text: message.author.tag,
                                })
                                .setAuthor({
                                    name: "Autoreact Added!",
                                    iconURL: "https://cdn.discordapp.com/emojis/910049767910952961.png",
                                })
                                .setColor("#00ff9d")
                                .setTimestamp()
                                .setDescription(`Successfully added ${id?`<${emo.animated ? 'a' : ''}:${emo.name}:${emo.id}>`:emo} to your autoreacts.\nYou now have \`${i.ARs.length}/${arData.num}\` ar(s).`)
                            ]
                        })
                    }
                } else if (args[0] == "remove" || args[0] == '-') {
                    if (!ARData?.ARs?.length) {
                        return message.reply(`${emotes.cross} You don't have any ar(s) to remove.`)
                    }
                    args.shift()
                    if (isNumeric(args[0])) {
                        //gave number
                        const e = ARData.ARs[args[0] - 1]
                        if (!e) return message.reply(`${emotes.cross} There is no autoreact with that index.`)
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
                        message.reply({
                            embeds: [new Discord.MessageEmbed()
                                .setFooter({
                                    text: message.author.tag,
                                })
                                .setAuthor({
                                    name: "Autoreact Removed!",
                                    iconURL: "https://cdn.discordapp.com/emojis/910049767910952961.png",
                                })
                                .setColor("#00ff9d")
                                .setTimestamp()
                                .setDescription(`Successfully removed <${emo.animated ? 'a' : ''}:${emo.name}:${emo.id}> from your autoreacts.\nYou now have \`${newARData.ARs.length}/${arData.num}\` ar(s).`)
                            ]
                        })

                    } else {
                        //gave emo
                        if (!args[0]) {
                            return message.reply(`Please provide an emoji or emoji index \`(${process.env.prefix}ar list)\` to remove`)
                        }
                        let id = args[0].match(/:[0-9]+>/gi)
                        if (id) id = id[0].substr(1).slice(0, -1);
                        const regex = emojiRegex();
                        const emo = client.emojis.cache.get(id) || client.emojis.cache.get(args[0]) || args[0].match(regex)
                        if (!emo) return message.reply(`${emotes.cross} Either that's not a valid emoji or **${client.user.username}** can't access it.`)
                        if (!ARData.ARs.includes(`${id||emo}`)) {
                            return message.reply(`${emotes.cross} You don't have that emoji as an autoreact`)
                        }
                        const newARData = await ARSchema.findOneAndUpdate({
                            UserID: message.author.id
                        }, {
                            $pull: {
                                ARs: id || emo[0]
                            }
                        }, {
                            new: true
                        })
                        message.reply({
                            embeds: [new Discord.MessageEmbed()
                                .setFooter({
                                    text: message.author.tag,
                                })
                                .setAuthor({
                                    name: "Autoreact Removed!",
                                    iconURL: "https://cdn.discordapp.com/emojis/910049767910952961.png",
                                })
                                .setColor("#00ff9d")
                                .setTimestamp()
                                .setDescription(`Successfully removed ${id?`<${emo.animated ? 'a' : ''}:${emo.name}:${emo.id}>`:emo} from your autoreacts.\nYou now have \`${newARData.ARs.length}/${arData.num}\` ar(s).`)
                            ]
                        })
                    }
                } else if (args[0] == 'list') {
                    if (!ARData?.ARs?.length) {
                        return message.reply(`${emotes.cross} You don't have any autoreacts to list.`)
                    }

                    message.reply({
                        embeds: [
                            new Discord.MessageEmbed()
                                .setColor("BLURPLE")
                                .setAuthor({
                                    name: message.member.user.username + "'s auto react(s)",
                                    iconURL: message.member.user.displayAvatarURL({ dynamic: true })
                                })
                                .setDescription(`${ARData.ARs.map((e, i) => {
                                    const emo = client.emojis.cache.get(e)
                                    return `\` ${i + 1} \` ${emo?`<${emo.animated ? 'a' : ''}:${emo.name}:${emo.id}> — \`${emo.id}\``:e}`
                                }).join('\n')}`)
                                .addField("Autoreacts attained", `${bar(100 * (ARData.ARs.length / arData.num))} \`${ARData.ARs.length} / ${arData.num}\``)
                        ]
                    })
                }
            } else {
                message.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                            .setColor(16724533)
                            .setThumbnail('https://images-ext-2.discordapp.net/external/TLvA6RAOze3jWk_uDiSWQaZr6q7pNze0sCMmy4dImak/https/media.discordapp.net/attachments/909344848761466881/914774250219511848/1qrL0Pk2sWbLmTcHh5f4iMTW8478OwNG4P8BP9wIb9U4JZUAAAAASUVORK5CYII.png')
                            .setAuthor({
                                name: "Invalid arguments",
                                iconURL: "https://cdn.discordapp.com/emojis/914921124670890064.png",
                            })
                            .setDescription('The command you input is incomplete, please provide a valid argument.\n\n>>> <:nx_tick:910049767910952961> ' + process.env.prefix + 'autoreact `list`\n<:nx_tick:910049767910952961> ' + process.env.prefix + 'autoreact `add / +`\n<:nx_tick:910049767910952961> ' + process.env.prefix + 'autoreact `remove / -`')
                    ]
                })
            }
        }
    },
};
