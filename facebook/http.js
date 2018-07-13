const express = require('express');
const passport = require('passport');
const body_parser = require('body-parser');
const session = require('express-session');
var Strategy = require('passport-facebook').Strategy;
const search = require('./search');


const app = express();

app.use(body_parser.json());
app.use(session({
    secret: 'hello',
    resave: true,
    saveUninitialized: true
}))

passport.use(new Strategy({
    clientID: '2106226673036198',
    clientSecret: '7d00ad2c980195ca9ba9f4bc9a9622b8',
    callbackURL: 'http://localhost:3000/login/facebook/return',
    enableProof: true,
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, done) {
 
    console.log('token ' ,accessToken);
    process.env.ACCESS_TOKEN = accessToken;
    done(null, profile);
    return;
  }));

  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });

  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/',search);

app.get('/',
  function(req, res) {
    //console.log('user ' ,req.session);
    res.send('root');
  });

app.get('/login',
  function(req, res){
    res.send('login');
  });

app.get('/login/facebook',passport.authenticate('facebook', {scope: ['user_groups','user_status','manage_pages','read_insights','groups_access_member_info','pages_show_list','user_managed_groups','user_events','groups_access_member_info','user_friends','user_managed_groups']}));

app.get('/login/facebook/return',passport.authenticate('facebook',{failureRedirect: '/login' }),function(req, res) {
        console.log('response')
        res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.send({ user: req.user });
  });

app.listen(3000 , () => console.log('starting server ... '));

