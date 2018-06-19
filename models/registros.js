const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;

const usuariosSchema    = new Schema({
  usuario: String,
  contraseña: String,
  nombres: String,
  apellidos: String,
  telefono: Number,
  correo: String,
  Valoracion: Number,
});

const publicacionesSchema    = new Schema({
  placa: String,
  estado: String,
  costo  : Number,
  modelo  : String,
  marca: String,
  año_veh: Number,
  titulo  : String,
  descripcion  : String,
  fecha_pub: Date,
  imagenes: Buffer,
  tipo_servicio  : String,

});
