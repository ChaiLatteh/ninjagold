const mongoose = require('mongoose');

const MapSchema = mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
})

const Map = module.exports = mongoose.model('Map', MapSchema);
