const mongoose = require(`mongoose`);
const channelSchema = new mongoose.Schema({
    ChannelID: {
        type: String
    },
    OwnerID: {
        type: String
    },
    MembersID: {
        type: Array
    }
})

const model = mongoose.model(`DZChannelSchema`, channelSchema);

module.exports = model;