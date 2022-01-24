module.exports = (Discord, client) => {
console.log('Im ready')
const activities = [{
    name: 'with Chico',
    type: 'PLAYING'
}, {
    name: 'giveaways',
    type: 'WATCHING'
},{
    name:'/botinfo',
    type:'PLAYING'
}]

client.user.setPresence({
    activities: [activities[Math.floor(Math.random() * activities.length)]],
    status: 'online'
});

setInterval(() => {
    client.user.setPresence({
        activities: [activities[Math.floor(Math.random() * activities.length)]],
        status: 'online'
    });
}, 300000)
}