const db = require("../models");
const Producto = db.productos; // ✅ Coincide con db.productos exportado en index.js
const Op = db.Sequelize.Op;

// Create and Save a new Product
exports.create = (req, res) => {
    // Validamos que el cuerpo de la petición contenga el nombre
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Creamos el objeto del producto a insertar
    const producto = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        costo: req.body.costo,
        stock: req.body.stock,
        ingreso: req.body.ingreso,
        status: req.body.status ? req.body.status : false
    };

    // Guardamos en la base de datos
    Producto.create(producto)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Product."
            });
        });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Producto.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving products."
            });
        });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Producto.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Producto with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Producto with id=" + id
            });
        });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Producto.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Producto was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Producto with id=${id}. Maybe Producto was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Producto with id=" + id
            });
        });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Producto.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Producto was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Producto with id=${id}. El producto no fue encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Producto with id=" + id
            });
        });
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
    Producto.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Products were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all products."
            });
        });
};

// Find all active Products (status = true)
exports.findAllStatus = (req, res) => {
    Producto.findAll({ where: { status: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Products."
            });
        }); 
};