/* Importação de dependencias */
const router = require("express").Router();

/**
 * Quando o endpoint que estamos trabalhando é o do pai, precisamos dizer para o express
 * que o seu endpoint é o atual. Ou seja, '/'. Abaixo temos o exemplo da rota v1/usuario que possui POST e GET.
 */
router.use("/", require("./usuario"));

module.exports = router;
