module.exports = {
    name: 'afk',
    aliases: ['away'],
    async execute(message, args, a, b, c, profileData) {
        const afkreason = args.join(' ') || 'AFK';
        profileData.is_afk = true;
        profileData.afkreason = afkreason;
        profileData.afkPings = []
        await profileData.save()
        message.channel.send(`You are now afk for: **\`${afkreason}\`**`, {
            allowedMentions: {
                roles: [],
                users: [],
                parse: []
            }
        });

    }
}