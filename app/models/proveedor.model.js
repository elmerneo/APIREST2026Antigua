module.exports = (sequelize, Sequelize) => {
    const Proveedor = sequelize.define("proveedor", {
        nombre: {
            type: Sequelize.STRING
        },
        nit: {
            type: Sequelize.STRING
        },
        telefono: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        direccion: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.BOOLEAN
        }
    });

    return Proveedor;
};