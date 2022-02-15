const mongoose = require(`mongoose`);
const roleSchema = new mongoose.Schema({
    RoleID: {
        type: String
    },
    UserID: {
        type: String
    },
    MembersID: {
        type: Array
    }
})

const model = mongoose.model(`DZRoleSchema`, roleSchema);

module.exports = model;