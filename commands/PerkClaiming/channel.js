const Discord = require('discord.js')
const {
    Permissions
} = require('discord.js')
module.exports = {
    name: 'channel',
    aliases: ['chnl'],
    async execute(message, args, cmd, client, d, profileData) {
        const chnlData = require('../../functions').CanGetChannelWithInfo(message.member)
        if (!chnlData.has) {
            return message.channel.send('You ineligible to get a channel.')
        } else {
            const channelModel = require('../../models/channelSchema');
            channelData = await channelModel.findOne({
                OwnerID: message.author.id
            })
            if (['rename', 'add', 'reset', 'remove', 'create'].includes(args[0])) {
                if (args[0] == 'create') {
                    if (channelData) {
                        return message.channel.send('You already have a channel.')
                    }
                    args.shift();
                    if(!args[0]) return message.channel.send('No name')
                    //entire else is creating a channel
                    const channel = await message.guild.channels.create(`┃${args.join(' ')}`, {
                        type: 'GUILD_TEXT',
                        reason: 'Claimed private channel',
                        permissionOverwrites: [{
                                id: message.guild.id,
                                deny: [Permissions.FLAGS.VIEW_CHANNEL],
                            },
                            {
                                id: message.author.id,
                                allow: [Permissions.FLAGS.VIEW_CHANNEL,
                                    Permissions.FLAGS.SEND_MESSAGES,
                                    Permissions.FLAGS.ADD_REACTIONS,
                                    Permissions.FLAGS.ATTACH_FILES,
                                    Permissions.FLAGS.USE_EXTERNAL_EMOJIS,
                                    Permissions.FLAGS.USE_EXTERNAL_STICKERS,
                                    Permissions.FLAGS.MANAGE_MESSAGES,
                                ],
                            },
                        ],
                    });
                    channel.setParent('936222310262792192', {
                        lockPermissions: false,
                        reason: 'Moving created private channel into correct category'
                    })
                    const i = await channelModel.create({
                        OwnerID: message.author.id,
                        ChannelID: channel.id,
                        MembersID: []
                    })
                    i.save();
                    const embed = new Discord.MessageEmbed().setFooter({
                        text: message.author.tag
                    }).setAuthor({
                        name: 'Channel Created!',
                        iconURL: 'https://cdn.discordapp.com/emojis/784643622439616523.png?v=1'
                    }).setColor(2485953).setTimestamp().setDescription('Your **Private Channel** has been **successfully** created!\n**Channel**: <#' + channel.id + '>')
                    message.channel.send({
                        embeds: [embed]
                    })
                } else if (args[0] == 'rename') {
                    args.shift()
                    if(!channelData) return message.channel.send('No channel')
                    const channel = await message.guild.channels.fetch(channelData.ChannelID)
                    channel.setName(`┃${args.join(' ')}`, 'Private channel renamed by user')
                    const embed = new Discord.MessageEmbed().setFooter({
                        text: message.author.tag
                    }).setAuthor({
                        name: 'Channel Renamed!',
                        iconURL: 'https://cdn.discordapp.com/emojis/784643622439616523.png?v=1'
                    })
                    .setColor(2485953)
                    .setTimestamp()
                    .setDescription(`Name of your channel has been changed from #${channel.name} to <#${channel.id}>!`)
                    message.channel.send({embeds:[embed]})
                }
            } else {
                message.channel.send('Args are `create, add, rename, remove and reset`')
            }
        }

    }
}