var express = require('express');
var router = express.Router();
var {client,dbName} = require('../db/mongo');
var passport = require('passport');
var LocalStrategy = require('passport-local');
//var schema = require('../public/javascript/validation');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Joi = require('joi');

const schema = Joi.object({
    password: Joi.string()
    .min(6)
    .required(),
    password2: Joi.string()
    .min(6)
    .required(),
});





var passport = require('passport');
var {client,dbName} = require('../db/mongo');

passport.deserializeUser(
    async function(id, done) {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('usuarios');
      collection.findOne({username:id}, function (err, user) {
        done(err, user);
  });
});



  router.get('/',(req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/')
    }
  }, function(req, res, next) {
    detalleUsu(req.user.username)
    .then((dato)=>{
      res.render('cambiar_password', { title: "Cambiar contraseña", coordi:req.user.coordi});
    })  
    .catch((err)=>{
        console.log(err);
    })
    .finally(()=>{
        client.close
    })
  });
 

  router.post('/registro', async function(req, res, next){
    try{
    var value = await schema.validateAsync(req.body);
    console.log(value);
    //if (value = {}){
    //}else{
    regUser(value, req.user.username)
      .then(()=>{
        //AÑADIR MENSAJE DE ÉXITO DESPUÉS
        res.send(`<script>alert("Registro exitoso")
        window.location.href='/';
        </script>`);
        console.log("Registro correcto");
      })
      .catch((err)=>{
        
        console.log(err);
        
      })
      .finally(()=>{
        client.close()
      })
    }
    catch (err) { 
      res.send(`<script>alert("Por favor complete todos los campos")
        window.location.href='/cambiar_password';
        </script>`), console.log(err); }    
    //}
  });

  async function regUser(datos,correo){
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('usuarios');
    var hash = await bcrypt.hash(datos.password, saltRounds);
    console.log(hash + "externo");
    if(datos.password==datos.password2){
    await collection.updateOne(
        {
          username: correo,
        },
        {$set: {
          password: hash,
        }}, 
      );
    }
    else{
      await collection.findOne({})
    }
      console.log(datos.usuario); 
  }

  async function detalleUsu(id){
    await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('usuarios');
        let arregloUsu = await collection.aggregate([{$match:{username:id}}]).toArray();
        
        
        var dato = arregloUsu
        console.log(dato)
        return dato;
    };
    module.exports = router;