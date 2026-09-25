const db = require("../models");
const Prestamo = db.prestamos;
const Op = db.Sequelize.Op;

// Create and Save a new Prestamo
exports.create = (req, res) => {
    if (!req.body.titulolibro) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const prestamo = {
        titulolibro: req.body.titulolibro,
        nombreusuario: req.body.nombreusuario,
        carnet: req.body.carnet,
        fecha_prestamo: req.body.fecha_prestamo,
        fecha_devolucion: req.body.fecha_devolucion,
        estado: req.body.estado ? req.body.estado : 0
    };

    Prestamo.create(prestamo)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Prestamo."
            });
        });
};

// Retrieve all Prestamo from the database.
exports.findAll = (req, res) => {
    const titulolibro = req.query.titulolibro;
    var condition = titulolibro ? { titulolibro: { [Op.iLike]: `%${titulolibro}%` } } : null;

    Prestamo.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving prestamos."
            });
        });
};

// Find a single Prestamo with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Prestamo.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Prestamo with idprestamo=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Prestamo with idprestamo=" + id
            });
        });
};

// Update a Prestamo by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Prestamo.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Prestamo was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Prestamo with idprestamo=${id}. Maybe Prestamo was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Prestamo with idprestamo=" + id
            });
        });
};

// Delete a Prestamo with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Prestamo.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Prestamo was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Prestamo with idprestamo=${id}. Prestamo no fue encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Prestamo with idprestamo=" + id
            });
        });
};

// Delete all Prestamos from the database.
exports.deleteAll = (req, res) => {
    Prestamo.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Prestamos were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all prestamos."
            });
        });
};

// find all Prestamos by state: 0 pending, 1 returned
exports.findAllStatus = (req, res) => {
    const estado = req.query.estado !== undefined ? Number(req.query.estado) : 0;

    Prestamo.findAll({ where: { estado: estado } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Prestamos."
            });
        });
};
