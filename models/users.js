var mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
  gold:{
    type:Number,
    default:0,
  }
})

const User = module.exports = mongoose.model('User', UserSchema)
