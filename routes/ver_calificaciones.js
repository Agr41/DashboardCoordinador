var express = require('express');
var router = express.Router();
var passport = require('passport');
var {client,dbName} = require('../db/mongo');

passport.deserializeUser(
  async function(id, done) {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('usuarios');
    collection.findOne({username:id}, function (err, user) {
      done(err, user);});
});

async function detalleUsu(nombre, ciclo, tipo, usuario){
  await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('materias');
      let arregloMat = await collection.aggregate([{$match:{nombre:nombre, ciclo:ciclo, tipo:tipo}}]).toArray();
      let objetoAlu
      let falta= false
      arregloMat[0].falta_encuesta.forEach(element => {
        if (element==usuario){
          falta=true;
        }
      });
      console.log(falta)
      arregloMat[0].alumnos.forEach(element => {
        if (element.nombre==usuario){
          console.log(element)
          objetoAlu=element
        }
      });
      
      var dato = {arregloMat, objetoAlu, falta}
      console.log(dato)
      return dato;
  };

/* GET home page. */
router.get('/',(req, res, next) => {
  if (req.isAuthenticated()) {
      return next();
  } else {
      res.redirect('/login')
  }
}, function(req, res, next) {

          //res.render('index', { title: "Menú Principal", student_id:req.user.student_id});
          detalleUsu(req.query.materia, req.query.ciclo, req.query.tipo, req.user.nombre)
          .then((dato)=>{
            console.log(dato.arregloMat)
            res.render('ver_calificaciones', { title: "Ver calificaciones", datos:dato.arregloMat,datosAlu:dato.objetoAlu, coordi:req.user.coordi, alumno:req.user.alumno, falta:dato.falta});
          })  
          .catch((err)=>{
              console.log(err);
          })
          .finally(()=>{
              client.close
          })

  
});

module.exports = router;