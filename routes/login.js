var express = require('express');
var router = express.Router();
var {client,dbName} = require('../db/mongo');
var passport = require('passport');
var LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});*/

passport.use(new LocalStrategy(
  async function(username, password, done) {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('usuarios');
    await collection.findOne({ username: username, active:true }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
    
      
      bcrypt.compare(password, user.password).then(function(result) {
        if (!result) { return done(null, false); }
      return done(null, user);
    });

    });
  }
  
));

passport.serializeUser(function(user, done) {
  console.log(user);
  done(null, user.username);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('login', { title: 'Iniciar sesión', error:req.query.error});
});

router.post('/auth', 
  passport.authenticate('local', { failureRedirect: '/login?error=true' }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = router;
