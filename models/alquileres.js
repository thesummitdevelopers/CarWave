const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;

const alquileresSchema    = new Schema({
  usuario_emisor: String,
  usuario_receptor: String,
  placa: String,
  marca: String,
  modelo: String,
  costo: String,
  fecha_alquiler: Date,

});

const alquileresModel = mongoose.model('alquileres',alquileresSchema);

module.exports = {
  create: (req,res,next)=>{
    const alquiler = new alquileresModel({
      _id: new mongoose.Types.ObjectId(),
      usuario_emisor: req.body.usuario_emisor,
      usuario_receptor: req.body.usuario_receptor,
      placa: req.body.placa,
      marca: req.body.marca,
      modelo: req.body.modelo,
      costo: req.body.costo,
      fecha: new Date(),

    });
    alquiler
      .save()
      .then(result =>{
        res.status(200).json({
          message: 'Alquiler creado con Exito',
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
    alquileresModel.find()
      .select('_id usuario_emisor usuario_receptor placa marca modelo costo fecha')
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
    alquileresModel.update({_id: id}, {$set: updateParams})
      .exec()
      .then(result =>{
        res.status(200).json({
          message: 'Alquiler Actualizado'
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
    alquileresModel.findById(id)
      .select('_id usuario_emisor usuario_receptor placa marca modelo costo fecha')
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
    alquileresModel.remove({_id: id})
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'Alquiler eliminado'
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
