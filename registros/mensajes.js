const express = require('express');
const router  = express.Router();

const mensajeModel = require('../models/mensajes');

router.get('/', mensajeModel.find);
router.get('/:id',mensajeModel.findOne);
router.post('/',mensajeModel.create);
router.put('/:id',mensajeModel.update);
router.delete('/:id',mensajeModel.delete);

module.exports = router;
