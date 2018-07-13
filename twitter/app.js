var express = require('express');
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
let twit = require('./twit');   

passport.use(new Strategy({
    consumerKey: 'TQOEgWp57LxtyBJeny52Xmbze',
    consumerSecret: 'EiErpnJh3813riQMN2uQeRtK3hKAHuYtjhQpjUbjRsJCRKJT0p',
    callbackURL: 'http://127.0.0.1:3000/login/twitter/return'
  },
  function(token, tokenSecret, profile, cb) {

      process.env.TWIT_ACCESS_TOKEN = token;
      process.env.TWIT_ACCESS_TOKEN_SECRET = tokenSecret;   
      console.log('token is  ' ,token)
    return cb(null, profile);
  }));



passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


var app = express();


app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());


// Define routes.

app.use('/twit' , twit);


app.get('/',
  function(req, res) {
    res.send({ user: req.user });
  });

app.get('/login',
  function(req, res){
    res.send('login');
  });

app.get('/login/twitter', passport.authenticate('twitter'));

app.get('/login/twitter/return', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.send({ user: req.user });
  });


app.listen(3000 , () => console.log('server starting ... '));