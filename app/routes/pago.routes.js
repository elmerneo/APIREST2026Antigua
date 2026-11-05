module.exports = app => {
    const pagos = require("../controllers/pago.controller.js");
    var router = require("express").Router();

    // POST /api/pagos - Crear un nuevo pago
    router.post("/", pagos.create);

    // GET /api/pagos - Obtener todos (opcional)
    router.get("/", pagos.findAll);

    // GET /api/pagos/carnet/:carnet - Buscar pagos por carnet
    router.get("/carnet/:carnet", pagos.findByCarnet);

    // GET /api/pagos/:id - Buscar un pago por ID
    router.get("/:id", pagos.findOne);

    // PUT /api/pagos/:id - Actualizar un pago por ID
    router.put("/:id", pagos.update);

    // DELETE /api/pagos/:id - Eliminar un pago por ID
    router.delete("/:id", pagos.delete);

    // Se monta bajo el prefijo /api/pagos -> Quedando como http://localhost:puerto/api/pagos
    app.use("/api/pagos", router);
};
