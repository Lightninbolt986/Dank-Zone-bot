const mongoose = require(`mongoose`);
const itemSchema = new mongoose.Schema({
    value: {
        type: Number
    },
    emoji: {
        type: String
    },
    aliases: {
        type: Array
    },
    showname: {
        type: String
    }

})

const model = mongoose.model(`DZItemSchema`, itemSchema);

module.exports = model;