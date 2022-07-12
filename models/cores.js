const mongoose = require('mongoose');

const CoreSchema = mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  type:{
    type:String,
    required:true,
  },
  level:{
    type:Number,
    required:true,
  },
  _heroId:{
    type:mongoose.Types.ObjectId,
    required:true,
  }
})

const Core = module.exports = mongoose.model('Core', CoreSchema);
