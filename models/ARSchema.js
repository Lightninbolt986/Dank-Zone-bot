const mongoose = require(`mongoose`);
const ArSchema = new mongoose.Schema({
    UserID: {
        type: String
    },
    ARs: {
        type: Array
    }
})

const model = mongoose.model(`DZARSchema`, ArSchema);

module.exports = model;