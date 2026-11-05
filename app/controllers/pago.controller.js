const db = require("../models");
const Pago = db.pagos;
const Op = db.Sequelize.Op;

// Create and Save a new Pago
exports.create = (req, res) => {
    if (!req.body.carnet || !req.body.monto) {
        res.status(400).send({
            message: "El carnet y el monto no pueden estar vacíos!"
        });
        return;
    }

    const pago = {
        semestre: req.body.semestre,
        mes: req.body.mes,
        anio: req.body.anio,
        carnet: req.body.carnet,
        monto: req.body.monto
    };

    Pago.create(pago)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el pago."
            });
        });
};

// Retrieve all Pagos from the database (con filtro opcional por semestre)
exports.findAll = (req, res) => {
    const semestre = req.query.semestre;
    var condition = semestre ? { semestre: { [Op.iLike]: `%${semestre}%` } } : null;

    Pago.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar los pagos."
            });
        });
};

// Find a single Pago with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Pago.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró el pago con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar el pago con id=" + id
            });
        });
};

// Find all Pagos by Carnet (Requerimiento específico del examen: /api/pagos/carnet/:carnet)
exports.findByCarnet = (req, res) => {
    const carnet = req.params.carnet;

    Pago.findAll({ where: { carnet: carnet } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al buscar pagos por carnet."
            });
        });
};

// Update a Pago by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Pago.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El pago fue actualizado exitosamente."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el pago con id=${id}. ¡Quizás no fue encontrado o req.body está vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el pago con id=" + id
            });
        });
};

// Delete a Pago with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Pago.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "¡El pago fue eliminado exitosamente!"
                });
            } else {
                res.send({
                    message: `No se pudo eliminar el pago con id=${id}. ¡El pago no fue encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el pago con id=" + id
            });
        });
};
