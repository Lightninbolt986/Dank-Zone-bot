const Discord = require("discord.js");
const {
    Permissions
} = require("discord.js");
const emotes = require("../../data/emotes.json")
module.exports = {
    name: "channel",
    aliases: ["chnl"],
    async execute(message, args, cmd, client, d, profileData) {
        const chnlData = require("../../functions").CanGetChannelWithInfo(
            message.member
        );
        if (!chnlData.has) {
            return message.channel.send("You ineligible to get a channel.");
        } else {
            const channelModel = require("../../models/channelSchema");
            const channelData = await channelModel.findOne({
                OwnerID: message.author.id,
            });
            if (["rename", "add", "reset", "remove", "create"].includes(args[0])) {
                if (args[0] == "create") {
                    if (channelData) {
                        return message.channel.send("You already have a channel.");
                    }
                    args.shift();
                    if (!args[0]) return message.channel.send("No name");
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
                            iconURL: "https://cdn.discordapp.com/emojis/784643622439616523.png?v=1",
                        })
                        .setColor(2485953)
                        .setTimestamp()
                        .setDescription(
                            "Your **Private Channel** has been **successfully** created!\n**Channel**: <#" +
                            channel.id +
                            ">"
                        );
                    message.channel.send({
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
                            iconURL: "https://cdn.discordapp.com/emojis/784643622439616523.png?v=1",
                        })
                        .setColor(2485953)
                        .setTimestamp()
                        .setDescription(
                            `Name of your channel has been changed from #${channel.name} to <#${channel.id}>!`
                        );
                    message.channel.send({
                        embeds: [embed],
                    });
                } else if (args[0] == "add") {
                    if (!channelData) return message.channel.send("No channel");
                    if (channelData.MembersID.length >= chnlData.num) return message.channel.send(`Max members reachers - ${chnlData.num}`)
                    const channel = await message.guild.channels.fetch(
                        channelData.ChannelID
                    );
                    const user =
                        (await message.mentions.members.first()) ||
                        message.guild.members.cache.get(args[0]);
                    if (!user) {
                        return message.reply(
                            `${emotes.cross} You need to mention someone.`
                        );
                    }
                    if (channelData.MembersID.includes(user.id)) {
                        return message.reply('They are alr in the channel');
                    }
                    if (user.id === message.author.id) {
                        return message.reply('You can\'t add yourself in your channel.')
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
                    if (userPermissionsIn) return message.channel.send('They have admin permissions and already have access to your channel')
                    if (user.user.bot) return message.channel.send('They are a bot and already have access to your channel')
                    const newChanelData = await channelModel.findOneAndUpdate({
                        ChannelID: channel.id
                    }, {
                        $push: {
                            MembersID: user.id
                        }
                    }, {
                        new: true
                    })
                    message.channel.send(
                        "Added <@" + user.id + "> to your channel <#" + channel.id + ">. It now has " + newChanelData.MembersID.length + ' members.'
                    )

                } else if (args[0] == "remove") {
                    if (!channelData) return message.channel.send("No channel");
                    const channel = await message.guild.channels.fetch(
                        channelData.ChannelID
                    );
                    const user =
                        (await message.mentions.members.first()) ||
                        message.guild.members.cache.get(args[0]);
                    if (!user) {
                        return message.reply(
                            `${emotes.cross} You need to mention someone.`
                        );
                    }
                    if (user.id === message.author.id) {
                        return message.reply('You can\'t remove yourself from your channel.')
                    }
                    channel.permissionOverwrites.delete(user.id);
                    const userPermissionsIn = user.permissionsIn(channel).has(Permissions.FLAGS.ADMINISTRATOR)
                    if (userPermissionsIn) return message.channel.send('They have admin permissions cannot be removed.')
                    if (user.user.bot) return message.channel.send('They are a bot and cannot be removed.')
                    if (!channelData.MembersID.includes(user.id)) {
                        return message.reply('They are not in the channel');
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
                    message.channel.send(`Successfuly removed ${user.user} from the channel. There are now ${newChanelData.MembersID.length} members in the channel`);
                } else if (args[0] == 'reset') {
                    if (!channelData) return message.channel.send("No channel");
                    const channel = await message.guild.channels.fetch(
                        channelData.ChannelID
                    );
                    args.shift();
                    const msg = await message.channel.send(`${message.author}, are you sure you want to reset your channel?`);
                    await Promise.all([msg.react("✅"), msg.react("❌")]);

                    const filter = (reaction, user) => user.id === message.author.id && ["✅", "❌"].includes(reaction.emoji.name);

                    const response = await msg.awaitReactions({
                        filter: filter,
                        max: 1
                    });
                    if (response.size > 0) {
                        const reaction = response.first();
                        if (reaction.emoji.name === "✅") {
                            channel.delete()
                            await channelModel.deleteOne({
                                ChannelID: channel.id
                            })
                            return message.channel.send('Done deleted #' + channel.name)
                        } else {
                            msg.edit("Cancelled reset.");
                        }
                    }
                }
            } else {
                message.channel.send(
                    "Args are `create, add, rename, remove and reset`"
                );
            }
        }
    },
};