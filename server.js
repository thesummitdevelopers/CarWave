//Importamos los paquetes necesarios
var express     = require('express');     //Importamos express
var app         = express();              //Instanciamos una aplicacion
var bodyParser  = require('body-parser');

//Configuramos nuestra app para usar bodyParser()
//El cual nos permitirá obtener data enviada por POST
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8082; //Configuramos nuestro puerto

// ROUTES FOR OUR API
//====================================================================0
var router = express.Router();      //Obetenemos una instancia del enrutador de express

//Ruta de prueba para ver si todo funciona(accesible por GET http://localhost:8081/api)
router.get('/', function(req,res){
  res.json({ message: 'genial! Bienvenido a nuestra api!'});
});

//var usuariosRouter = require('./registros/usuarios');
//var publicacionesRouter = require('./registros/publicaciones');

//router.use('/usuarios', usuariosRouter);
//router.use('/publicaciones', publicacionesRouter);

// REGISTREMOS NUESTRAS RUTAS -------
// TODAS LAS RUTAS TENDRAN EL PREFIJO /API
app.use('/api', router);

//Nos conectamos a nuestra base de datos
//var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/CarWave')
//mongoose.Promise = global.Promise;
//INICIAMOS EL SERVIDOR
//====================================
app.listen(port);
console.log('La magia sucede en el puerto '+ port);
