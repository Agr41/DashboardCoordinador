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
      const collection = db.collection('materias');
      let isc,im,isa,iis
      if (id.coordi){
        isc=true
        im =true
        isa=true
        iis=true
      }
      else{
        if(id.maestro){
          isc = await collection.aggregate([{$match:{docente:id.nombre, carrera:"ISC"}}]).toArray();
          im = await collection.aggregate([{$match:{docente:id.nombre, carrera:"IM"}}]).toArray();
          isa = await collection.aggregate([{$match:{docente:id.nombre, carrera:"ISA"}}]).toArray();
          iis = await collection.aggregate([{$match:{docente:id.nombre, carrera:"IIS"}}]).toArray();
        }
        else{
          carrera=id.carrera
          if (carrera=="ISC"){
            isc=true;
          }
          if (carrera=="IM"){
            im=true;
          }
          if (carrera=="ISA"){
            isa=true;
          }
          if (carrera=="IIS"){
            iis=true;
          }
        }
        
      }
      
      
      
      
      var dato = {isc,im,isa,iis}
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
          detalleUsu(req.user)
          .then((dato)=>{
            console.log(dato.promedio)
            res.render('index', { title: "Menú Principal", isc:dato.isc, im:dato.im, isa:dato.isa,iis:dato.iis});
          })  
          .catch((err)=>{
              console.log(err);
          })
          .finally(()=>{
              client.close
          })

  
});

module.exports = router;