const {
    AmariBot
} = require("amaribot.js")
const amaribot = new AmariBot(process.env.amariApiKey)
const Discord = require('discord.js');
const Timeout = new Discord.Collection()
const ms = require("ms")
const bar = require('../../functions').bar

module.exports = {
    name: 'amarishop',
    aliases: ["ams", "amshop", "ashop", 'as'],
    async execute(message, args) {
        const channel = message.guild.channels.cache.find(c => c.id === '930719959175286846')
        const e = await amaribot.getUserLevel(message.guild.id, message.member.id)
        let reqrole
        let hasrole
        let reqlevel
        let haslevel
        let calc
        let perks
        let role
        let rank
        let level

        if (!args[0]) {
            return message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setColor(16724533)
                    .setThumbnail('https://images-ext-2.discordapp.net/external/TLvA6RAOze3jWk_uDiSWQaZr6q7pNze0sCMmy4dImak/https/media.discordapp.net/attachments/909344848761466881/914774250219511848/1qrL0Pk2sWbLmTcHh5f4iMTW8478OwNG4P8BP9wIb9U4JZUAAAAASUVORK5CYII.png')
                    .setAuthor({
                        name: "Invalid arguments",
                        iconURL: "https://cdn.discordapp.com/emojis/914921124670890064.png"
                    })
                    .setDescription('The command you input is incomplete, please provide a valid argument.\n\n>>> <:nx_tick:910049767910952961> n.amarishop `1`/`I`\n<:nx_tick:910049767910952961> n.amarishop `2`/`II`\n<:nx_tick:910049767910952961> n.amarishop `3`/`III`\n<:nx_tick:910049767910952961> n.amarishop `4`/`IV`\n<:nx_tick:910049767910952961> n.amarishop `5`/`V`')
                ]
            })
        }
        if (args[0].toLowerCase() !== "1" && args[0].toLowerCase() !== "i" && args[0].toLowerCase() !== "2" && args[0].toLowerCase() !== "ii" && args[0].toLowerCase() !== "3" && args[0].toLowerCase() !== "iii" && args[0].toLowerCase() !== "4" && args[0].toLowerCase() !== "iv" && args[0].toLowerCase() !== "5" && args[0].toLowerCase() !== "v") {
            return message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setColor(16724533)
                    .setThumbnail('https://images-ext-2.discordapp.net/external/TLvA6RAOze3jWk_uDiSWQaZr6q7pNze0sCMmy4dImak/https/media.discordapp.net/attachments/909344848761466881/914774250219511848/1qrL0Pk2sWbLmTcHh5f4iMTW8478OwNG4P8BP9wIb9U4JZUAAAAASUVORK5CYII.png')
                    .setAuthor({
                        name: "Invalid arguments",
                        iconURL: "https://cdn.discordapp.com/emojis/914921124670890064.png"
                    })
                    .setDescription('The command you input is incomplete, please provide a valid argument.\n\n>>> <:nx_tick:910049767910952961> n.amarishop `1`/`I`\n<:nx_tick:910049767910952961> n.amarishop `2`/`II`\n<:nx_tick:910049767910952961> n.amarishop `3`/`III`\n<:nx_tick:910049767910952961> n.amarishop `4`/`IV`\n<:nx_tick:910049767910952961> n.amarishop `5`/`V`')
                ]
            })
        }
        //let emotes = ["<:nx_cross:914921124670890064>", "<:nx_tick:910049767910952961>"]

        if (args[0] === '1' || args[0].toLowerCase() === "i") {
            level = 15
            hasrole = '<:nx_tick:910049767910952961>'
            reqrole = "<:nx_tick:910049767910952961> \`None\`"
            rank = "Active [ I ]"
            role = message.guild.roles.cache.get("930494539955859487")

            if (e.level >= level) {
                haslevel = "<:nx_tick:910049767910952961>"
                calc = `<:nx_tick:910049767910952961> Reducing \`${level}\` from \`${e.level}\`, will leave \`${e.level - level}\` levels.`
            } else {
                haslevel = "<:nx_cross:914921124670890064>"
                calc = `<:nx_cross:914921124670890064> You still need \`${level - e.level}\` more levels to purchase this rank.`
            }

            const finalval = `${e.level / level * 100}`
            reqlevel = `${haslevel} ${bar(finalval)} \`${e.level}/${level}\``
            perks = '<@&930494539955859487> `(15 levels)`\n<:bp_replycont:905405321277763624> `+1x` exp multipler\n<:bp_replycont:905405321277763624> Image permissions in <#774576121500925962>\n<:bp_reply:905405401946783804> Reaction permissions in heist channels'
        }

        if (args[0] === '2' || args[0].toLowerCase() === "ii") {
            if (message.member.roles.cache.has("930494539955859487")) {
                hasrole = '<:nx_tick:910049767910952961>'
            } else {
                hasrole = '<:nx_cross:914921124670890064>'
            }
            level = 25
            reqrole = `${hasrole} <@&930494539955859487>`
            role = message.guild.roles.cache.get('930494684453806120')
            rank = "Elite [ II ]"

            if (e.level >= level) {
                haslevel = "<:nx_tick:910049767910952961>"
                calc = `<:nx_tick:910049767910952961> Reducing \`${level}\` from \`${e.level}\`, will leave \`${e.level - level}\` levels.`
            } else {
                haslevel = "<:nx_cross:914921124670890064>"
                calc = `<:nx_cross:914921124670890064> You still need \`${level - e.level}\` more levels to purchase this rank.`
            }

            const finalval = `${e.level / level * 100}`
            reqlevel = `${haslevel} ${bar(finalval)} \`${e.level}/${level}\``
            perks = '<@&930494684453806120> `(25 levels)`\n<:bp_replycont:905405321277763624> `+2x` exp multipler\n<:bp_replycont:905405321277763624> Send images in any channel\n<:bp_replycont:905405321277763624> Able to use `n.snipe`\n<:bp_replycont:905405321277763624> Able to use `-highlight`\n<:bp_reply:905405401946783804> `+2` people in your existing private channel'
        }

        if (args[0] === '3' || args[0].toLowerCase() === "iii") {
            if (message.member.roles.cache.has("930494684453806120")) {
                hasrole = '<:nx_tick:910049767910952961>'
            } else {
                hasrole = '<:nx_cross:914921124670890064>'
            }
            level = 40
            reqrole = `${hasrole} <@&930494684453806120>`
            role = message.guild.roles.cache.get('930494768377630731')
            rank = "Legend [ III ]"

            if (e.level >= level) {
                haslevel = "<:nx_tick:910049767910952961>"
                calc = `<:nx_tick:910049767910952961> Reducing \`${level}\` from \`${e.level}\`, will leave \`${e.level - level}\` levels.`
            } else {
                haslevel = "<:nx_cross:914921124670890064>"
                calc = `<:nx_cross:914921124670890064> You still need \`${level - e.level}\` more levels to purchase this rank.`
            }

            const finalval = `${e.level / level * 100}`
            reqlevel = `${haslevel} ${bar(finalval)} \`${e.level}/${level}\``
            perks = '<@&930494768377630731> `(40 levels)`\n<:bp_replycont:905405321277763624> `+3x` exp multipler\n<:bp_replycont:905405321277763624> Access to <#800301936007708712> \n<:bp_replycont:905405321277763624> Able to use `n.afk`\n<:bp_replycont:905405321277763624> `+1` bonus entry for giveaways with <@!700743797977514004> \n<:bp_reply:905405401946783804> Add reaction in all channels.'
        }

        if (args[0] === '4' || args[0].toLowerCase() === "iv") {
            if (message.member.roles.cache.has("930494768377630731")) {
                hasrole = '<:nx_tick:910049767910952961>'
            } else {
                hasrole = '<:nx_cross:914921124670890064>'
            }
            level = 50
            reqrole = `${hasrole} <@&930494768377630731>`
            role = message.guild.roles.cache.get('930494844160323605')
            rank = "Mythic [ IV ]"

            if (e.level >= level) {
                haslevel = "<:nx_tick:910049767910952961>"
                calc = `<:nx_tick:910049767910952961> Reducing \`${level}\` from \`${e.level}\`, will leave \`${e.level - level}\` levels.`
            } else {
                haslevel = "<:nx_cross:914921124670890064>"
                calc = `<:nx_cross:914921124670890064> You still need \`${level - e.level}\` more levels to purchase this rank.`
            }

            const finalval = `${e.level / level * 100}`
            reqlevel = `${haslevel} ${bar(finalval)} \`${e.level}/${level}\``
            perks = '<@&930494844160323605> `(50 levels)`\n<:bp_replycont:905405321277763624> `+5x` exp multiplier\n<:bp_replycont:905405321277763624> Able to use `n.snipe bulk` \n<:bp_replycont:905405321277763624> Private channel\n<:bp_replycont:905405321277763624> Personal tag exclusive to you.\n<:bp_reply:905405401946783804> Access to audit logs'
        }
        if (args[0] === '5' || args[0].toLowerCase() === "v") {

            if (message.member.roles.cache.has("930494844160323605")) {
                hasrole = '<:nx_tick:910049767910952961>'
            } else {
                hasrole = '<:nx_cross:914921124670890064>'
            }
            level = 75
            reqrole = `${hasrole} <@&930494844160323605>`
            role = message.guild.roles.cache.get('930494904617017404')
            rank = "No Lifer [ V ]"

            if (e.level >= level) {
                haslevel = "<:nx_tick:910049767910952961>"
                calc = `<:nx_tick:910049767910952961> Reducing \`${level}\` from \`${e.level}\`, will leave \`${e.level - level}\` levels.`
            } else {
                haslevel = "<:nx_cross:914921124670890064>"
                calc = `<:nx_cross:914921124670890064> You still need \`${level - e.level}\` more levels to purchase this rank.`
            }

            const finalval = `${e.level / level * 100}`
            reqlevel = `${haslevel} ${bar(finalval)} \`${e.level}/${level}\``
            perks = '<@&930494904617017404> `(75 levels)`\n<:bp_replycont:905405321277763624> Private role for you and `10` friends\n<:bp_replycont:905405321277763624> Able to join top VCs\n<:bp_replycont:905405321277763624> `+3` bonus entries on giveaways with <@!700743797977514004>  \n<:bp_replycont:905405321277763624> Access to all log channels.\n<:bp_reply:905405401946783804> Bypass _**ALL**_ giveaways",'
        }

        if (hasrole === "<:nx_tick:910049767910952961>" && haslevel === "<:nx_tick:910049767910952961>") {
            const m = await message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .addField("<:bp_dot:918074237992988722> Required Roles", reqrole)
                    .addField("<:bp_dot:918074237992988722> Required Levels", reqlevel)
                    .addField("<:bp_dot:918074237992988722> Calculations", calc)
                    .addField("<:bp_dot:918074237992988722> Perks", perks)
                    .setColor("BLURPLE")
                    .setTitle(`${message.guild.name} Amarishop`)
                ],
                components: [
                    new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                        .setLabel("Purchase")
                        .setCustomId('buy')
                        .setStyle("PRIMARY")
                    )
                ]
            })
            const filter = (b) => {
                if (b.user.id === message.author.id) return true;
                return b.reply({
                    content: "<:nx_cross:914921124670890064> This is not for you.",
                    ephemeral: true
                })
            };
            let collector = await m.createMessageComponentCollector({
                filter: filter,
                time: 120000
            });

            collector.on('collect', async (i) => {
                if (i.customId === 'buy') {
                    if (i.member.roles.cache.has(role.id)) {
                        return i.reply({
                            content: `<:nx_cross:914921124670890064> You cannot purchase ${role} again.`,
                            ephemeral: true
                        })
                    } else {
                        if (Timeout.has(`${message.author.id}`)) return i.reply({
                            content: `<:nx_cross:914921124670890064> You need to wait \`${ms(Timeout.get(`${message.author.id}`) - Date.now(), { long: true })}\` before purchasing another rank.`,
                            ephemeral: true
                        })
                        else {
                            Timeout.set(`${message.author.id}`, Date.now() + 21600000)
                            setTimeout(() => {
                                Timeout.delete(`${message.author.id}`)
                            }, 21600000)
                            i.reply({
                                content: `<:nx_tick:910049767910952961> Added ${role}, you can buy the next rank in \`6 Hours\``,
                                ephemeral: true
                            })
                            i.member.roles.add(role.id).catch(() => {})
                            channel.send({
                                content: "<@&779320171990876160>",
                                embeds: [
                                    new Discord.MessageEmbed()
                                    .addField("<:bp_dot:918074237992988722> Copy Command", `\`\`\`>gl <@${message.author.id}> ${e.level - level}\`\`\``)
                                    .setColor("BLURPLE")
                                    .setTitle(`${message.member.user.tag} wants to purchase ${rank}`)
                                    .setThumbnail(message.author.displayAvatarURL({
                                        dynamic: true
                                    }))
                                ]
                            })
                        }
                    }
                }
            })
            collector.on('end', (mes, r) => {
                if (r == 'time') {
                    m.edit({
                        components: [new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setLabel("Purchase").setCustomId('buy').setStyle("PRIMARY").setDisabled(true))]
                    })
                }
            })
        } else {
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .addField("<:bp_dot:918074237992988722> Required Roles", reqrole)
                    .addField("<:bp_dot:918074237992988722> Required Levels", reqlevel)
                    .addField("<:bp_dot:918074237992988722> Calculations", calc)
                    .addField("<:bp_dot:918074237992988722> Perks", perks)
                    .setColor("BLURPLE")
                    .setTitle(`${message.guild.name} Amarishop`)
                    .setFooter({
                        text: "You can purchase once you gain all requirements."
                    })
                ]
            })
        }


    }
}