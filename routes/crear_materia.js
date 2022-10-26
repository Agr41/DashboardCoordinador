var express = require('express');
var router = express.Router();
var passport = require('passport');
var {client,dbName} = require('../db/mongo');

const Joi = require('joi');

const schema = Joi.object({
  carrera: Joi.string()
    .required(),
    semestre: Joi.string()
    .required(),
    nombre: Joi.string()
    .min(2)
    .required(),
    docente: Joi.string()
    .required(),
    tipo: Joi.string()
    .required(),
    ciclo: Joi.string()
    .required(),
    f_inicio: Joi.string()
    .required(),
    f_final: Joi.string()
    .required(),
    h_inicio: Joi.string()
    .required(),
    h_final: Joi.string()
    .required(),
    nomAlu: Joi.array()
    .required(),
});

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

router.post('/registro', async function(req, res, next){
  try{
  var value = await schema.validateAsync(req.body);
  console.log(value);
  //if (value = {}){
  //}else{
  regMat(value)
    .then((mensaje)=>{
      //AÑADIR MENSAJE DE ÉXITO DESPUÉS
      res.send("<script>alert('"+mensaje+"'); window.location.href='/';</script>");
      res.redirect('/crear_materia');
      console.log(mensaje);
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
      window.location.href='/crear_materia';
      </script>`), console.log(err);
      res.redirect('/ver_materia?nombre='+req.body.nombre+'&ciclo='+req.body.ciclo+'&tipo='+req.body.tipo);}    
  //}
});

async function regMat(datos){
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('materias');


  /*var arrayAlu = datos.nomAlu.split(",");
  var valuesArr = [];

  var cuotasOrig= []

  console.log("arrray cuotras"+ arrayAlu);
if (arrayAlu.length!=0 && arrayAlu!=""&&arrayAlu!=[]){
for (var i = arrayAlu.length -1; i >= 0; i--){
   cuotasOrig.splice(arrayAlu[i],1);
}
}
   valuesArr=cuotasOrig;*/
let valuesArr=[]
   for (var i = 0; i <= datos.nomAlu.length-1; i++){

    valuesArr[i]={
      "nombre":datos.nomAlu[i],
      "calificacion":"-",
      "inasistencias":"-",
      "retardos":"-",
    }
 }
 let mensaje
 if(datos.tipo=="Ordinario" & valuesArr.length<5){
 mensaje="Debe añadir por lo menos 5 alumnos para materias ordinarias"
 await collection.findOne({})
 }
 else{
  mensaje = "Registro correcto"
  await collection.insertOne(
    {
      carrera: datos.carrera,
      semestre:datos.semestre,
      nombre: datos.nombre,
      docente:datos.docente,
      tipo:datos.tipo,
      ciclo:datos.ciclo,
      fecha_inicio:datos.f_inicio,
      fecha_fin:datos.f_final,
      hora_inicio:datos.h_inicio,
      hora_fin:datos.h_final,
      alumnos:valuesArr

    }
    );
 }
  
    
    console.log(datos.usuario); 
    return mensaje;
}

module.exports = router;