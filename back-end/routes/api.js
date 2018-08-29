var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var fs = require('fs');
var User = require("../models/user");
var Post = require("../models/post");
var Message = require("../models/message");


router.post('/signup', function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    
    var bin = req.body.profilepic;
    
    req.body.profilepic = '/img/uploads/profilpic/'+req.body.username+'.png';
    var data = bin.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');
    fs.writeFile('../front/img/uploads/profilpic/'+req.body.username+'.png', buf);

    var newUser = new User({
      username: req.body.username,
      password: req.body.password,
      profilepic: req.body.profilepic
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'+err});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

router.post('/signin', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user, config.secret,{expiresIn: '24h'});
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

router.get('/isauth', passport.authenticate('jwt', { session: false}),function(req, res) {
  var pPayload = req.headers.authorization.slice(4);
  pPayload = jwt.decode(pPayload, {complete: true});
  res.status(200).send({success: true, msg: 'User Authenticated', payload: pPayload.payload._doc._id});
});



router.post('/post', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);

  if (token) {
    var bin = req.body.img;
    
    req.body.img = '/img/uploads/'+req.body.subject+'.png';
    var data = bin.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');
    fs.writeFile('../front/img/uploads/'+req.body.subject+'.png', buf);/*
  var file = fs.writeFile('./uploads/'+req.body.subject+'.png', req.body.img, 'binary', function (err) {
    if (err){ 
      console.log(err);
      throw err
    };
    console.log('Saved!'+file);
  });*/
    var newPost = new Post({
      subject: req.body.subject,
      content: req.body.content,
      description: req.body.description,
      author: req.body.author,
      profilepic: req.body.profilepic,
      img: '/img/uploads/'+req.body.subject+'.png',
      date: Date()
    });

    newPost.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Save post failed.'+err});
      }
      res.json({success: true, msg: 'Successful created new post.'+JSON.stringify(newPost), data: newPost});
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.get('/post', function(req, res) {
    Post.find(function (err, posts) {
      if (err) return next(err);
      res.json(posts);
    });
});

router.get('/getuser', function(req, res) {
  User.find(function (err, users) {
    if (err) return next(err);
    users.forEach(function(user) {
      user.password = "";   
    });
    res.json(users);
  });
});
router.get('/user/:id', function(req, res, next) {
    User.findById(req.params.id, function (err, user) {
      if (err) return next(err);
      user.password = "";
      res.json(user);
    });
});


router.get('/post/:id', function(req, res, next) {
  Post.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.post('/message', function(req, res) {

    var newMessage = new Message({
      subject: req.body.subject,
      email: req.body.email,
      name: req.body.name,
      company: req.body.company,
      content: req.body.content,
      phone: req.body.phone,
      date: Date()
    });

    newMessage.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Save message failed.'+JSON.stringify(err)});
      }
      res.json({success: true, msg: 'Successful created new message.'});
    });
});

router.get('/message', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Message.find(function (err, messages) {
      if (err) return next(err);
      res.json(messages);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
