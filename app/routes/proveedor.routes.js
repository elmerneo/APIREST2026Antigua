module.exports = app => {
const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedor.controller');

router.get('/', proveedorController.findAll);
router.get('/:id', proveedorController.findOne);
router.post('/create/', proveedorController.create);
router.put('/update/:id', proveedorController.update);
router.delete('/delete/:id', proveedorController.delete);

app.use('/api/proveedores', router);
};
    

