const express = require ('express');
const router = express.Router();
const apiController = require('../controllers/api-controller');

router.get('/clientes', apiController.recuperarClientes);
router.get('/clientes/:id', apiController.recuperarClienteById);
router.post('/clientes', apiController.incluirCliente);
router.put('/clientes/:id', apiController.alterarCliente);
router.delete('/clientes/:id', apiController.excluirCliente);

module.exports = router;