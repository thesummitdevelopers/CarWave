const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;

const mensajesSchema    = new Schema({
  usuario_emisor: String,
  usuario_receptor: String,
  contenido: String,
  fecha: Date,

});

const mensajesModel = mongoose.model('mensajes',mensajesSchema);

module.exports = {
  create: (req,res,next)=>{
    const mensaje = new mensajesModel({
      _id: new mongoose.Types.ObjectId(),
      usuario_emisor: req.body.usuario_emisor,
      usuario_receptor: req.body.usuario_receptor,
      contenido: req.body.contenido,
      fecha: new Date(),

    });
    mensaje
      .save()
      .then(result =>{
        res.status(200).json({
          message: 'Mensaje Creado con Exito',
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
    mensajesModel.find()
      .select('_id usuario_emisor usuario_receptor contenido fecha')
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          data : docs.map(doc=>{
            return{
                ...doc['_doc']
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
    mensajesModel.update({_id: id}, {$set: updateParams})
      .exec()
      .then(result =>{
        res.status(200).json({
          message: 'Mensaje Actualizado'
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
    mensajesModel.findById(id)
      .select('_id usuario_emisor usuario_receptor contenido fecha')
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
    mensajesModel.remove({_id: id})
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'Mensaje eliminado'
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
