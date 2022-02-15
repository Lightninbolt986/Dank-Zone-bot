const Discord = require("discord.js");
const emotes = require("../../data/emotes.json")
const chnlcreate = ['penis']
const {
    bar,
    isColor
} = require("../../functions")
module.exports = {
    name: "role",
    async execute(message, args, cmd, client) {
        const RoleData = require("../../functions").CanGetRoleWithInfo(message.member);

        if (!RoleData.has) {
            return message.reply('nou bitch u no have the roles needed')
        } else {
            const roleModel = require(`../../models/roleSchema`);
            const roleData = await roleModel.findOne({
                UserID: message.author.id
            });

            if (["rename", "add", "reset", "remove", "create", "info", "color", "rall"].includes(args[0])) {
                if (args[0] == "create") {
                    if (roleData) {
                        return message.reply('already have')
                    }
                    args.shift();
                    if (!args[0]) return message.reply(`${emotes.cross} Please provide a name for your role.`);

                    const makeAbove = message.guild.roles.cache.get('794243713311178763').position + 1
                    const role = await message.guild.roles.create({
                        name: args.join(' '),
                        position: makeAbove,
                        reason: "User claimed private role"
                    });
                    message.member.roles.add(role.id, {
                        reason: 'User claimed private role'
                    })
                    const i = await roleModel.create({
                        UserID: message.author.id,
                        RoleID: role.id,
                        MembersID: [],
                    });
                    i.save();
                    message.reply({
                        content: 'Created role <@&' + role.id + '>',
                        allowedMentions: {
                            parse: ['users'],
                            repliedUser: false
                        }
                    });
                } else if (args[0] == "rename") {
                    args.shift();
                    if (!roleData) return message.reply("No role");
                    if(!args[0]) return message.reply('give name')
                    const role = await message.guild.roles.fetch(
                        roleData.RoleID
                    );
                    const name = role.name
                    role.setName(
                        `${args.join(" ")}`,
                        "Private role renamed by user"
                    );
                    message.reply({
                        content: `done named @${name} to <@&${role.id}>`,
                        allowedMentions: {
                            parse: ['users'],
                            repliedUser: false
                        }
                    });
                } else if (args[0] == "add") {
                    if (!roleData) return message.reply(`${emotes.cross} You need to create a role first to add members.`);
                    if (roleData.MembersID.length >= RoleData.num) return message.reply(`${emotes.cross} Max members attained - \`${RoleData.num}\``)
                    const role = await message.guild.roles.fetch(
                        roleData.RoleID
                    );
                    const user = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]);
                    if (!user) {
                        return message.reply(`${emotes.cross} You need to mention someone.`)
                    }
                    if (roleData.MembersID.includes(user.id)) {
                        return message.reply(`${emotes.cross} That user already has your role.`)
                    }
                    if (user.id === message.author.id) {
                        return message.reply(`${emotes.cross} You cannot give yourself your role.`)
                    }
                    if (user.user.bot) return message.reply(`${emotes.cross} That user is a bot and cannot be given your role.`)
                    user.roles.add(role.id, {
                        reason: `${message.author.name} added their private role to this user.`
                    })
                    const newRoleData = await roleModel.findOneAndUpdate({
                        RoleID: role.id
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
                            .setDescription(`Added <@${user.id}> to your role <@&${role.id}>.\nIt now has \`${newRoleData.MembersID.length}/${RoleData.num}\` members.`)
                        ]
                    })

                } else if (args[0] == "remove") {
                    if (!roleData) return message.reply(`${emotes.cross} You need to have a role first to remove members.`);
                    const role = await message.guild.roles.fetch(
                        roleData.RoleID
                    );
                    const user = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]);
                    if (!user) {
                        return message.reply(`${emotes.cross} You need to mention someone.`)
                    }
                    if (user.id === message.author.id) {
                        return message.reply(`${emotes.cross} You cannot remove yourself from your role.`)
                    }
                    if (!roleData.MembersID.includes(user.id)) {
                        return message.reply(`${emotes.cross} That user does not have your role.`)
                    }
                    user.roles.remove(role.id, {
                        reason: `${message.author.name} removed their private role from this users`
                    })
                    const newRoleData = await roleModel.findOneAndUpdate({
                        RoleID: role.id
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
                            .setDescription(`Removed <@${user.id}> from your role <@&${role.id}>.\nIt now has \`${newRoleData.MembersID.length}/${RoleData.num}\` members.`)
                        ]
                    })

                } else if (args[0] == 'reset') {
                    if (!roleData) return message.reply(`${emotes.cross} You need to have a role first to delete it.`);
                    const role = await message.guild.roles.fetch(
                        roleData.RoleID
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
                    }, ];


                    const msg = await message.reply({
                        content: `${message.author}, are you sure you want to reset your role?`,
                        components: row
                    });
                    const collector = msg.createMessageComponentCollector({
                        componentType: 'BUTTON',
                        time: 15000,
                    });

                    collector.on('collect', async (i) => {
                        if (i.user.id === message.author.id) {
                            if (i.customId == 'Y') {
                                role.delete()
                                await roleModel.deleteOne({
                                    RoleID: role.id
                                })
                                collector.stop('e')
                                return i.reply(`${emotes.tick} Deleted \`@${role.name}\``)
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

                    collector.on('end', () => {

                        msg.edit({
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
                    if (!roleData) return message.reply(`${emotes.cross} You need to have a role first to view info about it.`);
                    const role = await message.guild.roles.fetch(
                        roleData.RoleID
                    );
                    message.reply({
                        embeds: [
                            new Discord.MessageEmbed()
                            .setColor("BLURPLE")
                            .setAuthor({
                                name: message.member.user.username + "'s roles info",
                                iconURL: message.member.user.displayAvatarURL({
                                    dynamic: true
                                })
                            })
                            .setDescription(`${emotes.dot} Role: <@&${role.id}>\n${emotes.dot} Created at: <t:${(role.createdAt.getTime() / 1000).toFixed()}:f>\n${emotes.dot} Members: ${roleData.MembersID.length ? roleData.MembersID.map(e => { return `<@${e}>` }).join(', ') : '\`Nobody yet\`'}`)
                            .addField("Member Space", `${bar(100 * (roleData.MembersID.length / RoleData.num))} \`${roleData.MembersID.length} / ${RoleData.num}\``)
                        ],
                        allowedMentions: {
                            repliedUser: false,
                            parse: ['users']
                        }
                    })

                } else if (args[0] == 'color') {
                    args.shift()
                    const iscolor = isColor(args[0])
                    if (!roleData) return message.reply('You don\'t have a role!')
                    if (!iscolor) return message.reply('Thats not a valid hex')
                    const role = await message.guild.roles.fetch(roleData.RoleID)
                    role.setColor(args[0])
                    message.reply(`Set role color to ${args[0]}`)
                } else if (args[0] == 'rall') {
                    if (!roleData) return message.reply(`${emotes.cross} You need to have a role first to remove all members from it.`);
                    if (!roleData.MembersID.length) return message.reply('Nobody except you has your role')
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
                    }];


                    const msg = await message.reply({
                        content: `${message.author}, are you sure you want to remove everyone from your role?`,
                        components: row
                    });
                    const collector = msg.createMessageComponentCollector({
                        componentType: 'BUTTON',
                        time: 15000,
                    });

                    collector.on('collect', async (i) => {
                        if (i.user.id === message.author.id) {
                            if (i.customId == 'Y') {
                                roleData.MembersID.forEach(async (e) => {
                                    if (e == message.author.id) return;
                                    const member = await message.guild.members.fetch(e)
                                    member.roles.remove(roleData.RoleID)
                                })
                                i.reply(`Removed your role from ${roleData.MembersID.length} people`)
                                roleData.MembersID = []
                                roleData.save()
                            } else {
                                collector.stop('e')
                                return i.reply(`${emotes.cross} Cancelled removal`)
                            }
                        } else {
                            i.reply({
                                content: `${emotes.cross} These buttons aren't for you!`,
                                ephemeral: true
                            });
                        }
                    });

                    collector.on('end', () => {

                        msg.edit({
                            components: row.map(e => {
                                e.components = e.components.map(i => {
                                    i.disabled = true
                                    return i
                                })
                                return e
                            })
                        })

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
                        .setDescription('The command you input is incomplete, please provide a valid argument.\n\n>>> <:nx_tick:910049767910952961> ' + process.env.prefix + 'role `add`\n<:nx_tick:910049767910952961> ' + process.env.prefix + 'role `info`\n<:nx_tick:910049767910952961> ' + process.env.prefix + 'role `reset`\n<:nx_tick:910049767910952961> ' + process.env.prefix + 'role `create`\n<:nx_tick:910049767910952961> ' + process.env.prefix + 'role `remove`\n<:nx_tick:910049767910952961> ' + process.env.prefix + 'role `rename`')
                    ]
                })
            }
        }
    },
};