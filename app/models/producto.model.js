module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define("producto", {
        nombre: {
            type: Sequelize.STRING
        },
        precio: {
            type: Sequelize.DECIMAL(10, 2)
        },
        costo: {
            type: Sequelize.DECIMAL(10, 2)
        }, 
        stock: {
            type: Sequelize.INTEGER
        },
        ingreso: {
            type: Sequelize.DATE
        },
        status: {
            type: Sequelize.BOOLEAN
        }
    });

    return Producto;
};