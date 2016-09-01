var express = require('express');
var passport = require('passport');
var app = express.Router();
var parser = require('body-parser');
var mon = require('../../tools/mongoDataAccess.js');
app.use(express.json());
app.use(express.urlencoded());

var secure = require('./init.js');
app.use('/', secure);
app.use(parser.urlencoded({extended:false}));

app.get('/failLogin', function(req, res){
  res.redirect('../tempFail');
});

app.get('/profile', function(req, res){
  res.redirect('../Success');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/api/profile',
  failureRedirect: '/api/fail'
}));

app.post('/signup', function(req, res){
  if(req.body.cPass === req.body.password){
    //firstname, lastname, username
    var da = new mon();
    var userData = {
      username: req.body.username,
      f_name: req.body.firstname,
      l_name: req.body.lastname,
      password: req.body.password
    };
    da.getUsers(userData.username, function(result){
      if(result.length == 0){
        da.addOrUpdateUser(userData, function(result){
          if(result == "success"){
            res.redirect('../Success');
          }});
      }});
  }});

module.exports = app;