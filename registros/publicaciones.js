const express = require('express');
const router  = express.Router();

const publicacionModel = require('../models/publicaciones');

router.get('/', publicacionModel.find);
router.get('/:id',publicacionModel.findOne);
router.post('/',publicacionModel.create);
router.put('/:id',publicacionModel.update);
router.delete('/:id',publicacionModel.delete);

module.exports = router;
