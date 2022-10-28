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
  nombre2: Joi.string()
  .min(0),
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
      res.render('editar_maestro', { title: "Editar maestros", coordi:dato[0].coordi, root:dato[0].root, correo:req.query.username, nombre:req.query.nombre});
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
        window.location.href='/editar_maestros';
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
    await collection.updateOne(
        {
          username: datos.correo,
        },
        {$set: {
          username: datos.correo,
          password: hash,
          nombre:datos.nombre,
          coordi: Boolean(datos.coordi),
          active:datos.active
        }}, {upsert:true}
      );
      await db.collection('materias').updateOne(
        {
          docente: datos.nombre2,
        },
        {$set: {
          docente:datos.nombre,
        }}
      );
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