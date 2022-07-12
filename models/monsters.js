const mongoose = require('mongoose');

const MonsterSchema = mongoose.Schema({
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
  _mapId:{
    type:mongoose.Types.ObjectId,
    required:false,

  }
})

const Monster = module.exports = mongoose.model('Monster', MonsterSchema);
