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
    correo: Joi.string()
    .min(7)
    .required(),

    password: Joi.string()
    .min(6)
    .required(),
    nombre: Joi.string()
    .min(2)
    .required(),
    coordi: Joi.string()
    .min(0),
    active: Joi.boolean()
    .required()
    
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
    res.render('crear_maestros', {title: "Crear maestros"});
  });
 

  router.post('/registro', async function(req, res, next){
    try{
    var value = await schema.validateAsync(req.body);
    console.log(value);
    //if (value = {}){
    //}else{
    regUser(value)
      .then(()=>{
        //AÑADIR MENSAJE DE ÉXITO DESPUÉS
        res.send(`<script>alert("Registro exitoso")
        window.location.href='/ver_maestros';
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
        window.location.href='/crear_maestros';
        </script>`), console.log(err); }    
    //}
  });

  async function regUser(datos){
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('usuarios');
    var hash = await bcrypt.hash(datos.password, saltRounds);
    console.log(hash + "externo");
    await collection.insertOne(
        {
          username: datos.correo,
          password: hash,
          nombre:datos.nombre,
          coordi: Boolean(datos.coordi),
          active:datos.active
        }
      );
      console.log(datos.usuario); 
  }
    module.exports = router;