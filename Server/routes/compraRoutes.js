const express = require('express');
const router = express.Router();
const compraController = require("../controllers/compraController")
const validator = require ('../middlewares/tokenValidation')
const upload = require("../config/multer-config")

router.get('/compra', validator, upload.single('imagen'), compraController.getCompra);
router.post('/compra', validator, compraController.addAlaCompra);

module.exports = router;