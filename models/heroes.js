const mongoose = require('mongoose');

const HeroSchema = mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  level:{
    type:Number,
    default:1,
    required:true,
  },
  _userId:{
    type:mongoose.Types.ObjectId,
    required:true,
  }
})

const Hero = module.exports = mongoose.model('Hero', HeroSchema)
