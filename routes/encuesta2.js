var express = require('express');
var router = express.Router();
var passport = require('passport');
var {client,dbName} = require('../db/mongo');
const Joi = require('joi');

passport.deserializeUser(
  async function(id, done) {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('usuarios');
    collection.findOne({username:id}, function (err, user) {
      done(err, user);});
});

async function detalleUsu(id, user, nombre, ciclo, tipo){
  await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('materias');
      let arregloMat=[];

      arregloMat = await collection.aggregate([{$match:{nombre:nombre, ciclo:ciclo, tipo:tipo}}]).toArray();
      let falta= false
      arregloMat[0].falta_encuesta.forEach(element => {
        if (element==user.nombre){
          falta=true;
        }
      });
      console.log("falta2")
      arregloMat[0].alumnos.forEach(element => {
        if (element.nombre==usuario){
          console.log(element)
          objetoAlu=element
        }
      });
      
      
      
      var dato = {arregloMat, falta}
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

          detalleUsu(query, req.user,req.query.materia, req.query.ciclo, req.query.tipo)
          .then((dato)=>{
            console.log(dato.arregloMat)
            res.render('encuesta3', { title: "Esta página es la del post",docente:req.query.docente, coordi:req.user.coordi, falta:dato.falta});
          })  
          .catch((err)=>{
              console.log(err);
          })
          .finally(()=>{
              client.close
          })

  
});


//editar


const schema = Joi.object({
    docente: Joi.string()
    .required(),
    materia: Joi.string()
    .required(),
    ciclo: Joi.string()
    .required(),
    tipo: Joi.string()
    .required(),
    body: Joi.string()
    .min(0),
    valor1: Joi.number()
    .required(),
    valor2: Joi.number()
    .required(),
    valor3: Joi.number()
    .required(),
    valor4: Joi.number()
    .required(),
    valor5: Joi.number()
    .required(),
    valor6: Joi.number()
    .required(),
    valor7: Joi.number()
    .required(),
    valor8: Joi.number()
    .required(),
    valor9: Joi.number()
    .required(),
    valor10: Joi.number()
    .required(),
    valor11: Joi.number()
    .required(),
    promedio: Joi.number()
});


async function detalleUsu(id){
  await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('usuarios');
      let arregloMat = await collection.aggregate([{$match:{$and:[{"active":true},{"root":{$ne:true}}]}}]).sort({nombre: 1}).toArray();
      
      
      
      var dato = {}
      console.log(dato)
      return dato;
  };



router.post('/resultados', async function(req, res, next){
  try{
  var value = await schema.validateAsync(req.body);
  console.log(value);
  console.log(value.valor1);

  //if (value = {}){
  //}else{
  regMat(value, req.user.nombre)
    .then((mensaje)=>{
      //AÑADIR MENSAJE DE ÉXITO DESPUÉS
      mensaje="Encuesta enviada";
      res.send("<script>alert('"+mensaje+"'); window.location.href='/';</script>");
      res.redirect('/encuesta');
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
      window.location.href='/encuesta';
      </script>`), console.log(err);
      res.redirect('/encuesta');}    
  //}
});

async function regMat(datos, alumno){
  let promedio = (datos.valor1 + datos.valor2 + datos.valor3 + datos.valor4 + datos.valor5+ datos.valor6+ datos.valor7+ datos.valor8+ datos.valor9+ datos.valor10 + datos.valor11)/11;
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('encuestas');

 
 
  await collection.insertOne(
    {
      promedio:promedio,
      docente: datos.docente,
      tipo: datos.tipo,
      ciclo: datos.ciclo,
      materia: datos.materia,
      body: datos.body,
      valor1: datos.valor1,
      valor2: datos.valor2,
      valor3: datos.valor3,
      valor4: datos.valor4,
      valor5: datos.valor5,
      valor6: datos.valor6,
      valor7: datos.valor7,
      valor8: datos.valor8,
      valor9: datos.valor9,
      valor10: datos.valor10,
      valor11: datos.valor11,

    }
    );
    await db.collection('materias').updateOne({
        nombre: datos.materia,
        docente:datos.docente,
        tipo:datos.tipo,
        ciclo:datos.ciclo,
    },{$pull: {  falta_encuesta: alumno }}, {upsert:true}
      );
 
  
    
    console.log(datos.usuario); 
}



module.exports = router;