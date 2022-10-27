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

async function detalleUsu(nombre, ciclo, tipo){
  await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('usuarios');
      let arregloUsu = await collection.aggregate([{$match:{active:true, root:{$ne:true}}}]).toArray();
      
      
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
          detalleUsu()
          .then((dato)=>{
            console.log(dato.arregloUsu)
            res.render('ver_maestros', { title: "Ver maestros", datos:dato.arregloUsu});
          })  
          .catch((err)=>{
              console.log(err);
          })
          .finally(()=>{
              client.close
          })

  
});

router.post('/deshabilitar', async function(req, res, next){
  try{
  var value = req.body.docente
  console.log(value);
  //if (value = {}){
  //}else{
  regUser(value)
    .then(()=>{
      //AÑADIR MENSAJE DE ÉXITO DESPUÉS
      res.send(`<script>alert("Usuario deshabilitado")
      window.location.href='/';
      </script>`);
      res.redirect('/ver_maestros');
      console.log("Usuario deshabilitado");
    })
    .catch((err)=>{
      
      console.log(err);
      
    })
    .finally(()=>{
      client.close()
    })
  }
  catch (err) { 
    res.send(`<script>alert("Hubo algún error")
      window.location.href='/';
      </script>`), console.log(err); 
      res.redirect('/ver_maestros');
    }    
  //}
});

async function regUser(datos){
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('usuarios');
  await collection.updateOne({username:datos},{$set:{
    active:false
  }}
    );
    console.log(datos.usuario); 
}


module.exports = router;