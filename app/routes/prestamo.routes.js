module.exports = app => {
    const prestamo = require("../controllers/prestamo.controller.js");
    var router = require("express").Router();
    // Create a new Prestamo
    router.post("/create/", prestamo.create);
    // Retrieve all Prestamo
    router.get("/", prestamo.findAll);
    // Retrieve all by status (0 pending, 1 returned)
    router.get("/status", prestamo.findAllStatus);
    // Retrieve a single Prestamo with id
    router.get("/:id", prestamo.findOne);
    // Update a Prestamo with id
    router.put("/update/:id", prestamo.update);
    // Delete a Prestamo with id
    router.delete("/delete/:id", prestamo.delete);
    // Delete all Prestamo
    router.delete("/delete/", prestamo.deleteAll);
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/prestamo/
    app.use("/api/prestamo", router);
};
