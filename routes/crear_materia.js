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

async function detalleUsu(id){
  await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('usuarios');
      let arregloMat = await collection.aggregate([{$match:{$and:[{"active":true},{"root":{$ne:true}}]}}]).toArray();
      let aluISC = await db.collection('alumnos').aggregate([{$match:{$and:[{"active":true},{"carrera":"ISC"}]}}]).toArray();
      let aluIM = await db.collection('alumnos').aggregate([{$match:{$and:[{"active":true},{"carrera":"IM"}]}}]).toArray();
      let aluISA = await db.collection('alumnos').aggregate([{$match:{$and:[{"active":true},{"carrera":"ISA"}]}}]).toArray();
      let aluIIS = await db.collection('alumnos').aggregate([{$match:{$and:[{"active":true},{"carrera":"IIS"}]}}]).toArray();
      
      
      var dato = {arregloMat,aluISC,aluIM,aluISA,aluIIS}
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
          detalleUsu(req.user.username)
          .then((dato)=>{
            res.render('crear_materia', { title: "Crear materia", maestro: dato.arregloMat, aluISC:dato.aluISC, aluIM:dato.aluIM, aluISA:dato.aluISA, aluIIS:dato.aluIIS});
          })  
          .catch((err)=>{
              console.log(err);
          })
          .finally(()=>{
              client.close
          })

  
});

module.exports = router;