const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://pruebas:admin@clustergeneral.l4wbj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
//const url = 'mongodb://localhost:27018';
const client = new MongoClient(url);


const dbName = 'Calificaciones';

module.exports = {client, dbName}; 