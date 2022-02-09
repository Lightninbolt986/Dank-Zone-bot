const Discord = require("discord.js");
const emotes = require("../../data/emotes.json")
const {
    Permissions
} = require("discord.js");
const chnlcreate = ['<@&782502710099836929>', '<@&745564909810614343>', '<@&772005497762218024>']
const bar = require("../../functions").bar
module.exports = {
    name: "channel",
    aliases: ["chnl"],
    async execute(message, args, cmd, client) {
        const chnlData = require("../../functions").CanGetChannelWithInfo(message.member);

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
            const channelModel = require("../../models/channelSchema");
            const channelData = await channelModel.findOne({
                OwnerID: message.author.id
            });

            if (["rename", "add", "reset", "remove", "create", "info"].includes(args[0])) {
                if (args[0] == "create") {
                    if (channelData) {
                        return message.reply({
                            embeds: [
                                new Discord.MessageEmbed()
                                    .setColor(16724533)
                                    //.setThumbnail('https://images-ext-2.discordapp.net/external/TLvA6RAOze3jWk_uDiSWQaZr6q7pNze0sCMmy4dImak/https/media.discordapp.net/attachments/909344848761466881/914774250219511848/1qrL0Pk2sWbLmTcHh5f4iMTW8478OwNG4P8BP9wIb9U4JZUAAAAASUVORK5CYII.png')
                                    .setAuthor({
                                        name: "Channel exists.",
                                        iconURL: "https://cdn.discordapp.com/emojis/914921124670890064.png",
                                    })
                                    .setDescription(`Looks like you already have a channel.\n**Channel**: <#${channelData.ChannelID}>`)
                            ]
                        })
                    }
                    args.shift();
                    if (!args[0]) return message.reply(`${emotes.cross} Please provide a name for your channel.`);
                    //entire else is creating a channel
                    const channel = await message.guild.channels.create(
                        `┃${args.join(" ")}`, {
                        type: "GUILD_TEXT",
                        reason: "Claimed private channel",
                        permissionOverwrites: [{
                            id: message.guild.id,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL],
                        },
                        {
                            id: message.author.id,
                            allow: [
                                Permissions.FLAGS.VIEW_CHANNEL,
                                Permissions.FLAGS.SEND_MESSAGES,
                                Permissions.FLAGS.ADD_REACTIONS,
                                Permissions.FLAGS.ATTACH_FILES,
                                Permissions.FLAGS.USE_EXTERNAL_EMOJIS,
                                Permissions.FLAGS.USE_EXTERNAL_STICKERS,
                                Permissions.FLAGS.MANAGE_MESSAGES,
                            ],
                        }, {
                            id: '789886892807946240',
                            allow: [
                                Permissions.FLAGS.VIEW_CHANNEL,
                                Permissions.FLAGS.SEND_MESSAGES
                            ]
                        }
                        ],
                    }
                    );
                    channel.setParent("936222310262792192", {
                        lockPermissions: false,
                        reason: "Moving created private channel into correct category",
                    });
                    const i = await channelModel.create({
                        OwnerID: message.author.id,
                        ChannelID: channel.id,
                        MembersID: [],
                    });
                    i.save();
                    const embed = new Discord.MessageEmbed()
                        .setFooter({
                            text: message.author.tag,
                        })
                        .setAuthor({
                            name: "Channel Created!",
                            iconURL: "https://cdn.discordapp.com/emojis/910049767910952961.png",
                        })
                        .setColor("#00ff9d")
                        .setTimestamp()
                        .setDescription("Your **Private Channel** has been **successfully** created!\n**Channel**: <#" + channel.id + ">");
                    message.reply({
                        embeds: [embed],
                    });
                } else if (args[0] == "rename") {
                    args.shift();
                    if (!channelData) return message.channel.send("No channel");
                    const channel = await message.guild.channels.fetch(
                        channelData.ChannelID
                    );
                    channel.setName(
                        `┃${args.join(" ")}`,
                        "Private channel renamed by user"
                    );
                    const embed = new Discord.MessageEmbed()
                        .setFooter({
                            text: message.author.tag,
                        })
                        .setAuthor({
                            name: "Channel Renamed!",
                            iconURL: "https://cdn.discordapp.com/emojis/910049767910952961.png",
                        })
                        .setColor("#00ff9d")
                        .setTimestamp()
                        .setDescription(
                            `Name of your channel has been changed from #${channel.name} to <#${channel.id}>!`
                        );
                    message.reply({
                        embeds: [embed],
                    });
                } else if (args[0] == "add") {
                    if (!channelData) return message.reply(`${emotes.cross} You need to create a channel first to add members.`);
                    if (channelData.MembersID.length >= chnlData.num) return message.reply(`${emotes.cross} Max members attained - \`${chnlData.num}\``)
                    const channel = await message.guild.channels.fetch(
                        channelData.ChannelID
                    );
                    const user = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]);
                    if (!user) {
                        return message.reply(`${emotes.cross} You need to mention someone.`)
                    }
                    if (channelData.MembersID.includes(user.id)) {
                        return message.reply(`${emotes.cross} That user is already in your channel.`)
                    }
                    if (user.id === message.author.id) {
                        return message.reply(`${emotes.cross} You cannot add yourself in your channel.`)
                    }
                    channel.permissionOverwrites.edit(user.id, {
                        VIEW_CHANNEL: true,
                        SEND_MESSAGES: true,
                        ADD_REACTIONS: true,
                        ATTACH_FILES: true,
                        USE_EXTERNAL_EMOJIS: true,
                        USE_EXTERNAL_STICKERS: true,
                    });
                    const userPermissionsIn = user.permissionsIn(channel).has(Permissions.FLAGS.ADMINISTRATOR)
                    if (userPermissionsIn) return message.reply(`${emotes.cross} That user has admin perms and can already access your channel.`)
                    if (user.user.bot) return message.reply(`${emotes.cross} That user is a bot and can already access your channel.`)
                    const newChanelData = await channelModel.findOneAndUpdate({
                        ChannelID: channel.id
                    }, {
                        $push: {
                            MembersID: user.id
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
                                name: "User Added!",
                                iconURL: "https://cdn.discordapp.com/emojis/910049767910952961.png",
                            })
                            .setColor("#00ff9d")
                            .setTimestamp()
                            .setDescription(`Added <@${user.id}> to your channel <#${channel.id}>.\nIt now has \`${newChanelData.MembersID.length}/${chnlData.num}\` members.`)
                        ]
                    })

                } else if (args[0] == "remove") {
                    if (!channelData) return message.reply(`${emotes.cross} You need to have a channel first to remove members.`);
                    const channel = await message.guild.channels.fetch(
                        channelData.ChannelID
                    );
                    const user = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]);
                    if (!user) {
                        return message.reply(`${emotes.cross} You need to mention someone.`)
                    }
                    if (user.id === message.author.id) {
                        return message.reply(`${emotes.cross} You cannot add yourself in your channel.`)
                    }
                    channel.permissionOverwrites.delete(user.id);
                    const userPermissionsIn = user.permissionsIn(channel).has(Permissions.FLAGS.ADMINISTRATOR)

                    if (userPermissionsIn) return message.reply(`${emotes.cross} That user has admin perms and cannot be removed from your channel.`)
                    if (user.user.bot) return message.reply(`${emotes.cross} That user is a bot and cannot be removed from your channel.`)

                    if (!channelData.MembersID.includes(user.id)) {
                        return message.reply(`${emotes.cross} That user is not in your channel.`)
                    }
                    const newChanelData = await channelModel.findOneAndUpdate({
                        ChannelID: channel.id
                    }, {
                        $pull: {
                            MembersID: user.id
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
                                name: "User Removed!",
                                iconURL: "https://cdn.discordapp.com/emojis/910049767910952961.png",
                            })
                            .setColor("#00ff9d")
                            .setTimestamp()
                            .setDescription(`Removed <@${user.id}> from your channel <#${channel.id}>.\nIt now has \`${newChanelData.MembersID.length}/${chnlData.num}\` members.`)
                        ]
                    })

                } else if (args[0] == 'reset') {
                    if (!channelData) return message.reply(`${emotes.cross} You need to have a channel first to delete it.`);
                    const channel = await message.guild.channels.fetch(
                        channelData.ChannelID
                    );
                    args.shift();
                    let row = [{
                        type: 1,
                        components: [{
                            type: 2,
                            style: 'PRIMARY',
                            custom_id: "Y",
                            label: "Yes",
                        },
                        {
                            type: 2,
                            style: 'DANGER',
                            custom_id: "N",
                            label: "No",
                        },
                        ],
                    },];


                    const msg = await message.reply({
                        content: `${message.author}, are you sure you want to reset your channel?`,
                        components: row
                    });
                    const collector = msg.createMessageComponentCollector({
                        componentType: 'BUTTON',
                        time: 15000,
                    });

                    collector.on('collect', async (i) => {
                        if (i.user.id === message.author.id) {
                            if (i.customId == 'Y') {
                                channel.delete()
                                await channelModel.deleteOne({
                                    ChannelID: channel.id
                                })
                                collector.stop('e')
                                return i.reply(`${emotes.tick} Deleted \`#${channel.name}\``)
                            } else {
                                collector.stop('e')
                                return i.reply(`${emotes.cross} Cancelled deletion`)
                            }
                        } else {
                            i.reply({
                                content: `${emotes.cross} These buttons aren't for you!`,
                                ephemeral: true
                            });
                        }
                    });

                    collector.on('end', (collected, reason) => {

                        msg.edit({
                            content: `${message.author}, are you sure you want to reset your channel?`,
                            components: row.map(e => {
                                e.components = e.components.map(i => {
                                    i.disabled = true
                                    return i
                                })
                                return e
                            })
                        })

                    })

                } else if (args[0] == 'info') {

                    if (!channelData) return message.reply(`${emotes.cross} You need to have a channel first to view info about it.`);
                    const channel = await message.guild.channels.fetch(
                        channelData.ChannelID
                    );
                    message.reply({
                        embeds: [
                            new Discord.MessageEmbed()
                                .setColor("BLURPLE")
                                .setAuthor({
                                    name: message.member.user.username + "'s channel info",
                                    iconURL: message.member.user.displayAvatarURL({ dynamic: true })
                                })
                                .setDescription(`${emotes.dot} Channel: <#${channel.id}>\n${emotes.dot} Created at: <t:${(channel.createdAt.getTime() / 1000).toFixed()}:f>\n${emotes.dot} Members: ${channelData.MembersID.length ? channelData.MembersID.map(e => { return `<@${e}>` }).join(', ') : '\`Nobody yet\`'}`)
                                .addField("Member Space", `${bar(100 * (channelData.MembersID.length / chnlData.num))} \`${channelData.MembersID.length} / ${chnlData.num}\``)
                        ],
                        allowedMentions: {
                            repliedUser: false,
                            parse: ['users']
                        }
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
                            .setDescription('The command you input is incomplete, please provide a valid argument.\n\n>>> <:nx_tick:910049767910952961> ' + process.env.prefix + 'channel `add`\n<:nx_tick:910049767910952961> ' + process.env.prefix + 'channel `info`\n<:nx_tick:910049767910952961> ' + process.env.prefix + 'channel `reset`\n<:nx_tick:910049767910952961> ' + process.env.prefix + 'channel `create`\n<:nx_tick:910049767910952961> ' + process.env.prefix + 'channel `remove`\n<:nx_tick:910049767910952961> ' + process.env.prefix + 'channel `rename`')
                    ]
                })
            }
        }
    },
};
