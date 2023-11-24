const express = require('express');
const router = express.Router();
const usuarioController = require("../controllers/usuariosController");
const {registerSchema , loginSchema  } = require('../schema/auth.schema')
const { validateSchema} = require('../middlewares/validator.middlewares');
const requireAuth  = require('../middlewares/tokenValidation');
const upload = require("../config/multer-config");

router.post('/register' ,validateSchema(registerSchema), usuarioController.register);
router.post('/login' , validateSchema(loginSchema),usuarioController.login);
router.post('/logout' , usuarioController.logout);
router.get('/verify', usuarioController.verifyToken);
router.put('/editarPerfil/:id', upload.single('imagen') ,usuarioController.editarPerfil);
router.get('/profile/:id', requireAuth, usuarioController.profile);



module.exports = router;