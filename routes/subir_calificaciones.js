var express = require('express');
var router = express.Router();
var passport = require('passport');
var {client,dbName} = require('../db/mongo');
const fileUpload = require('express-fileupload');

const Joi = require('joi');

const schema = Joi.object({
    // calificacion: Joi.array()
    // .required(),
    nombre: Joi.alternatives().try(Joi.string(), Joi.array())
    .required(),
    ciclo: Joi.string()
    .required(),
    materia: Joi.string()
    .required(),
    tipo: Joi.string()
    .required(),
    inasistencias: Joi.alternatives().try(Joi.number().min(0).max(80), Joi.array())
    .required(),
    retardos: Joi.alternatives().try(Joi.number().min(0).max(80),Joi.string(), Joi.array())
    .required(),
    calificacion: Joi.alternatives().try(Joi.number().min(10).max(100), Joi.array())
    .required(),
    // nombre: Joi.array()
    // .required(),
    comentarios: Joi.string()
    .min(0),
    
});

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
      const collection = db.collection('materias');
      let arregloMat = await collection.aggregate([{$match:{nombre:nombre, ciclo:ciclo, tipo:tipo}}]).toArray();
      
      
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
          detalleUsu(req.query.materia, req.query.ciclo, req.query.tipo)
          .then((dato)=>{
            console.log(dato.arregloMat)
            res.render('subir_calificaciones', { title: "Subir calificaciones", nombre:req.query.materia, datos:dato.arregloMat, coordi:req.user.coordi, alumno:req.user.alumno});
          })  
          .catch((err)=>{
              console.log(err);
          })
          .finally(()=>{
              client.close
          })

  
});

router.post('/subir', async function(req, res, next){
  try{
  var value = await schema.validateAsync(req.body);
  console.log(value);
  //if (value = {}){
  //}else{
  
  regUser(value)
    .then(()=>{
      //AÑADIR MENSAJE DE ÉXITO DESPUÉS
      res.send(`<script>alert("Registro exitoso")
      window.location.href='/';
      </script>`);
      res.redirect('/ver_materia?nombre='+req.body.materia+'&ciclo='+req.body.ciclo+'&tipo='+req.body.tipo);
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
    res.send(`<script>alert("Por favor complete correctamente todos los campos")
      window.location.href='/';
      </script>`), console.log(err); } 
      
      
  //}
});

async function regUser(datos){
  let valuesArr=[]
//    for (var i = 0; i <= datos.calificacion.length-1; i++){

//     valuesArr[i]={
//       "nombre":datos.nombre[i],
//       "calificacion":datos.calificacion[i],
//       "inasistencias":datos.inasistencias[i],
//       "retardos":datos.retardos[i],
//     }
//  }
tipoDato= typeof datos.nombre;
if (tipoDato !="string"){
  for (var i = 0; i <= datos.nombre.length-1; i++){
    let reprobado = false;
    if (parseInt(datos.calificacion[i])<70){
      reprobado=true;
    }
    valuesArr[i]={
      "nombre":datos.nombre[i],
       "calificacion":datos.calificacion[i],
       "inasistencias":datos.inasistencias[i],
       "retardos":datos.retardos[i],
       "reprobado":reprobado,
    }
 }
}
else{
  let reprobado = false;
  if (parseInt(datos.calificacion)<70){
    reprobado=true;
  }
  valuesArr[0]={
    "nombre":datos.nombre,
    "calificacion":datos.calificacion,
    "inasistencias":datos.inasistencias,
    "retardos":datos.retardos,
    "reprobado":reprobado
  }
}
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('materias');
  await collection.updateOne({nombre:datos.materia, tipo:datos.tipo, ciclo:datos.ciclo},{$set:{
    alumnos:valuesArr,
    calificacionesOriginal:valuesArr,
    sent:true,
    comentarios:datos.comentarios
  }},
    );
    console.log(datos.usuario); 
}

module.exports = router;