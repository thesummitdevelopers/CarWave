const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;

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

const publicacionesModel = mongoose.model('publicaciones',publicacionesSchema);

module.exports = {
  create: (req,res,next)=>{
    const publicacion = new publicacionesModel({
      _id: new mongoose.Types.ObjectId(),
      placa: req.body.placa,
      estado: req.body.estado,
      costo: req.body.costo,
      modelo: req.body.modelo,
      marca: req.body.marca,
      año_veh: req.body.año_veh,
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      fecha_pub: new Date(),
      imagenes: req.body.imagenes,
      tipo_servicio: req.body.tipo_servicio
    });
    publicacion
      .save()
      .then(result =>{
        res.status(200).json({
          message: 'Publicación Creada con Exito',
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
    publicacionesModel.find()
      .select('_id placa estado costo modelo marca año_veh titulo descripcion fecha_pub imagenes tipo_servicio')
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
    publicacionesModel.update({_id: id}, {$set: updateParams})
      .exec()
      .then(result =>{
        res.status(200).json({
          message: 'Publicación Actualizada'
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
    publicacionesModel.findById(id)
      .select('_id placa estado costo modelo marca año_veh titulo descripcion fecha_pub imagenes tipo_servicio')
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
    publicacionesModel.remove({_id: id})
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'Publicación eliminada'
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
