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
  firstname:{
    type:String,
    required:false,
  },
  lastname:{
    type:String,
    required:false,
  },
  clicks:{
    type:Number,
    default:0,
  },
  gold:{
    type:Number,
    default:0,
  },
  pickaxe:{
    type:String,
    default:"bronze",
  },
})

const User = module.exports = mongoose.model('User', UserSchema)
