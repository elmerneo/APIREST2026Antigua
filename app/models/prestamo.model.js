module.exports = (sequelize, Sequelize) => {
    const Prestamo = sequelize.define("prestamo", {
        titulolibro: {
            type: Sequelize.STRING
        },
        nombreusuario: {
            type: Sequelize.STRING
        },
        carnet: {
            type: Sequelize.STRING
        },
        fecha_prestamo: {
            type: Sequelize.DATE
        },
        fecha_devolucion: {
            type: Sequelize.DATE
        },
        estado: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            validate: {
                isIn: [[0, 1]]
            }
        }
    });

    return Prestamo;
};
