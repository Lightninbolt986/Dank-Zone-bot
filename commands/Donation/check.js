module.exports = {
    name: 'checkdono',

    async execute(m, a, cmd, client, d, p) {
        const taggedUser = m.mentions.users.first();
        if (!taggedUser) {
            m.reply(`dono is ${p.dono}`)
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
            m.reply(`dono is ${profileData.dono}`)


        }
    }

}