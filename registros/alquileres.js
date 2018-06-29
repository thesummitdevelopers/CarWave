const express = require('express');
const router  = express.Router();

const alquilerModel = require('../models/alquileres');

router.get('/', alquilerModel.find);
router.get('/:id',alquilerModel.findOne);
router.post('/',alquilerModel.create);
router.put('/:id',alquilerModel.update);
router.delete('/:id',alquilerModel.delete);

module.exports = router;
