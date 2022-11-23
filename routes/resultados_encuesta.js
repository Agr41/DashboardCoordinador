var express = require('express');
var router = express.Router();
var passport = require('passport');
var {client,dbName} = require('../db/mongo');

passport.deserializeUser(
  async function(id, done){
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('usuarios');
    collection.findOne({username:id}, function (err, user) {
      done(err, user);});
});

async function detalleUsu(nombre, ciclo, tipo){
  await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('encuestas');
      let arregloMat = await collection.aggregate([{$match:{nombre:nombre, ciclo:ciclo, tipo:tipo}}]).toArray();
      
      let comentarios = await collection.aggregate(
        [
          {
            '$match': {
              'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
            
            }
          }
        ]
        ).toArray();
      //-------------------------------------------------------1 Quest-------------
      let conteoPreg1_1 = await collection.aggregate(
        [
          {
            '$match': {
              'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
              //Pregunta
              'valor1': {
                //Qué contestaron
                '$eq': 1
              }
            }
          }, {
            //Pregunta
            '$count': 'valor1'
          }
        ]
        ).toArray();
        
        let conteoPreg1_2 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor1': {
                //Qué contestaron
                  '$eq': 2
                }
              }
            }, {
              //Pregunta
              '$count': 'valor1'
            }
          ]
          ).toArray();
        
        let conteoPreg1_3 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor1': {
                //Qué contestaron
                  '$eq': 3
                }
              }
            }, {
              //Pregunta
              '$count': 'valor1'
            }
          ]
          ).toArray();
        
        let conteoPreg1_4 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor1': {
                //Qué contestaron
                  '$eq': 4
                }
              }
            }, {
              //Pregunta
              '$count': 'valor1'
            }
          ]
          ).toArray();
        //-------------------------------------------------------2 Quest-------------
        let conteoPreg2_1 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor2': {
                //Qué contestaron
                  '$eq': 1
                }
              }
            }, {
              //Pregunta
              '$count': 'valor2'
            }
          ]
          ).toArray();
        
        let conteoPreg2_2 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor2': {
                //Qué contestaron
                  '$eq': 2
                }
              }
            }, {
              //Pregunta
              '$count': 'valor2'
            }
          ]
          ).toArray();
        
        let conteoPreg2_3 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor2': {
                //Qué contestaron
                  '$eq': 3
                }
              }
            }, {
              //Pregunta
              '$count': 'valor2'
            }
          ]
          ).toArray();
        
        let conteoPreg2_4 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor2': {
                //Qué contestaron
                  '$eq': 4
                }
              }
            }, {
              //Pregunta
              '$count': 'valor2'
            }
          ]
          ).toArray();
        //-------------------------------------------------------3 Quest-------------
        let conteoPreg3_1 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor3': {
                //Qué contestaron
                  '$eq': 1
                }
              }
            }, {
              //Pregunta
              '$count': 'valor3'
            }
          ]
          ).toArray();
        
        let conteoPreg3_2 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor3': {
                //Qué contestaron
                  '$eq': 2
                }
              }
            }, {
              //Pregunta
              '$count': 'valor3'
            }
          ]
          ).toArray();
        
        let conteoPreg3_3 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor3': {
                //Qué contestaron
                  '$eq': 3
                }
              }
            }, {
              //Pregunta
              '$count': 'valor3'
            }
          ]
          ).toArray();
        
        let conteoPreg3_4 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor3': {
                //Qué contestaron
                  '$eq': 4
                }
              }
            }, {
              //Pregunta
              '$count': 'valor3'
            }
          ]
          ).toArray();
          //-------------------------------------------------------4 Quest-------------
        let conteoPreg4_1 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor4': {
                //Qué contestaron
                  '$eq': 1
                }
              }
            }, {
              //Pregunta
              '$count': 'valor4'
            }
          ]
          ).toArray();
        
        let conteoPreg4_2 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor4': {
                //Qué contestaron
                  '$eq': 2
                }
              }
            }, {
              //Pregunta
              '$count': 'valor4'
            }
          ]
          ).toArray();
        
        let conteoPreg4_3 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor4': {
                //Qué contestaron
                  '$eq': 3
                }
              }
            }, {
              //Pregunta
              '$count': 'valor4'
            }
          ]
          ).toArray();
        
        let conteoPreg4_4 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor4': {
                //Qué contestaron
                  '$eq': 4
                }
              }
            }, {
              //Pregunta
              '$count': 'valor4'
            }
          ]
          ).toArray();
        //-------------------------------------------------------5 Quest-------------
        let conteoPreg5_1 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor5': {
                //Qué contestaron
                  '$eq': 1
                }
              }
            }, {
              //Pregunta
              '$count': 'valor5'
            }
          ]
          ).toArray();
        
        let conteoPreg5_2 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor5': {
                //Qué contestaron
                  '$eq': 2
                }
              }
            }, {
              //Pregunta
              '$count': 'valor5'
            }
          ]
          ).toArray();
        
        let conteoPreg5_3 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor5': {
                //Qué contestaron
                  '$eq': 3
                }
              }
            }, {
              //Pregunta
              '$count': 'valor5'
            }
          ]
          ).toArray();
        
        let conteoPreg5_4 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor5': {
                //Qué contestaron
                  '$eq': 4
                }
              }
            }, {
              //Pregunta
              '$count': 'valor5'
            }
          ]
          ).toArray();
        //-------------------------------------------------------6 Quest-------------
        let conteoPreg6_1 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor6': {
                //Qué contestaron
                  '$eq': 1
                }
              }
            }, {
              //Pregunta
              '$count': 'valor6'
            }
          ]
          ).toArray();
        
        let conteoPreg6_2 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor6': {
                //Qué contestaron
                  '$eq': 2
                }
              }
            }, {
              //Pregunta
              '$count': 'valor6'
            }
          ]
          ).toArray();
        
        let conteoPreg6_3 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor6': {
                //Qué contestaron
                  '$eq': 3
                }
              }
            }, {
              //Pregunta
              '$count': 'valor6'
            }
          ]
          ).toArray();
        
        let conteoPreg6_4 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor6': {
                //Qué contestaron
                  '$eq': 4
                }
              }
            }, {
              //Pregunta
              '$count': 'valor6'
            }
          ]
          ).toArray();
        //-------------------------------------------------------7 Quest-------------
        let conteoPreg7_1 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor7': {
                //Qué contestaron
                  '$eq': 1
                }
              }
            }, {
              //Pregunta
              '$count': 'valor7'
            }
          ]
          ).toArray();
        
        let conteoPreg7_2 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor7': {
                //Qué contestaron
                  '$eq': 2
                }
              }
            }, {
              //Pregunta
              '$count': 'valor7'
            }
          ]
          ).toArray();
        
        let conteoPreg7_3 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor7': {
                //Qué contestaron
                  '$eq': 3
                }
              }
            }, {
              //Pregunta
              '$count': 'valor7'
            }
          ]
          ).toArray();
        
        let conteoPreg7_4 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor7': {
                //Qué contestaron
                  '$eq': 4
                }
              }
            }, {
              //Pregunta
              '$count': 'valor7'
            }
          ]
          ).toArray();
          //-------------------------------------------------------8 Quest-------------
        let conteoPreg8_1 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor8': {
                //Qué contestaron
                  '$eq': 1
                }
              }
            }, {
              //Pregunta
              '$count': 'valor8'
            }
          ]
          ).toArray();
        
        let conteoPreg8_2 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor8': {
                //Qué contestaron
                  '$eq': 2
                }
              }
            }, {
              //Pregunta
              '$count': 'valor8'
            }
          ]
          ).toArray();
        
        let conteoPreg8_3 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor8': {
                //Qué contestaron
                  '$eq': 3
                }
              }
            }, {
              //Pregunta
              '$count': 'valor8'
            }
          ]
          ).toArray();
        
        let conteoPreg8_4 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor8': {
                //Qué contestaron
                  '$eq': 4
                }
              }
            }, {
              //Pregunta
              '$count': 'valor8'
            }
          ]
          ).toArray();
        //-------------------------------------------------------9 Quest-------------
        let conteoPreg9_1 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor9': {
                //Qué contestaron
                  '$eq': 1
                }
              }
            }, {
              //Pregunta
              '$count': 'valor9'
            }
          ]
          ).toArray();
        
        let conteoPreg9_2 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor9': {
                //Qué contestaron
                  '$eq': 2
                }
              }
            }, {
              //Pregunta
              '$count': 'valor9'
            }
          ]
          ).toArray();
        
        let conteoPreg9_3 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor9': {
                //Qué contestaron
                  '$eq': 3
                }
              }
            }, {
              //Pregunta
              '$count': 'valor9'
            }
          ]
          ).toArray();
        
        let conteoPreg9_4 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor9': {
                //Qué contestaron
                  '$eq': 4
                }
              }
            }, {
              //Pregunta
              '$count': 'valor9'
            }
          ]
          ).toArray();
          //-------------------------------------------------------10 Quest-------------
        let conteoPreg10_1 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor10': {
                //Qué contestaron
                  '$eq': 1
                }
              }
            }, {
              //Pregunta
              '$count': 'valor10'
            }
          ]
          ).toArray();
        
        let conteoPreg10_2 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor10': {
                //Qué contestaron
                  '$eq': 2
                }
              }
            }, {
              //Pregunta
              '$count': 'valor10'
            }
          ]
          ).toArray();
        
        let conteoPreg10_3 = await collection.aggregate(
          [
            {
              '$match': {'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,

                //Pregunta
                'valor10': {
                //Qué contestaron
                  '$eq': 3
                }
              }
            }, {
              //Pregunta
              '$count': 'valor10'
            }
          ]
          ).toArray();
        
        let conteoPreg10_4 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor10': {
                //Qué contestaron
                  '$eq': 4
                }
              }
            }, {
              //Pregunta
              '$count': 'valor10'
            }
          ]
          ).toArray();
          //-------------------------------------------------------11 Quest-------------
        let conteoPreg11_1 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor11': {
                //Qué contestaron
                  '$eq': 1
                }
              }
            }, {
              //Pregunta
              '$count': 'valor11'
            }
          ]
          ).toArray();
        
        let conteoPreg11_2 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor11': {
                //Qué contestaron
                  '$eq': 2
                }
              }
            }, {
              //Pregunta
              '$count': 'valor11'
            }
          ]
          ).toArray();
        
        let conteoPreg11_3 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor11': {
                //Qué contestaron
                  '$eq': 3
                }
              }
            }, {
              //Pregunta
              '$count': 'valor11'
            }
          ]
          ).toArray();
        
        let conteoPreg11_4 = await collection.aggregate(
          [
            {
              '$match': {
                'materia':nombre, 'ciclo':ciclo, 'tipo':tipo,
                //Pregunta
                'valor11': {
                //Qué contestaron
                  '$eq': 4
                }
              }
            }, {
              //Pregunta
              '$count': 'valor11'
            }
          ]
          ).toArray();

          let pregunta1={
            "uno":conteoPreg1_1[0],
            "dos":conteoPreg1_2[0],
            "tres":conteoPreg1_3[0],
            "cuatro":conteoPreg1_4[0],
          };
          let pregunta2={
            "uno":conteoPreg2_1[0],
            "dos":conteoPreg2_2[0],
            "tres":conteoPreg2_3[0],
            "cuatro":conteoPreg2_4[0],
          };
          let pregunta3={
            "uno":conteoPreg3_1[0],
            "dos":conteoPreg3_2[0],
            "tres":conteoPreg3_3[0],
            "cuatro":conteoPreg3_4[0],
          };
          let pregunta4={
            "uno":conteoPreg4_1[0],
            "dos":conteoPreg4_2[0],
            "tres":conteoPreg4_3[0],
            "cuatro":conteoPreg4_4[0],
          };
          let pregunta5={
            "uno":conteoPreg5_1[0],
            "dos":conteoPreg5_2[0],
            "tres":conteoPreg5_3[0],
            "cuatro":conteoPreg5_4[0],
          };
          let pregunta6={
            "uno":conteoPreg6_1[0],
            "dos":conteoPreg6_2[0],
            "tres":conteoPreg6_3[0],
            "cuatro":conteoPreg6_4[0],
          };
          let pregunta7={
            "uno":conteoPreg7_1[0],
            "dos":conteoPreg7_2[0],
            "tres":conteoPreg7_3[0],
            "cuatro":conteoPreg7_4[0],
          };
          let pregunta8={
            "uno":conteoPreg8_1[0],
            "dos":conteoPreg8_2[0],
            "tres":conteoPreg8_3[0],
            "cuatro":conteoPreg8_4[0],
          };
          let pregunta9={
            "uno":conteoPreg9_1[0],
            "dos":conteoPreg9_2[0],
            "tres":conteoPreg9_3[0],
            "cuatro":conteoPreg9_4[0],
          };
          let pregunta10={
            "uno":conteoPreg10_1[0],
            "dos":conteoPreg10_2[0],
            "tres":conteoPreg10_3[0],
            "cuatro":conteoPreg10_4[0],
          };
          let pregunta11={
            "uno":conteoPreg11_1[0],
            "dos":conteoPreg11_2[0],
            "tres":conteoPreg11_3[0],
            "cuatro":conteoPreg11_4[0],
          };
          
        
      console.log(pregunta1)
      var dato = {arregloMat, pregunta1, pregunta2, pregunta3, pregunta4, pregunta5, pregunta6, pregunta7, pregunta8, pregunta9, pregunta10, pregunta11, comentarios}
      
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
            res.render('resultados_encuesta', { title: "Ver calificaciones", datos:dato.arregloMat, coordi:req.user.coordi,
            pregunta1:dato.pregunta1,
            pregunta2:dato.pregunta2,
            pregunta3:dato.pregunta3,
            pregunta4:dato.pregunta4,
            pregunta5:dato.pregunta5,
            pregunta6:dato.pregunta6,
            pregunta7:dato.pregunta7,
            pregunta8:dato.pregunta8,
            pregunta9:dato.pregunta9,
            pregunta10:dato.pregunta10,
            pregunta11:dato.pregunta11,
            comentarios:dato.comentarios});
          })  
          .catch((err)=>{
              console.log(err);
          })
          .finally(()=>{
              client.close
          })

  
});

module.exports = router;