const Discord = require('discord.js')
module.exports = {
    name: 'buttonroles',
    aliases: ['br'],
    async execute(message, args, cmd, client) {
        const Nuggies = require('nuggies')
        const brmanager = new Nuggies.buttonroles();
        const string = `<a:dz_TadaHype:938064242551160832> - <@&750641095762772009>\n<:dz_tada:938068691881443360> - <@&750641090599845908>\n<a:PepeRobber:798229151688556594> - <@&750641099953012816>\n<a:dz_OtherHeist:938064569656541214> - <@&750686064804626473>\n<:dz_memeCoin:938066471668555859> - <@&750641069686784010>\n<:dz_mafia:880288917088272424> - <@&750686031250194462>\n<:dz_tea:938069171927937054> - <@&750686071012065361>\n<:dz_bingo:880289332689240125> - <@&752776574541103146>\n<a:dz_uno:880289125863915631> - <@&752873162877698059>\n<a:dz_lasttoleave:880289451249655858> - <@&784697956849942569>\n<a:dz_minigameping:880289572779618354> - <@&752934386504040511>\n<:dz_rumble:880289670557216829> - <@&879959072248594453>\n<a:dz_Announcement:938064777287180318> - <@&750641105267064874>\n<a:dz_Partner:938064863924719687> - <@&750686069451784222>\n<a:dz_ReviveChat:938064940793757807> - <@&750641104323477565>\n<a:dz_NoPing:938065232427905044> - <@&760426829747060736>\n<a:dz_nitro:938065440549265420> - <@&751015029125546024>\n<:dz_bump:938063956826787881>  - <@&775017615294464001>`
        string.split('\n').map(e => {
            return {
                color: 'SECONDARY',
                label: '​',
                emoji: e.split(' - ')[0].split(':').at(-1).split('>')[0],
                role: e.split(' - ')[1].split('&')[1].split('>')[0]

            }
        }).forEach(r => {
            brmanager.addrole(r)
        })
        const embed = new Discord.MessageEmbed()
            .setTitle('Button roles!')
            .setDescription(string)
            .setColor('#2C2F33')
            .setThumbnail(message.guild.iconURL())
            .setFooter({
                text: 'Click'
            })
            .setTimestamp();
        Nuggies.buttonroles.create(client, {
            message: message,
            content: embed,
            role: brmanager,
            channelID: message.channel.id
        })
    }
}