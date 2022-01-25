const Discord = require('discord.js');
const ms = require("ms")
const emotes = require("../../Data/emotes.json");
const commas = require('../../functions').commas
module.exports = {
    name: 'donate',
    async execute(message, args) {

        if(message.channel.id !== "744488316338176020"){
            return message.reply(`${emotes.cross} Please use this command in <#744488316338176020>`)
        }
        if (!args.slice(1).join(" ")) {
            return message.reply(`${emotes.cross} Incorrect Syntax.\n**Syntax:** \`${process.env.prefix}donate <prize>/<duration>/<winners>/<requirement>/<message>\``)
        }
        if (!args.slice(1).join(" ").includes("/")) {
            return message.reply(`${emotes.cross} Arguments must be separated by \`/\`\n**Syntax:** \`${process.env.prefix}donate <prize>/<duration>/<winners>/<requirement>/<message>\``)
        }
        let m = args.slice(1).join(" ").split("/")

        let pingrole

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[ PRIZE - DMC ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        let pri = m[0]
        let prize
        if (!pri) { return message.reply(`${emotes.cross} Not a valid amount of prize\n**Syntax:** \`${process.env.prefix}donate <prize>/<duration>/<winners>/<requirement>/<message>\``) }

        if (pri.toLowerCase().includes("m")) {
            p = pri.toLowerCase().replace("m", "")
            prize = parseInt(p * 1000000)
        }
        else if (pri.toLowerCase().includes("k")) {
            p2 = pri.toLowerCase().replace("k", "")
            prize = parseInt(p * 1000)
        }
        else {
            prize = parseInt(pri)
        }
        if (!prize || isNaN(prize)) { return message.reply(`${emotes.cross} Not a valid amount of prize`) }
        //less than 250k dmc
        if (prize < 250000) {
            return message.reply(`${emotes.cross} Prize must be above \`⏣ 250,000\``)
        }
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[ DURATION ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   
        if (!m[1]) { return message.reply(`<:nx_cross:914921124670890064> That's not a valid time. \`Format example: 5h, 5m, 5s\`\n**Syntax:** \`${process.env.prefix}donate <prize>/<duration>/<winners>/<requirement>/<message>\``) }
        let duration = ms(m[1])
        if (!duration) return message.reply(`<:nx_cross:914921124670890064> That's not a valid time. \`Format example: 5h, 5m, 5s\`\n**Syntax:** \`${process.env.prefix}donate <prize>/<duration>/<winners>/<requirement>/<message>\``)
        //if time is more than 2mins
        if (duration > 120000) {
            //ping = giveaway ping
            pingrole = "750641095762772009"
            //if prize is more than 500k
            if (prize >= 500000) {
                //time max = 2hrs
                if (duration > 7200000) { return message.reply("<:nx_cross:914921124670890064> Time should be less than 2 hrs") }
            }
            //if prize is less than 500k
            else if (prize < 500000) {
                //time max = 30mins
                if (duration > 1800000) { return message.reply("<:nx_cross:914921124670890064> Time should be less than 30 mins") }

            }
        }
        //if time is less than 2mins
        else if (duration <= 120000) {
            pingrole = "750641090599845908"
        }
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[ WINNERS ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        let winners = parseInt(m[2])
        if (!winners || isNaN(winners)) { return message.reply(`${emotes.cross} Not a valid number of winners\n**Syntax:** \`${process.env.prefix}donate <prize>/<duration>/<winners>/<requirement>/<message>\``) }
        if (winners > 20) { return message.reply(`${emotes.cross} Winner should not be more than \`20\``) }

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[ REQUIREMENT ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        let req
        let reqroles = []
        let finalreq;

        let isreq = m[3]
        if (!isreq) {
            return message.reply(`${emotes.cross} You must enter a valid \`roleId\` or \`none\`\n**Syntax:** \`${process.env.prefix}donate <prize>/<duration>/<winners>/<requirement>/<message>\``)
        }
        if (isreq.toLowerCase() === "none") {
            req = "none"
        }
        if (req !== "none") {

            if (isreq.includes(",")) {
                let r = isreq.split(",")

                r.forEach(id => {
                    if (message.guild.roles.cache.get(id)) {
                        reqroles.push(id)
                    }
                });
                if (reqroles.length < 1) {
                    return message.reply(`${emotes.cross} No valid roles were provided.\n**Syntax:** \`${process.env.prefix}donate <prize>/<duration>/<winners>/<requirement>/<message>\``)
                }
            }
            else {
                if (message.guild.roles.cache.get(isreq)) {
                    reqroles.push(isreq)
                } else {
                    return message.reply(`${emotes.cross} \`${isreq}\` is not a valid roleId`)
                }
            }
        }
        if (req === "none") {
            finalreq === "None"
        } else {
            finalreq === `<@&${reqroles.join(">, <@&")}>`
        }

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[ MESSAGE ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        let msg
        let ismsg = m[4]
        if (!ismsg) {
            return message.reply(`${emotes.cross} You must enter a valid \`message\` or \`none\`\n**Syntax:** \`${process.env.prefix}donate <prize>/<duration>/<winners>/<requirement>/<message>\``)
        }
        if (ismsg.toLowerCase() === "none") {
            msg = "none"
        }

        let channel
        if (reqroles.includes("768756245993619467") || reqroles.includes("745564909810614343")) {
            channel = message.guild.channels.cache.get("795847001111658566")
            pingrole = '768756245993619467'
        } else {
            if (prize < 500000) {
                channel = message.guild.channels.cache.get("744487909800935524")
            } else {
                channel = message.guild.channels.cache.get("744486006174122095")
            }
        }



        const componentsArray = [
            {
                type: 1,
                components: [
                    {
                        type: 2,
                        style: 'PRIMARY',
                        custom_id: "Accept",
                        label: "Accept",
                    },
                    {
                        type: 2,
                        style: 'DANGER',
                        custom_id: "Cancel",
                        label: "Cancel",
                    },
                    {
                        type: 2,
                        style: 'PRIMARY',
                        custom_id: "Start",
                        label: "Start",
                    },
                ],
            },
        ];

        componentsArray[0].components[2].disabled = true;
        const mssg = await message.channel.send({
            embeds: [new Discord.MessageEmbed()
                .setAuthor(`${message.member.user.tag} wants to donate...`)
                .addFields(
                    { name: `${emotes.dot}Prize`, value: `\`\`\`\n⏣ ${commas(prize.toString())}\`\`\`` },
                    { name: `${emotes.dot}Time`, value: `\`\`\`\n${ms(duration, { long: true })}\`\`\`` },
                    { name: `${emotes.dot}Winners`, value: `\`\`\`\n${winners} winner(s)\`\`\`` },
                    { name: `${emotes.dot}Message`, value: msg === "none" ? `\`\`\`\nNone\`\`\`` : `\`\`\`\n${m[4]}\`\`\`` },
                    { name: `${emotes.dot}Requirement`, value: req === "none" ? `\`\`\`\nNone\`\`\`` : `<@&${reqroles.join(">, <@&")}>` },

                )
                .setColor("BLURPLE")],
            content: "<@&752930180565172274>",
            components: componentsArray
        })
        message.delete().catch(() => { })

        const collector = await mssg.createMessageComponentCollector({
            componentType: 'BUTTON',
            time: 60000 * 60
        });

        collector.on('collect', async i => {
            if (!i.member.roles.cache.has("752930180565172274")) {
                return i.reply({ content: `${emotes.cross} You are not a giveaway manager`, ephemeral: true })
            }
            if (i.customId === "Accept") {
                componentsArray[0].components[0].disabled = true;
                componentsArray[0].components[1].disabled = true;
                componentsArray[0].components[2].disabled = false;
                await mssg.edit({
                    components: componentsArray,
                })
                await i.reply({ content: `${message.author}, your request has been accepted. Please send \`⏣ ${commas(prize.toString())}\` ${i.member.user}` })
            }
            if (i.customId === "Cancel") {
                componentsArray[0].components[0].disabled = true;
                componentsArray[0].components[1].disabled = true;
                componentsArray[0].components[2].disabled = true;
                await mssg.edit({
                    components: componentsArray,
                })
                collector.stop('time')
                await i.reply({ content: `Sorry ${message.author}, but your request has been declined by ${i.member.user}` })
            }
            if (i.customId === "Start") {
                componentsArray[0].components[0].disabled = true;
                componentsArray[0].components[1].disabled = true;
                componentsArray[0].components[2].disabled = true;
                await mssg.edit({
                    components: componentsArray,
                })

                const giveawayArray = [
                    {
                        type: 1,
                        components: [
                            {
                                type: 2,
                                style: 'PRIMARY',
                                custom_id: "join",
                                label: "Join - 0",
                            },
                            {
                                type: 2,
                                style: 'PRIMARY',
                                custom_id: "end",
                                label: "End",
                            },
                            {
                                type: 2,
                                style: 'PRIMARY',
                                custom_id: "entries",
                                label: "Entries",
                            },
                        ],
                    },
                ];

                embedarray = []
                if (req === 'none' && msg === 'none') {
                    embedarray.push(new Discord.MessageEmbed()
                        .setColor('BLURPLE')
                        .setDescription(`<:bp_gift:923106198906093619> **⏣ ${commas(prize.toString())}**\n<:bp_replycont:905405321277763624> Hosted by: ${i.member.user}\n<:bp_replycont:905405321277763624> Sponsored by: ${message.author}\n<:bp_reply:905405401946783804> Duration: ${ms(duration, { long: true })} (ends <t:${Math.round(Date.now() / 1000) + (duration / 1000)}:R>)`)
                        .setFooter(`Winners(s): ${winners} | Ends At`)
                        .setTimestamp(Date.now() + duration))
                }
                if (req === 'none' && msg !== 'none') {
                    embedarray.push(new Discord.MessageEmbed()
                        .setColor('BLURPLE')
                        .setDescription(`<:bp_gift:923106198906093619> **⏣ ${commas(prize.toString())}**\n<:bp_replycont:905405321277763624> Hosted by: ${i.member.user}\n<:bp_replycont:905405321277763624> Sponsored by: ${message.author}\n<:bp_replycont:905405321277763624> Duration: ${ms(duration, { long: true })} (ends <t:${Math.round(Date.now() / 1000) + (duration / 1000)}:R>)\n<:bp_reply:905405401946783804> Message: ${m[4]}`)
                        .setFooter(`Winners(s): ${winners} | Ends At`)
                        .setTimestamp(Date.now() + duration))

                }
                if (req !== 'none' && msg === 'none') {
                    embedarray.push(new Discord.MessageEmbed()
                        .setColor('BLURPLE')
                        .setDescription(`<:bp_gift:923106198906093619> **⏣ ${commas(prize.toString())}**\n<:bp_replycont:905405321277763624> Hosted by: ${i.member.user}\n<:bp_replycont:905405321277763624> Sponsored by: ${message.author}\n<:bp_replycont:905405321277763624> Requirement: <@&${reqroles.join(">, <@&")}>\n<:bp_reply:905405401946783804> Duration: ${ms(duration, { long: true })} (ends <t:${Math.round(Date.now() / 1000) + (duration / 1000)}:R>)`)
                        .setFooter(`Winners(s): ${winners} | Ends At`)
                        .setTimestamp(Date.now() + duration))
                }
                if (req !== 'none' && msg !== 'none') {
                    embedarray.push(new Discord.MessageEmbed()
                        .setColor('BLURPLE')
                        .setDescription(`<:bp_gift:923106198906093619> **⏣ ${commas(prize.toString())}**\n<:bp_replycont:905405321277763624> Hosted by: ${i.member.user}\n<:bp_replycont:905405321277763624> Sponsored by: ${message.author}\n<:bp_replycont:905405321277763624> Requirement: <@&${reqroles.join(">, <@&")}>\n<:bp_replycont:905405321277763624> Duration: ${ms(duration, { long: true })} (ends <t:${Math.round(Date.now() / 1000) + (duration / 1000)}:R>)\n<:bp_reply:905405401946783804> Message: ${m[4]}`)
                        .setFooter(`Winners(s): ${winners} | Ends At`)
                        .setTimestamp(Date.now() + duration))
                }

                const giveawaymsg = await channel.send({
                    embeds: embedarray,
                    content: `<@&${pingrole}>`,
                    components: giveawayArray
                })

                let url = giveawaymsg.url
                let link = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setLabel('Jump').setStyle("LINK").setURL(`${url}`))

                // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[ COLLECTOR ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                let giveawaycollector = await giveawaymsg.createMessageComponentCollector({ time: duration });
                let participants = []

                // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[ INTERVAL ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                interval = setInterval(async () => {
                    giveawayArray[0].components[0].label = `Join - ${participants.length}`
                    giveawaymsg.edit({
                        components: giveawayArray
                    }).catch(() => { })
                }, 10000);

                giveawaycollector.on('collect', async (i) => {

                    //button - join
                    if (i.customId === 'join') {
                        //if no requirement
                        if (req === 'none') {
                            //if participant not in array
                            if (!participants.includes(i.user.id)) {
                                participants.push(i.user.id);
                                await i.reply({
                                    content: "<:nx_tick:910049767910952961> Successfully joined the giveaway.",
                                    ephemeral: true
                                })
                            }
                            //if already in array 
                            else {
                                await i.reply({
                                    content: "<:nx_cross:914921124670890064> You've already joined the giveaway.",
                                    ephemeral: true
                                })
                            }
                        }
                        //if there is req
                        else {

                            //if participant not in array
                            if (!participants.includes(i.user.id)) {

                                if (i.member.roles.cache.has("930494904617017404") || i.member.roles.cache.has("768756245993619467")) {
                                    participants.push(i.user.id);
                                    await i.reply({
                                        content: "<:nx_tick:910049767910952961> Successfully joined the giveaway.",
                                        ephemeral: true
                                    })
                                } else {
                                    let eee = reqroles.every(role => {
                                        if (i.member.roles.cache.has(role)) {
                                            return true
                                        }
                                        else {
                                            return false
                                        }
                                    })

                                    if (eee) {
                                        participants.push(i.user.id);
                                        await i.reply({
                                            content: "<:nx_tick:910049767910952961> Successfully joined the giveaway.",
                                            ephemeral: true
                                        })
                                    } else {
                                        await i.reply({
                                            content: "<:nx_cross:914921124670890064> You don't meet the requirements for the giveaway.",
                                            ephemeral: true
                                        })
                                    }

                                }
                            }
                            //if already in array
                            else {
                                await i.reply({
                                    content: "<:nx_cross:914921124670890064> You've already joined the giveaway.",
                                    ephemeral: true
                                })
                            }

                        }
                    }
                    //button - entries
                    if (i.customId === 'entries') {
                        //if noone entered
                        if (participants.length < 1) {
                            await i.reply({
                                content: '<:nx_cross:914921124670890064> Nobody entered yet.',
                                ephemeral: true
                            })
                        }
                        //if people entered
                        else if (participants.length >= 1) {
                            await i.reply({
                                embeds: [new Discord.MessageEmbed()
                                    .setColor("BLURPLE")
                                    .setTitle(`Entries [${participants.length}]`)
                                    .setDescription(`<@${participants.join('>, <@')}>`)],
                                ephemeral: true
                            })
                        }
                    }
                    //button - end
                    if (i.customId === 'end') {
                        //if button user is gwmanager
                        if (i.member.roles.cache.has("752930180565172274")) {
                            giveawaycollector.stop('end')
                            await i.reply({ content: "<:nx_tick:910049767910952961> Ended this giveaway.", ephemeral: true })
                        }
                        //if button user is not gwmanager
                        else if (!i.member.roles.cache.has("752930180565172274")) { await i.reply({ content: "<:nx_cross:914921124670890064> You are not a giveaway manager", ephemeral: true }) }
                    }
                })
                //=============================================================================================================
                giveawaycollector.on('end', async () => {
                    //random winners
                    let random = []
                    for (let i = 0; i !== winners; ++i) {
                        let p = participants.filter(e => !random.includes(e))
                        random.push(p[Math.floor(Math.random() * p.length)])
                    }
                    random;

                    //removing undefined
                    let frandom = random.filter(e => Boolean(e));
                    frandom;

                    //final winners
                    let grandom
                    if (winners > 1) { grandom = `<@${frandom.join('>, <@')}>` }
                    else if (winners = 1) { grandom = `<@${frandom}>` }

                    clearInterval(interval)
                    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[ Noone ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    if (participants.length < 1) {
                        nonearray = []
                        if (req === 'none' && msg === 'none') {
                            nonearray.push(new Discord.MessageEmbed()
                                .setColor('BLURPLE')
                                .setDescription(`<:bp_gift:923106198906093619> **⏣ ${commas(prize.toString())}**\n<:bp_replycont:905405321277763624> Hosted by: ${i.member.user}\n<:bp_replycont:905405321277763624> Sponsored by: ${message.author}\n<:bp_replycont:905405321277763624> Duration: Ended\n<:bp_reply:905405401946783804> Winner(s): None`)
                                .setFooter(`Winners(s): ${winners} | Ends At`)
                                .setTimestamp(Date.now() + duration))
                        }
                        if (req === 'none' && msg !== 'none') {
                            nonearray.push(new Discord.MessageEmbed()
                                .setColor('BLURPLE')
                                .setDescription(`<:bp_gift:923106198906093619> **⏣ ${commas(prize.toString())}**\n<:bp_replycont:905405321277763624> Hosted by: ${i.member.user}\n<:bp_replycont:905405321277763624> Sponsored by: ${message.author}\n<:bp_replycont:905405321277763624> Duration: Ended\n<:bp_replycont:905405321277763624> Winner(s): None\n<:bp_reply:905405401946783804> Message: ${m[4]}`)
                                .setFooter(`Winners(s): ${winners} | Ends At`)
                                .setTimestamp(Date.now() + duration))

                        }
                        if (req !== 'none' && msg === 'none') {
                            nonearray.push(new Discord.MessageEmbed()
                                .setColor('BLURPLE')
                                .setDescription(`<:bp_gift:923106198906093619> **⏣ ${commas(prize.toString())}**\n<:bp_replycont:905405321277763624> Hosted by: ${i.member.user}\n<:bp_replycont:905405321277763624> Sponsored by: ${message.author}\n<:bp_replycont:905405321277763624> Requirement: <@&${reqroles.join(">, <@&")}>\n<:bp_replycont:905405321277763624> Duration: Ended\n<:bp_reply:905405401946783804> Winner(s): None`)
                                .setFooter(`Winners(s): ${winners} | Ends At`)
                                .setTimestamp(Date.now() + duration))
                        }
                        if (req !== 'none' && msg !== 'none') {
                            nonearray.push(new Discord.MessageEmbed()
                                .setColor('BLURPLE')
                                .setDescription(`<:bp_gift:923106198906093619> **⏣ ${commas(prize.toString())}**\n<:bp_replycont:905405321277763624> Hosted by: ${i.member.user}\n<:bp_replycont:905405321277763624> Sponsored by: ${message.author}\n<:bp_replycont:905405321277763624> Requirement: <@&${reqroles.join(">, <@&")}>\n<:bp_replycont:905405321277763624> Duration: Ended\n<:bp_replycont:905405321277763624> Winner(s): None\n<:bp_reply:905405401946783804> Message: ${m[4]}`)
                                .setFooter(`Winners(s): ${winners} | Ends At`)
                                .setTimestamp(Date.now() + duration))
                        }
                        giveawaymsg.edit({
                            components: [new Discord.MessageActionRow()
                                .addComponents(
                                    new Discord.MessageButton()
                                        .setLabel('No Entries')
                                        .setStyle("PRIMARY")
                                        .setCustomId("join")
                                        .setDisabled(true)
                                )], embeds: nonearray
                        }).catch(() => { })
                        return giveawaymsg.reply('<:nx_cross:914921124670890064> Not enough participants joined to determine a winner.').catch(() => { })

                        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[ Success winners ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    } else {
                        embed2array = []
                        if (req === 'none' && msg === 'none') {
                            embed2array.push(new Discord.MessageEmbed()
                                .setColor('BLURPLE')
                                .setDescription(`<:bp_gift:923106198906093619> **⏣ ${commas(prize.toString())}**\n<:bp_replycont:905405321277763624> Hosted by: ${i.member.user}\n<:bp_replycont:905405321277763624> Sponsored by: ${message.author}\n<:bp_replycont:905405321277763624> Duration: Ended\n<:bp_reply:905405401946783804> Winner(s): ${grandom}`)
                                .setFooter(`Winners(s): ${winners} | Ends At`)
                                .setTimestamp(Date.now() + duration))
                        }
                        if (req === 'none' && msg !== 'none') {
                            embed2array.push(new Discord.MessageEmbed()
                                .setColor('BLURPLE')
                                .setDescription(`<:bp_gift:923106198906093619> **⏣ ${commas(prize.toString())}**\n<:bp_replycont:905405321277763624> Hosted by: ${i.member.user}\n<:bp_replycont:905405321277763624> Sponsored by: ${message.author}\n<:bp_replycont:905405321277763624> Duration: Ended\n<:bp_replycont:905405321277763624> Winner(s): ${grandom}\n<:bp_reply:905405401946783804> Message: ${m[4]}`)
                                .setFooter(`Winners(s): ${winners} | Ends At`)
                                .setTimestamp(Date.now() + duration))

                        }
                        if (req !== 'none' && msg === 'none') {
                            embed2array.push(new Discord.MessageEmbed()
                                .setColor('BLURPLE')
                                .setDescription(`<:bp_gift:923106198906093619> **⏣ ${commas(prize.toString())}**\n<:bp_replycont:905405321277763624> Hosted by: ${i.member.user}\n<:bp_replycont:905405321277763624> Sponsored by: ${message.author}\n<:bp_replycont:905405321277763624> Requirement: <@&${reqroles.join(">, <@&")}>\n<:bp_replycont:905405321277763624> Duration: Ended\n<:bp_reply:905405401946783804> Winner(s): ${grandom}`)
                                .setFooter(`Winners(s): ${winners} | Ends At`)
                                .setTimestamp(Date.now() + duration))
                        }
                        if (req !== 'none' && msg !== 'none') {
                            embed2array.push(new Discord.MessageEmbed()
                                .setColor('BLURPLE')
                                .setDescription(`<:bp_gift:923106198906093619> **⏣ ${commas(prize.toString())}**\n<:bp_replycont:905405321277763624> Hosted by: ${i.member.user}\n<:bp_replycont:905405321277763624> Sponsored by: ${message.author}\n<:bp_replycont:905405321277763624> Requirement: <@&${reqroles.join(">, <@&")}>\n<:bp_replycont:905405321277763624> Duration: Ended\n<:bp_replycont:905405321277763624> Winner(s): ${grandom}\n<:bp_reply:905405401946783804> Message: ${m[4]}`)
                                .setFooter(`Winners(s): ${winners} | Ends At`)
                                .setTimestamp(Date.now() + duration))
                        }

                        giveawaymsg.edit({
                            components: [new Discord.MessageActionRow()
                                .addComponents(
                                    new Discord.MessageButton()
                                        .setLabel(`Joined - ${participants.length}`)
                                        .setStyle("PRIMARY")
                                        .setCustomId("join")
                                        .setDisabled(true))
                                .addComponents(
                                    new Discord.MessageButton()
                                        .setLabel('Reroll')
                                        .setStyle("PRIMARY")
                                        .setCustomId("reroll")
                                )], embeds: embed2array
                        }).catch(() => { })

                        let collector2 = giveawaymsg.createMessageComponentCollector()
                        collector2.on('collect', async (i) => {
                            if (i.member.roles.cache.has("752930180565172274")) {

                                let random2 = participants[Math.floor(Math.random() * participants.length)]
                                let final = `<@${random2}>`
                                //Rerolled winner(s): ${final}
                                rerollembed = []
                                if (req === 'none' && msg === 'none') {
                                    rerollembed.push(new Discord.MessageEmbed()
                                        .setColor('BLURPLE')
                                        .setDescription(`<:bp_gift:923106198906093619> **⏣ ${commas(prize.toString())}**\n<:bp_replycont:905405321277763624> Hosted by: ${i.member.user}\n<:bp_replycont:905405321277763624> Sponsored by: ${message.author}\n<:bp_replycont:905405321277763624> Duration: Ended\n<:bp_reply:905405401946783804> Rerolled winner(s): ${final}`)
                                        .setFooter(`Winners(s): ${winners} | Ends At`)
                                        .setTimestamp(Date.now() + duration))
                                }
                                if (req === 'none' && msg !== 'none') {
                                    rerollembed.push(new Discord.MessageEmbed()
                                        .setColor('BLURPLE')
                                        .setDescription(`<:bp_gift:923106198906093619> **⏣ ${commas(prize.toString())}**\n<:bp_replycont:905405321277763624> Hosted by: ${i.member.user}\n<:bp_replycont:905405321277763624> Sponsored by: ${message.author}\n<:bp_replycont:905405321277763624> Duration: Ended\n<:bp_replycont:905405321277763624> Rerolled winner(s): ${final}\n<:bp_reply:905405401946783804> Message: ${m[4]}`)
                                        .setFooter(`Winners(s): ${winners} | Ends At`)
                                        .setTimestamp(Date.now() + duration))

                                }
                                if (req !== 'none' && msg === 'none') {
                                    rerollembed.push(new Discord.MessageEmbed()
                                        .setColor('BLURPLE')
                                        .setDescription(`<:bp_gift:923106198906093619> **⏣ ${commas(prize.toString())}**\n<:bp_replycont:905405321277763624> Hosted by: ${i.member.user}\n<:bp_replycont:905405321277763624> Sponsored by: ${message.author}\n<:bp_replycont:905405321277763624> Requirement: <@&${reqroles.join(">, <@&")}>\n<:bp_replycont:905405321277763624> Duration: Ended\n<:bp_reply:905405401946783804> Rerolled winner(s): ${final}`)
                                        .setFooter(`Winners(s): ${winners} | Ends At`)
                                        .setTimestamp(Date.now() + duration))
                                }
                                if (req !== 'none' && msg !== 'none') {
                                    rerollembed.push(new Discord.MessageEmbed()
                                        .setColor('BLURPLE')
                                        .setDescription(`<:bp_gift:923106198906093619> **⏣ ${commas(prize.toString())}**\n<:bp_replycont:905405321277763624> Hosted by: ${i.member.user}\n<:bp_replycont:905405321277763624> Sponsored by: ${message.author}\n<:bp_replycont:905405321277763624> Requirement: <@&${reqroles.join(">, <@&")}>\n<:bp_replycont:905405321277763624> Duration: Ended\n<:bp_replycont:905405321277763624> Rerolled winner(s): ${final}\n<:bp_reply:905405401946783804> Message: ${m[4]}`)
                                        .setFooter(`Winners(s): ${winners} | Ends At`)
                                        .setTimestamp(Date.now() + duration))
                                }
                                i.reply({ content: `<:nx_tick:910049767910952961> Rerolled winner.`, ephemeral: true })
                                giveawaymsg.edit({
                                    embeds: rerollembed,
                                })
                                let winembed = new Discord.MessageEmbed()
                                    .setColor("BLURPLE")
                                    .setDescription(`<:bp_gift:923106198906093619> **You've won reroll for:** ⏣ ${commas(prize.toString())}\n<:bp_replycont:905405321277763624> **Total Entries:** ${participants.length}\n<:bp_reply:905405401946783804> **Win probability:** ${1 / participants.length * 100}%`)
                                giveawaymsg.reply({ content: `<:bp_gw:923111015300857887> **Congratulations! ${final}** <:bp_gw:923111015300857887>`, embeds: [winembed] }).catch(() => { })

                                message.guild.members.cache.get(random2).send({ content: `<:bp_gw:923111015300857887> **Congratulations! ${final}** <:bp_gw:923111015300857887>`, embeds: [winembed], components: [link] }).catch(() => { })
                                i.member.user.send({
                                    content: `<:bp_gw:923111015300857887> **Giveaway Rerolled!** <:bp_gw:923111015300857887>`,
                                    embeds: [new Discord.MessageEmbed()
                                        .setColor('BLURPLE')
                                        .addFields(
                                            { name: 'Reroll Winner', value: `${final}` },
                                            { name: 'ID(s)', value: `${random2}` }
                                        )
                                        .setTimestamp()
                                    ],
                                    components: [link]
                                }).catch(() => { })

                            }
                            else if (!i.member.roles.cache.has("752930180565172274")) { return i.reply({ content: "<:nx_cross:914921124670890064> You are not a giveaway manager.", ephemeral: true }) }
                        });

                        let winembed = new Discord.MessageEmbed()
                            .setColor("BLURPLE")
                            .setDescription(`<:bp_gift:923106198906093619> **You have won:** ⏣ ${commas(prize.toString())}\n<:bp_replycont:905405321277763624> **Total Entries:** ${participants.length}\n<:bp_reply:905405401946783804> **Win probability:** ${1 / participants.length * 100}%`)
                        giveawaymsg.reply({ content: `<:bp_gw:923111015300857887> **Congratulations! ${grandom}** <:bp_gw:923111015300857887>`, embeds: [winembed] }).catch(() => { })

                        frandom.forEach(win => {
                            message.guild.members.cache.get(win).send({ content: `<:bp_gw:923111015300857887> **Congratulations! <@${win}>** <:bp_gw:923111015300857887>`, embeds: [winembed], components: [link] }).catch(() => { })
                        })
                        i.member.user.send({
                            content: `<:bp_gw:923111015300857887> **Giveaway Ended!** <:bp_gw:923111015300857887>`,
                            embeds: [new Discord.MessageEmbed()
                                .setColor('BLURPLE')
                                .addFields(
                                    { name: 'Winners', value: `${grandom}` },
                                    { name: 'ID(s)', value: `${frandom.join(', ')}` }
                                )
                                .setTimestamp()
                            ],
                            components: [link]
                        }).catch(() => { })

                    }
                })
                collector.stop('time')
                await i.reply({ content: `${i.member.user}, started giveaway.` })
            }

        })
        collector.on('end', (mes, r) => {
            if (r == 'time') {
                componentsArray[0].components[0].disabled = true;
                componentsArray[0].components[1].disabled = true;
                componentsArray[0].components[2].disabled = true;
                mssg.edit({
                    components: componentsArray,
                })
            }
        })





    }
}




