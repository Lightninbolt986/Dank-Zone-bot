const mongoose = require(`mongoose`);
const profileSchema = new mongoose.Schema({
  userID: {
    type: String,
    require: true,
    unique: true
  },
  dono: {
    type: Number,
    require:true,
    default:0
  }
})

const model = mongoose.model(`DZProileModels`, profileSchema);

module.exports = model;