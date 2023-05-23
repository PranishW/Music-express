const mongoose = require('mongoose')
const MusicSchema = mongoose.Schema({
    songname:String,
    film:String,
    director:String,
    singer:String
});
module.exports = new mongoose.model('songdetails',MusicSchema);