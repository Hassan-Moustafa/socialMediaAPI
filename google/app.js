const GooglePlusStrategy = require('passport-google-oauth').OAuth2Strategy;
var express = require('express');
var passport = require('passport');
const googleApi = require('./api');

passport.use(new GooglePlusStrategy({
    clientID: '1094878617189-5c77npg37fn06p29464srr5m6d3r0l5f.apps.googleusercontent.com',
    clientSecret: 'OOHSq6UKlJcj1CDCLFHz0Kry',
    callbackURL: 'http://localhost:3000/login/google/return',
    scope: ['profile', 'email']
  },
  function(token, refreshtoken ,profile, done) {
    // Create or update user, call done() when complete...
    process.env.TOKEN = token;
    console.log('token ' , token);
    done(null, profile, token);
    return;
  }
));

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


  app.use('/api',googleApi);
  app.get('/',
  function(req, res) {
    res.send({ user: req.user });
  });

app.get('/login',
  function(req, res){
    res.send('login');
  });

app.get('/login/google', passport.authenticate('google', {scope:['https://www.googleapis.com/auth/plus.login','https://www.googleapis.com/auth/plus.stream.read','https://www.googleapis.com/auth/plus.me']}));

app.get('/login/google/return', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

//   app.post('/auth/google/callback', passport.authenticate('google'), function(req, res) {
//     // Return user back to client
//     res.send(req.user);
// });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.send({ user: req.user });
  });


app.listen(3000 , () => console.log('server starting ... '));

