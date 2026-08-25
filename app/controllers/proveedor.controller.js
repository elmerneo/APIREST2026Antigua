const Proveedor = require('../models/proveedor.model.js');

exports.findAll = (req, res) => {
	Proveedor.findAll()
		.then((proveedores) => res.send(proveedores))
		.catch((error) => res.status(500).send({ message: error.message }));
};

exports.findOne = (req, res) => {
	Proveedor.findByPk(req.params.id)
		.then((proveedor) => {
			if (!proveedor) {
				return res.status(404).send({ message: 'Proveedor no encontrado.' });
			}
			res.send(proveedor);
		})
		.catch((error) => res.status(500).send({ message: error.message }));
};

exports.create = (req, res) => {


        if (!req.body.nombre) {
        res.status(400).send({
            message: "El nombre del proveedor no puede venir vacio"
        });
        return;
    }

    // Create a Product, definiendo una variable con la estructura del reques para luego solo ser enviada como parametro mas adelante. 
    const proveedorData = {
        nombre: req.body.nombre,
        nit: req.body.nit,
        telefono: req.body.telefono,
        email: req.body.email,
        direccion: req.body.direccion,
        // utilizando ? nos ayuda a indicar que el paramatro puede ser opcional dado que si no viene, le podemos asignar un valor default
        status: req.body.status ? req.body.status : false
    };


	Proveedor.create(proveedorData)
    
		.then((proveedor) => res.status(201).send(proveedor))
		.catch((error) => res.status(400).send({ message: error.message }));
};

exports.update = (req, res) => {
	Proveedor.findByPk(req.params.id)
		.then((proveedor) => {
			if (!proveedor) {
				return res.status(404).send({ message: 'Proveedor no encontrado.' });
			}
			return proveedor.update(req.body);
		})
		.then((proveedor) => {
			if (proveedor) res.send(proveedor);
		})
		.catch((error) => res.status(400).send({ message: error.message }));
};

exports.delete = (req, res) => {
	Proveedor.findByPk(req.params.id)
		.then((proveedor) => {
			if (!proveedor) {
				return res.status(404).send({ message: 'Proveedor no encontrado.' });
			}
			return proveedor.destroy();
		})
		.then(() => res.status(204).send())
		.catch((error) => res.status(500).send({ message: error.message }));
};
