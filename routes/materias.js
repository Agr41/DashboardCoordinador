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

async function detalleUsu(id, user){
  await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('materias');
      let arregloMat=[];
      if(user.coordi==true){
        arregloMat = await collection.aggregate([{$match:{$or:[{carrera:id},{docente:id}]}}]).toArray();
      }
      else{
        if(user.maestro){
          arregloMat = await collection.aggregate([{$match:{docente:user.nombre,carrera:id}}]).toArray();
        }
        else{
          arregloMat = await collection.aggregate([{$match:{alumnos:{$elemMatch: {nombre:user.nombre}},carrera:id}}]).toArray();
        }
        
      }
      
      
      
      var dato = {arregloMat}
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
          let query=""
          if (req.query.materia==undefined){
            query=req.query.docente
          }
          else{
            query=req.query.materia
          }
          console.log(query)

          detalleUsu(query, req.user)
          .then((dato)=>{
            console.log(dato.arregloMat)
            console.log(req.user.alumno)
            
            res.render('materias', { title: "Materias", materias: dato.arregloMat, alumno:req.user.alumno,coordi:req.user.coordi});
          })  
          .catch((err)=>{
              console.log(err);
          })
          .finally(()=>{
              client.close
          })

  
});

module.exports = router;