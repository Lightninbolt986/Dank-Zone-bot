const Discord = require("discord.js");
const bar = require('../../functions').bar

module.exports = {
    name: 'checkdono',
    aliases: ['check', 'dncheck', 'c', 'progress'],
    async execute(m, args, cmd, client, d, p) {
        const taggedUser = m.mentions.members.first() || m.guild.members.cache.get(args[0]);
        if (!taggedUser) {

            let goal
            if (p.dono >= 2500000000) { goal = "Completed" }
            else if (p.dono >= 1000000000 && p.dono < 2500000000) { goal = 2500000000 }
            else if (p.dono >= 750000000 && p.dono < 1000000000) { goal = 1000000000 }
            else if (p.dono >= 500000000 && p.dono < 750000000) { goal = 750000000 }
            else if (p.dono >= 250000000 && p.dono < 500000000) { goal = 500000000 }
            else if (p.dono >= 100000000 && p.dono < 250000000) { goal = 250000000 }
            else if (p.dono >= 50000000 && p.dono < 100000000) { goal = 100000000 }
            else if (p.dono >= 25000000 && p.dono < 50000000) { goal = 50000000 }
            else if (p.dono >= 10000000 && p.dono < 25000000) { goal = 25000000 }
            else if (p.dono >= 5000000 && p.dono < 10000000) { goal = 10000000 }
            else if (p.dono >= 1000000 && p.dono < 5000000) { goal = 5000000 }
            else if (p.dono < 1000000) { goal = 1000000 }

            let goalbar
            let finalgoal
            if (goal !== "Completed") {
                goalbar = bar(p.dono / goal * 100)
                finalgoal = `⏣ ${commas(p.dono)} / ⏣ ${commas(goal)}`
            } else {
                finalgoal = `Completed`
                goalbar = bar(100)
            }

            m.reply({
                embeds: [new Discord.MessageEmbed()
                    .setColor("BLURPLE")
                    .setDescription(`<a:bp_moon:935485565288190012> **Donation stats**\n<:bp_replycont:905405321277763624> User : \`${m.author.tag}\`\n<:bp_reply:905405401946783804> Total Donation : \`⏣ ${commas(p.dono)}\`\n\n<a:bp_moon:935485565288190012> **Goal Progress**\n<:bp_replycont:905405321277763624> \`${finalgoal}\`\n<:bp_reply:905405401946783804> ${goalbar}`)]
            })

        } else {
            const profileModel = require("../../models/profileSchema");
            let profileData;
            try {
                profileData = await profileModel.findOne({
                    userID: taggedUser.id
                });
                if (!profileData) {
                    let profile = await profileModel.create({
                        userID: taggedUser.id,
                        dono: 0
                    });
                    profile.save();
                }
            } catch (err) {
                console.log(err);
            }

            let goal
            if (profileData.dono >= 2500000000) { goal = "Completed" }
            else if (profileData.dono >= 1000000000 && profileData.dono < 2500000000) { goal = 2500000000 }
            else if (profileData.dono >= 750000000 && profileData.dono < 1000000000) { goal = 1000000000 }
            else if (profileData.dono >= 500000000 && profileData.dono < 750000000) { goal = 750000000 }
            else if (profileData.dono >= 250000000 && profileData.dono < 500000000) { goal = 500000000 }
            else if (profileData.dono >= 100000000 && profileData.dono < 250000000) { goal = 250000000 }
            else if (profileData.dono >= 50000000 && profileData.dono < 100000000) { goal = 100000000 }
            else if (profileData.dono >= 25000000 && profileData.dono < 50000000) { goal = 50000000 }
            else if (profileData.dono >= 10000000 && profileData.dono < 25000000) { goal = 25000000 }
            else if (profileData.dono >= 5000000 && profileData.dono < 10000000) { goal = 10000000 }
            else if (profileData.dono >= 1000000 && profileData.dono < 5000000) { goal = 5000000 }
            else if (profileData.dono < 1000000) { goal = 1000000 }

            let goalbar
            let finalgoal
            if (goal !== "Completed") {
                goalbar = bar(profileData.dono / goal * 100)
                finalgoal = `⏣ ${commas(profileData.dono)} / ⏣ ${commas(goal)}`
            } else {
                finalgoal = `Completed`
                goalbar = bar(100)
            }

            m.reply({
                embeds: [new Discord.MessageEmbed()
                    .setColor("BLURPLE")
                    .setDescription(`<a:bp_moon:935485565288190012> **Donation stats**\n<:bp_replycont:905405321277763624> User : \`${taggedUser.user.tag}\`\n<:bp_reply:905405401946783804> Total Donation : \`⏣ ${commas(profileData.dono)}\`\n\n<a:bp_moon:935485565288190012> **Goal Progress**\n<:bp_replycont:905405321277763624> \`${finalgoal}\`\n<:bp_reply:905405401946783804> ${goalbar}`)]
            })
        }
    }
}

function commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
