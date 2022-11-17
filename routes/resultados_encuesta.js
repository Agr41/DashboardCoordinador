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
      const collection = db.collection('encuestas');
      let arregloMat = await collection.aggregate([{$match:{nombre:nombre, ciclo:ciclo, tipo:tipo}}]).toArray();

      //-------------------------------------------------------1 Quest-------------
      let conteoPreg1_1 = await collection.aggregate(
        [
          {
            '$match': {
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
        );
        
        let conteoPreg1_2 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        
        let conteoPreg1_3 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        
        let conteoPreg1_4 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        //-------------------------------------------------------2 Quest-------------
        let conteoPreg2_1 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        
        let conteoPreg2_2 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        
        let conteoPreg2_3 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        
        let conteoPreg2_4 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        //-------------------------------------------------------3 Quest-------------
        let conteoPreg3_1 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        
        let conteoPreg3_2 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        
        let conteoPreg3_3 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        
        let conteoPreg3_4 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
          //-------------------------------------------------------4 Quest-------------
        let conteoPreg4_1 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        
        let conteoPreg4_2 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        
        let conteoPreg4_3 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        
        let conteoPreg4_4 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        //-------------------------------------------------------5 Quest-------------
        let conteoPreg5_1 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        
        let conteoPreg5_2 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        
        let conteoPreg5_3 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        
        let conteoPreg5_4 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        //-------------------------------------------------------6 Quest-------------
        let conteoPreg6_1 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        
        let conteoPreg6_2 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        
        let conteoPreg6_3 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        
        let conteoPreg6_4 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        //-------------------------------------------------------7 Quest-------------
        let conteoPreg7_1 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        
        let conteoPreg7_2 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        
        let conteoPreg7_3 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        
        let conteoPreg7_4 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
          //-------------------------------------------------------8 Quest-------------
        let conteoPreg8_1 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        
        let conteoPreg8_2 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        
        let conteoPreg8_3 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        
        let conteoPreg8_4 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
          //-------------------------------------------------------9 Quest-------------
        let conteoPreg9_1 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        
        let conteoPreg9_2 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        
        let conteoPreg9_3 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        
        let conteoPreg9_4 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
          //-------------------------------------------------------10 Quest-------------
        let conteoPreg10_1 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        
        let conteoPreg10_2 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        
        let conteoPreg10_3 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        
        let conteoPreg10_4 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
          //-------------------------------------------------------11 Quest-------------
        let conteoPreg11_1 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        
        let conteoPreg11_2 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        
        let conteoPreg11_3 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
        
        let conteoPreg11_4 = await collection.aggregate(
          [
            {
              '$match': {
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
          );
          



















































          
      
      
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
            res.render('resultados_encuesta', { title: "Ver calificaciones", datos:0, coordi:req.user.coordi});
          })  
          .catch((err)=>{
              console.log(err);
          })
          .finally(()=>{
              client.close
          })

  
});

module.exports = router;