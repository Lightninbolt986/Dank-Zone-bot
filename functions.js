module.exports = {
    bar: function (finalval) {
        const full = "<:bp_full:920060141943029780>"
        const start = "<:bp_str:920059865785835530>"
        const empty = "<:bp_mt:920060097131061259>"
        const half = "<:bp_5:920060037815205928>"
        const zero = "<:bp_0:920059944580051024>"
        const eempty = "<:bp_e:920060587009015818>"
        const efull = "<:bp_ef:920060292942155796>"
        const ehalf = "<:bp_e5:920060255889666048>"
        const ezero = "<:bp_e0:920060208007479376>"

        if (finalval >= 100) {
            bar = `${start + full + full + full + full + full + full + full + full + full + efull}`
        } else if (finalval < 100 && finalval >= 95) {
            bar = `${start + full + full + full + full + full + full + full + full + full + ehalf}`
        } else if (finalval < 95 && finalval >= 90) {
            bar = `${start + full + full + full + full + full + full + full + full + full + ezero}`
        } else if (finalval < 90 && finalval >= 85) {
            bar = `${start + full + full + full + full + full + full + full + full + half + eempty}`
        } else if (finalval < 85 && finalval >= 80) {
            bar = `${start + full + full + full + full + full + full + full + full + zero + eempty}`
        } else if (finalval < 80 && finalval >= 75) {
            bar = `${start + full + full + full + full + full + full + full + half + empty + eempty}`
        } else if (finalval < 75 && finalval >= 70) {
            bar = `${start + full + full + full + full + full + full + full + zero + empty + eempty}`
        } else if (finalval < 70 && finalval >= 65) {
            bar = `${start + full + full + full + full + full + full + half + empty + empty + eempty}`
        } else if (finalval < 65 && finalval >= 60) {
            bar = `${start + full + full + full + full + full + full + zero + empty + empty + eempty}`
        } else if (finalval < 60 && finalval >= 55) {
            bar = `${start + full + full + full + full + full + full + zero + empty + empty + eempty}`
        } else if (finalval < 55 && finalval >= 50) {
            bar = `${start + full + full + full + full + full + zero + empty + empty + empty + eempty}`
        } else if (finalval < 50 && finalval >= 45) {
            bar = `${start + full + full + full + full + half + empty + empty + empty + empty + eempty}`
        } else if (finalval < 45 && finalval >= 40) {
            bar = `${start + full + full + full + full + zero + empty + empty + empty + empty + eempty}`
        } else if (finalval < 40 && finalval >= 35) {
            bar = `${start + full + full + full + half + empty + empty + empty + empty + empty + eempty}`
        } else if (finalval < 35 && finalval >= 30) {
            bar = `${start + full + full + full + zero + empty + empty + empty + empty + empty + eempty}`
        } else if (finalval < 30 && finalval >= 25) {
            bar = `${start + full + full + half + empty + empty + empty + empty + empty + empty + eempty}`
        } else if (finalval < 25 && finalval >= 20) {
            bar = `${start + full + full + zero + empty + empty + empty + empty + empty + empty + eempty}`
        } else if (finalval < 20 && finalval >= 15) {
            bar = `${start + full + half + empty + empty + empty + empty + empty + empty + empty + eempty}`
        } else if (finalval < 15 && finalval >= 10) {
            bar = `${start + full + zero + empty + empty + empty + empty + empty + empty + empty + eempty}`
        } else if (finalval < 10 && finalval >= 5) {
            bar = `${start + half + empty + empty + empty + empty + empty + empty + empty + empty + eempty}`
        } else if (finalval < 5 && finalval >= 0) {
            bar = `${start + zero + empty + empty + empty + empty + empty + empty + empty + empty + eempty}`
        }

        return bar
    },
    commas: function (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    CanGetChannelWithInfo: function (member) {
        let has = false
        let num = 0
        //5$ investor
        if (member.roles.cache.has('782502710099836929')) {
            has = true
            num = num + 10
        }
        //10$ investor 
        if (member.roles.cache.has('782503381070512128')) {
            has = true
            num = num + 5
        }
        //25$ investor
        if (member.roles.cache.has('801348395036835880')) {
            has = true
            num = num + 5
        }
        //50$ investor
        if (member.roles.cache.has('837266511210348544')) {
            has = true
            num = num + 5
        }
        //Double booster
        if (member.roles.cache.has('745564909810614343')) {
            has = true
            num = num + 5
        }
        //Multi booster
        if (member.roles.cache.has('812326743653482507')) {
            has = true
            num = num + 5
        }
        //500M Donator
        if (member.roles.cache.has('772005497762218024')) {
            has = true
            num = num + 5
        }
        //750M Donator
        if (member.roles.cache.has('798558270104010752')) {
            has = true
            num = num + 5
        }
        //Mythic [ IV ]
        if (member.roles.cache.has('930494844160323605')) {
            has = true
            num = num + 5
        }

        return {
            has,
            num
        }
    },
    TextSmall: function (text, length) {
        if (text == null) {
            return "";
        }
        if (text.length <= length) {
            return text;
        }
        text = text.substring(0, length);
        last = text.lastIndexOf(" ");
        text = text.substring(0, last);
        return text + "...";
    },
    CanGetARWithInfo: function (member) {
        let num = 0
        //5$ investor
        if (member.roles.cache.has('782502710099836929')) {
            num++
        }
        //25$ investor
        if (member.roles.cache.has('801348395036835880')) {
            num++
        }
        //Single booster
        if (member.roles.cache.has('768756245993619467')) {
            num++
        }
        //500M Donator
        if (member.roles.cache.has('772005497762218024')) {
            num++
        }
        //750M Donator
        if (member.roles.cache.has('798558270104010752')) {
            num++
        }
        //2.5B Donator
        if (member.roles.cache.has('815507562107633684')) {
            num++
        }
        return {
            has: Boolean(num),
            num
        }
    },
    isNumeric: function (value) {
        return /^-?\d+$/.test(value);
    },
    CanGetRoleWithInfo: function (member) {
        let num = 0
        //50$ investor
        if (member.roles.cache.has('837266511210348544')) {
            num = num+10
        }
        //1B donator
        if (member.roles.cache.has('772005505278935050')) {
            num = num + 10
        }
        //No lifer [ V ]
        if (member.roles.cache.has('930494844160323605')) {
            num = num + 10
        }

        return {
            has: Boolean(num),
            num
        }
    },
    paginate: async function (embeds, message) {
        const Discord = require('discord.js')
        let first = new Discord.MessageButton()
            .setEmoji('<:first2:926539374546542622>')
            .setStyle('SECONDARY')
            .setCustomId(`first`)

        let previous = new Discord.MessageButton()
            .setEmoji('<:back2:926539569623613472>')
            .setStyle('SECONDARY')
            .setCustomId(`previous`)

        let next = new Discord.MessageButton()
            .setEmoji(`<:next2:926539617350611005>`)
            .setStyle('SECONDARY')
            .setCustomId(`next`)

        let last = new Discord.MessageButton()
            .setEmoji(`<:last2:926539452371857438>`)
            .setStyle('SECONDARY')
            .setCustomId(`last`)

        let dfirst = new Discord.MessageButton()
            .setEmoji('<:first2:926539374546542622>')
            .setStyle('SECONDARY')
            .setCustomId(`dfirst`)
            .setDisabled(true)

        let dprevious = new Discord.MessageButton()
            .setEmoji('<:back2:926539569623613472>')
            .setStyle('SECONDARY')
            .setCustomId(`dprevious`)
            .setDisabled(true)

        let dnext = new Discord.MessageButton()
            .setEmoji(`<:next2:926539617350611005>`)
            .setStyle('SECONDARY')
            .setCustomId(`dnext`)
            .setDisabled(true)

        let dlast = new Discord.MessageButton()
            .setEmoji(`<:last2:926539452371857438>`)
            .setStyle('SECONDARY')
            .setCustomId(`dlast`)
            .setDisabled(true)


        let currentPage = 1

        let page = new Discord.MessageButton()
            .setStyle('SECONDARY')
            .setCustomId(`page`)
            .setLabel(`${currentPage}/${embeds.length}`)
            .setDisabled(true)
        let butts = [dfirst, dprevious, page, next, last]
        const m = await message.reply({
            embeds: [embeds[0]],
            components: [new Discord.MessageActionRow().addComponents(butts)]
        })
        const filter = (b) => {
            if (b.user.id === message.author.id) return true;
            return b.reply({
                content: "<:nx_cross:914921124670890064> These are not for you.",
                ephemeral: true
            })
        };
        const collector = await m.createMessageComponentCollector({
            filter: filter,
            time: 300000
        });


        collector.on("collect", async (i) => {
            i.deferUpdate()
            if (i.customId === "first") {
                currentPage = 1

                let page = new Discord.MessageButton()
                    .setStyle('SECONDARY')
                    .setCustomId(`page`)
                    .setLabel(`${currentPage}/${embeds.length}`)
                    .setDisabled(true)

                const buttons = [dfirst, dprevious, page, next, last]
                const components = new Discord.MessageActionRow().addComponents(buttons)

                m.edit({
                    embeds: [embeds[currentPage - 1]],
                    components: [components],
                }).catch(() => {})
            }

            if (i.customId === "previous") {
                currentPage--

                let page = new Discord.MessageButton()
                    .setStyle('SECONDARY')
                    .setCustomId(`page`)
                    .setLabel(`${currentPage}/${embeds.length}`)
                    .setDisabled(true)

                const dbuttons = [dfirst, dprevious, page, next, last]
                const dcomponents = new Discord.MessageActionRow().addComponents(dbuttons)
                const buttons = [first, previous, page, next, last]
                const components = new Discord.MessageActionRow().addComponents(buttons)

                m.edit({
                    embeds: [embeds[currentPage - 1]],
                    components: currentPage > 1 ? [components] : [dcomponents],
                }).catch(() => {})
            }

            if (i.customId === "next") {
                currentPage++

                let page = new Discord.MessageButton()
                    .setStyle('SECONDARY')
                    .setCustomId(`page`)
                    .setLabel(`${currentPage}/${embeds.length}`)
                    .setDisabled(true)

                const dbuttons = [first, previous, page, dnext, dlast]
                const dcomponents = new Discord.MessageActionRow().addComponents(dbuttons)
                const buttons = [first, previous, page, next, last]
                const components = new Discord.MessageActionRow().addComponents(buttons)

                m.edit({
                    embeds: [embeds[currentPage - 1]],
                    components: currentPage < embeds.length ? [components] : [dcomponents],
                }).catch(() => {})
            }

            if (i.customId === "last") {
                currentPage = embeds.length

                let page = new Discord.MessageButton()
                    .setStyle('SECONDARY')
                    .setCustomId(`page`)
                    .setLabel(`${currentPage}/${embeds.length}`)
                    .setDisabled(true)

                const buttons = [first, previous, page, dnext, dlast]
                const components = new Discord.MessageActionRow().addComponents(buttons)

                m.edit({
                    embeds: [embeds[currentPage - 1]],
                    components: [components],
                }).catch(() => {})
            }
        });

        collector.on('end', (mes, r) => {
            if (r == 'time') {
                let lpage = new Discord.MessageButton()
                    .setStyle('SECONDARY')
                    .setCustomId(`page`)
                    .setLabel(`${currentPage}/${embeds.length}`)
                    .setDisabled(true)

                const dbutts = [dfirst, dprevious, lpage, dnext, dlast]
                m.edit({
                    embeds: [embeds[currentPage - 1]],
                    components: [new Discord.MessageActionRow().addComponents(dbutts)]
                })
            }
        })
    },
    isColor: function (color) {
        if (!color) return undefined
        if (color.includes("#")) {
            color = color.split("#")[1]
        }
        return typeof color === 'string' &&
            color.length === 6 &&
            !isNaN(Number('0x' + color))

    }

}