const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;

const usuariosSchema    = new Schema({
  usuario: String,
  contraseña: String,
  nombres: String,
  apellidos: String,
  telefono: Number,
  correo: String,
  valoracion: Number,
});

const usuariosModel = mongoose.model('usuarios',usuariosSchema);

module.exports = {
  create: (req,res,next)=>{
    const usuario = new usuariosModel({
      _id: new mongoose.Types.ObjectId(),
      usuario: req.body.usuario,
      contraseña: req.body.contraseña,
      nombres: req.body.nombres,
      apellidos: req.body.apellidos,
      telefono: req.body.telefono,
      correo: req.body.correo ,
      valoracion: req.body.valoracion
    });
    usuario
      .save()
      .then(result =>{
        res.status(200).json({
          message: 'Usuario Creado con Exito',
          data:{
            ...result
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error:err
        });
      });
  },
  find: (req, res, next) => {
    usuariosModel.find()
      .select('_id usuario contraseña nombres apellidos telefono correo valoracion')
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          data : docs.map(doc=>{
            return{
                ...doc
            };
          })
        };
        res.status(200).json(response);
      })
      .catch(err=>{
        console.log(err);
        res.status(500).json({
          error:err
        });
      });
  },
  update: (req, res, next) =>{
    const id = req.params.id;
    let updateParams = {
      ...req.body
    };
    usuariosModel.update({_id: id}, {$set: updateParams})
      .exec()
      .then(result =>{
        res.status(200).json({
          message: 'Usuario Actualizado'
        });
      })
      .catch(err =>{
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  },
  findOne: (req,res,next)=>{
    const id = req.params.id;
    usuariosModel.findById(id)
      .select('_id usuario contraseña nombres apellidos telefono correo valoracion')
      .exec()
      .then(doc => {
        if(doc){
          res.status(200).json({
            data:doc,
          });
        } else {
          res.status(404).json({message: 'No valid entry found for provided ID'});
        }
      })
      .catch(err =>{
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  },
  delete: (req, res, next)=>{
    const id = req.params.id;
    usuariosModel.remove({_id: id})
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'Usuario eliminado'
        });
      })
      .catch(err =>{
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }
};
