const express = require('express');
const router = express.Router();
const cartController = require("../controllers/cartController")
const validator = require ('../middlewares/tokenValidation')



router.post('/carrito',validator,cartController.addProductoCart)
router.get('/carrito/:id',validator,cartController.getProductoCart)
router.get('/carrito',validator,cartController.getProductoCart)
router.put('/carrito/:productoId',cartController.putProducto)
router.delete('/carrito/:productoId',cartController.deleteProducto)

module.exports = router;