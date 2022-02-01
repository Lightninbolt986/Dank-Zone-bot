const Discord = require('discord.js')
module.exports = {
    name: 'ping',
    aliases: ['pong'],
    async execute(message, args, cmd, client) {
        const pingingEmbed = new Discord.MessageEmbed()
            .setColor('BLURPLE')
            .setDescription(`**Calculating ping...**`)
            .setFooter({text: 'Slow lol?'})
        message.reply({
            embeds: [pingingEmbed]
        }).then((resultMessage) => {
            const pingEmbed = new Discord.MessageEmbed()
                .setColor('BLURPLE')
                .setDescription(`**My ping is** \n\`\`\`yaml\n${client.ws.ping} ms\`\`\``)
            resultMessage.edit({
                embeds: [pingEmbed]
            })
        })
    }
}