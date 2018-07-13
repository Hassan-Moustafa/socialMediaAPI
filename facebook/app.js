var fs = require('fs');

const express = require('express');
const passport = require('passport');
const body_parser = require('body-parser');
const session = require('express-session');
var Strategy = require('passport-facebook');
var https = require('https');
var privateKey  = fs.readFileSync('privatekey.pem');
var certificate = fs.readFileSync('certificate.pem');
var credentials = {key: privateKey, cert: certificate};

const app = express();

app.use(body_parser.json());
app.use(session({
    secret: 'hello',
    resave: true,
    saveUninitialized: true
}))

passport.use(new Strategy({
    clientID: '643228829387463',
    clientSecret: 'fcacfccfc74eb64ff5e70dd0026099f4',
    callbackURL: 'https://localhost:3000/login/facebook/return'
  },
  function(accessToken, refreshToken, profile, cb) {
 
    console.log('token ' ,accessToken);
    return cb(null, profile);
  }));

  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
  app.use(passport.initialize());
  //app.use(passport.session());


// app.use(require('body-parser').urlencoded({ extended: true }));
// app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.get('/',
  function(req, res) {
    res.send('root');
  });

app.get('/login',
  function(req, res){
    res.send('login');
  });

app.get('/login/facebook',passport.authenticate('facebook'));

app.get('/login/facebook/return',passport.authenticate('facebook'),function(req, res) {
        console.log('response')
        res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.send({ user: req.user });
  });

//app.listen(3000 , () => console.log('starting server ... '));
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(3000);