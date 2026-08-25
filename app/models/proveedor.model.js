module.exports = (sequelize, Sequelize) => {
	const Proveedor = sequelize.define('proveedor', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		nombre: {
			type: Sequelize.STRING(100),
			allowNull: false,
		},
		nit: {
			type: Sequelize.STRING(20),
			allowNull: false,
			unique: true,
		},
		telefono: {
			type: Sequelize.STRING(20),
		},
		email: {
			type: Sequelize.STRING(100),
			validate: {
				isEmail: true,
			},
		},
		direccion: {
			type: Sequelize.STRING(200),
		},
	}, {
		tableName: 'proveedores',
		timestamps: true,
	});

	return Proveedor;
};
