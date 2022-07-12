const express = require('express');
var bcrypt = require('bcrypt');
const router = express.Router();


const User = require('../models/users');
const Hero = require('../models/heroes');
const Monster = require('../models/monsters');
const Map = require('../models/maps');
const Core = require('../models/cores');


//USERS
//register new user
router.post('/user', (req, res, next)=>{
  User.findOne({username:req.body.username}, (err, user)=>{
    if(user==null){
      let newUser = new User(req.body);
      bcrypt.genSalt(9, function(err, salt){
        if(err){
          return res.json({msg: err});
        }
        bcrypt.hash(newUser.password, salt, function(err, hash){
          if(err){
            return res.json({msg: err});
          }
          newUser.password=hash;
          newUser.save((err, newUser)=>{
            if(err){
              return res.sendStatus(500);
            }
            else{
              return res.json(newUser);
            }
          })
        })
      })
    }
    else{
      return res.json("Username already exists.");
    }
  })
});


router.post('/login', (req, res, next)=>{
  User.findOne({username:req.body.username}, (err, user)=>{
    if(!user){
      return res.json("Username not found.");
    }
    else if(user){
      bcrypt.compare(req.body.password, user.password, function(err, isMatch){
        if(err){
          return res.json("Something went wrong.");
        }
        else if(isMatch==true){
          req.session.user = user;
          return res.json(user);
        }
        else if(isMatch==false){
          return res.json("Username or Password does not match.");
        }
      })
    }
  })
});

router.get('/current', (req, res, next)=>{
  if(!req.session.user){
    return res.json("No user in session.");
  }
  else{
    User.findOne({username:req.session.user.username}, (err,user)=>{
      req.session.user = user;
      return res.json(req.session.user);
    })
  }
});

router.get('/update', (req, res, next)=>{
  if(req.session.user){
    console.log(req.session.user);
    return res.json(req.session.user);
  }
})

router.post('/gold', (req, res, next)=>{
  if(req.session.user){
    User.findOne({username: req.session.user.username}, (err, user)=>{
      if(err){
        return res.json("failed");
      }
      else if(user){
        user.gold+=1;
        user.save();
        req.session.user = user;
        return res.json(user);
      }
    })

  }

})

router.get('/users', (req, res, next)=>{
  User.find(function(err, users){
    return res.json(users);
  }).sort({gold:-1});
});

router.delete('/user', (req, res, next)=>{
  User.deleteMany({}).then(function(){
    return res.json({msg: 'All users have been deleted'});
  }).catch(function(error){
    return res.json({msg: err});
  })

});

router.get('/logout', (req, res, next)=>{
  req.session.destroy();
  return res.json(req.session);
});
//END OF USERS

//DATA
//get ALL monsters
router.get('/monsters', (req, res, next)=>{
  Monster.find((err, monsters)=>{
    if(err){
      console.log(err);
      return res.json({msg: "Error getting monsters list"});
    }
    else{
      return res.json(monsters);
    }
  })
});

//add new monster
router.post('/monster', (req, res, next)=>{
  let newMonster = new Monster({
    name: req.body.name,
    type: req.body.type,
    level: req.body.level,
  });
  newMonster.save((err, monster)=>{
    if(err){
      return res.json({msg: err});
    }
    else{
      return res.json(monster);
    }
  });
});

//populate all maps
router.get('/maps', (req, res, next)=>{
  Map.find((err, maps)=>{
    if(err){
      console.log(err);
      return res.json("Error getting the list");
    }
    else{
      return res.json(maps);
    }
  })
});
//add new map
router.post('/map', (req, res, next)=>{
  let newMap = new Map({
    name: req.body.name,
  })
  newMap.save((err, map)=>{
    if(err){
      return res.json("Couldn't create map");
    }
    else{
      return res.json(map);
    }
  })
});

//delete a monster
router.delete('/monster/:id', (req, res, next)=>{
  Monster.deleteOne({_id:req.params.id}, function(err, result){
    if(err){
      return res.json(err);
    }
    else{
      return res.json(result);
    }
  });
});

//delete ALL monsters
router.delete('/monster', (req, res, next)=>{
  Monster.deleteMany().then(function(){
    console.log("success!")
  }).catch(function(error){
    console.log(error);
  })

});
//END OF MONSTERS


module.exports = router;
