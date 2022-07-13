const express = require('express');
var bcrypt = require('bcrypt');
const router = express.Router();


const User = require('../models/users');


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
          console.log(req.session.user);
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
  console.log(req.session.user);
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

router.post('/mine', (req, res, next)=>{
  console.log(req.session.user);
  if(req.session.user){
    User.findOne({username: req.session.user.username}, (err, user)=>{
      if(err){
        return res.json("failed");
      }
      else if(user){
        user.clicks+=1;
        if(user.pickaxe=="bronze"){
          user.gold+=1;
        }
        else if(user.pickaxe=="silver"){
          user.gold+=2;
        }
        else if(user.pickaxe=="gold"){
          user.gold+=3;
        }
        else if(user.pickaxe=="platinum"){
          user.gold+=4;
        }
        else if(user.pickaxe=="diamond"){
          user.gold+=5;
        }
        user.save();
        req.session.user = user;
        return res.json(user);
      }
    })
  }
})

router.post('/upgrade', (req, res, next)=>{
  if(req.session.user){
    User.findOne({username: req.session.user.username}, (err, user)=>{
      if(err){
        return res.json("failed");
      }
      else if(user.pickaxe=="bronze" && user.gold>=100){
        user.gold=user.gold-100;
        user.pickaxe="silver";
      }
      else if(user.pickaxe=="silver" && user.gold>=300){
        user.gold=user.gold-300;
        user.pickaxe="gold";
      }
      else if(user.pickaxe=="gold"){
        user.pickaxe="platinum";
      }
      else if(user.pickaxe=="platinum"){
        user.pickaxe="diamond";
      }
      else{
        return res.json("Why you tryna cheat? lol");
      }
      user.save();
      req.session.user = user;
      return res.json(user);
    })
  }
})

router.post('/reset', (req, res,next)=>{
  User.findOne({username:req.session.user.username}, (err, user)=>{
    user.gold=0;
    user.pickaxe="bronze";
    user.clicks=0;
    user.save();
    return res.json(user);
  })
})

router.get('/users', (req, res, next)=>{
  User.find(function(err, users){
    return res.json(users);
  }).sort({clicks:-1});
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



module.exports = router;
