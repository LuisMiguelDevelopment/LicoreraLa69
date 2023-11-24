const express = require('express');
const router = express.Router();
const productoController = require("../controllers/productosController")
const upload = require ("../config/multer-config")


router.post('/productos', upload.single('imagen'), productoController.crearProducto);
router.get('/productos',productoController.obtenerProductos);
router.get('/productosEstado',productoController.verificarEstadoProductos);
router.put('/productos/:id',upload.single('imagen'),productoController.editarProductos);
router.delete('/productos/:id',productoController.eliminarProductos);

module.exports = router;