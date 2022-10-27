var express = require('express');
var router = express.Router();
var {client,dbName} = require('../db/mongo');
var passport = require('passport');
var LocalStrategy = require('passport-local');
//var schema = require('../public/javascript/validation');
const Joi = require('joi');

const schema = Joi.object({
    matricula: Joi.number()
    .min(10000)
    .max(99999)
    .required(),

    carrera: Joi.string()
    .min(2)
    .max(3)
    .required(),
    nombre: Joi.string()
    .min(2)
    .required(),
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
    detalleUsu(req.user.username)
          .then((dato)=>{
            res.render('crear_alumnos', { title: "Crear alumnos", coordi:dato[0].coordi});
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
        window.location.href='/ver_alumnos';
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
        window.location.href='/crear_alumnos';
        </script>`), console.log(err); }    
    //}
  });

  async function regUser(datos){
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('alumnos');
    await collection.insertOne(
        {
          matricula: datos.matricula,
          carrera: datos.carrera,
          nombre:datos.nombre,
          active:datos.active
        }, {upsert:true}
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