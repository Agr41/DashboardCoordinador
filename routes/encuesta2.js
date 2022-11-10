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

async function detalleUsu(id, user){
  await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('materias');
      let arregloMat=[];
      if(user.coordi==true){
        arregloMat = await collection.aggregate([{$match:{$or:[{carrera:id},{docente:id}]}}]).toArray();
      }
      else{
        arregloMat = await collection.aggregate([{$match:{docente:user.nombre,carrera:id}}]).toArray();
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
            res.render('encuesta2', { title: "Materias",docente:req.query.docente});
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
    body: Joi.string()
    .required(),
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
  //if (value = {}){
  //}else{
  regMat(value)
    .then((mensaje)=>{
      //AÑADIR MENSAJE DE ÉXITO DESPUÉS
      res.send("<script>alert('"+mensaje+"'); window.location.href='/';</script>");
      res.redirect('/encuesta2');
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
  const collection = db.collection('encuestas');


 
 
  await collection.insertOne(
    {
      docente: datos.docente,
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
      valor11: datos.valor11

    }
    );
 
  
    
    console.log(datos.usuario); 
}



module.exports = router;