module.exports = (sequelize, Sequelize) => {
    const Pago = sequelize.define("pago", {
        semestre: {
            type: Sequelize.STRING
        },
        mes: {
            type: Sequelize.STRING
        },
        anio: {
            type: Sequelize.INTEGER
        },
        carnet: {
            type: Sequelize.STRING
        },
        monto: {
            type: Sequelize.DECIMAL(10, 2)
        }
    });

    return Pago;
};
