/* Importação de dependencias */
const router = require("express").Router();

/* Importação de middlewares */
const SchemaValidator = require("../../../middlewares/SchemaValidation");

/* Importação Controllers */
const UsuarioController = require("../../../controllers/usuario/Usuario");

/*  */
router
  .route("/usuario")
  .get()
  .post(SchemaValidator(true), UsuarioController.criar);

module.exports = router;
