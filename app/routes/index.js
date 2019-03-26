/* */
const router = require('express').Router();

/**
 * Todas as nossas rotas estarão dentro da lógica /v1/rota_pai/rota_filha
 * Exemplo: /v1/evento/senha
 */
router.use('/v1', require('./v1'));

module.exports = router;
