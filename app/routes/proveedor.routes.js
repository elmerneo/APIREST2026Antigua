module.exports = (app) => {
    const proveedores = require("../controllers/proveedor.controller.js");
    const router = require("express").Router();

    // Crear un nuevo Proveedor
    router.post("/create/", proveedores.create);

    // Obtener todos los Proveedores
    router.get("/", proveedores.findAll);

    // Obtener un solo Proveedor por ID
    router.get("/:id", proveedores.findOne);

    // Actualizar un Proveedor por ID
    router.put("/:id", proveedores.update);

    // Eliminar un Proveedor por ID
    router.delete("/:id", proveedores.delete);

    // Prefijo de la API
    app.use("/api/proveedores", router);
};