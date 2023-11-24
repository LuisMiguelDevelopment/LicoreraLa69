const express = require('express')
const router = express.Router()
const pedido = require('../controllers/pedidos.controller')

router.get("/pedidos-pagados/:userId", pedido.obtenerPedidos)
router.get("/pedidos-pagados/", pedido.todosLosPedidos)

module.exports = router;