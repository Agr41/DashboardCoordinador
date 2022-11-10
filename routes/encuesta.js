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
      let arregloUsu
      if(id===true){
      arregloUsu = await collection.aggregate([{$match:{root:{$ne:true}}}]).sort({nombre: 1}).toArray();
      }
      else{
      arregloUsu = await collection.aggregate([{$match:{coordi:false, active:true, root:{$ne:true}}}]).sort({nombre: 1}).toArray();
      }
      let tipoUsu = await collection.aggregate([{$match:{username:id}}]).toArray();
      
      
      var dato = {arregloUsu}
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
          detalleUsu(req.user.root)
          .then((dato)=>{
            console.log(dato.arregloUsu)
            console.log()
            res.render('encuesta', { title: "Ver maestros", datos:dato.arregloUsu, coordi:req.user.coordi, sudo:req.user.root, docente:req.query.docente});
          })  
          .catch((err)=>{
              console.log(err);
          })
          .finally(()=>{
              client.close
          })

  
});



module.exports = router;