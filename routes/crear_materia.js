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
    nomAlu: Joi.alternatives().try(Joi.string(), Joi.array())
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
      let arregloMat = await collection.aggregate([{$match:{$and:[{"active":true},{"root":{$ne:true}}]}}]).sort({nombre: 1}).toArray();
      let aluISC = await db.collection('alumnos').aggregate([{$match:{$and:[{"active":true},{"carrera":"ISC"}]}}]).sort({nombre: 1}).toArray();
      let aluIM = await db.collection('alumnos').aggregate([{$match:{$and:[{"active":true},{"carrera":"IM"}]}}]).sort({nombre: 1}).toArray();
      let aluISA = await db.collection('alumnos').aggregate([{$match:{$and:[{"active":true},{"carrera":"ISA"}]}}]).sort({nombre: 1}).toArray();
      let aluIIS = await db.collection('alumnos').aggregate([{$match:{$and:[{"active":true},{"carrera":"IIS"}]}}]).sort({nombre: 1}).toArray();
      let tipoUsu = await db.collection('usuarios').aggregate([{$match:{username:id}}]).toArray();

      const collection2 = db.collection('planes');
      let planesArreglo=[];
      planesArreglo = await collection2.aggregate([{$match:{}}]).toArray();


      
      var dato = {arregloMat,aluISC,aluIM,aluISA,aluIIS,tipoUsu,planesArreglo}
      console.log(dato)
      return dato;
  };


  
  /* GET home 


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
            res.render('crear_materia', { title: "Crear materia", maestro: dato.arregloMat, aluISC:dato.aluISC, aluIM:dato.aluIM, aluISA:dato.aluISA, aluIIS:dato.aluIIS, coordi:dato.tipoUsu[0].coordi, planes:dato.planesArreglo});
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
tipoDato= typeof datos.nomAlu;
if (tipoDato !="string"){
  for (var i = 0; i <= datos.nomAlu.length-1; i++){

    valuesArr[i]={
      "nombre":datos.nomAlu[i],
      "calificacion":"-",
      "inasistencias":"-",
      "retardos":"-",
    }
 }
}
else{
  valuesArr[0]={
    "nombre":datos.nomAlu,
    "calificacion":"-",
    "inasistencias":"-",
    "retardos":"-",
  }
}
function isAfter(date1, date2) {
  let d1 = new Date(date1);
let d2 = new Date(date2);
  return d1 > d2;
}


 let mensaje
 if(datos.tipo=="Ordinario" & valuesArr.length<5){
 mensaje="Debe añadir por lo menos 5 alumnos para materias ordinarias"
 await collection.findOne({})
 }
 else{if(isAfter(datos.f_inicio, datos.f_final)){
  mensaje="La fecha de inicio no puede ser después que la fecha de finalización"
 await collection.findOne({})
 }
 else{if(parseInt(datos.h_inicio)>parseInt(datos.h_final)){
  mensaje="La hora de inicio no puede ser después que la hora de finalización"
  await collection.findOne({})
 } 
 else{
  mensaje = "Registro correcto"
  await collection.updateOne({
    carrera: datos.carrera,
      semestre:datos.semestre,
      nombre: datos.nombre,
      docente:datos.docente,
      tipo:datos.tipo,
      ciclo:datos.ciclo,
  },{$set:
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
      alumnos:valuesArr,
      falta_encuesta:datos.nomAlu

    }}, {upsert:true}
    );
 }}}
  
    
    console.log(datos.usuario); 
    return mensaje;
}

module.exports = router;