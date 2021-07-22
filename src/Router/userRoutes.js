// Express
const express = require('express');
const router = express.Router();

// Controller
const userController = require('../controllers/userController');


// Middlewares
const uploadFile = require('../middlewares/multerMiddleware'); 
const formValidations = require('../middlewares/validateRegisterMiddleware');
const profileValidations = require('../middlewares/validateProfileMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const validateLogin = require('../middlewares/validateLoginMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');


//Ruta test
router.get('/test', guestMiddleware, userController.findAll);

// Formulario de registro
router.get('/register', guestMiddleware, userController.register);

// Procesar el registro
router.post('/register', uploadFile.single('avatar'), formValidations, userController.processRegister);

// Formulario de login
router.get('/login', guestMiddleware, userController.login);

// Procesar el login
router.post('/login', validateLogin, userController.processLogin);

// Perfil de Usuario
router.get('/profile', authMiddleware, userController.profile);
// Actalizo Perfil de Usuario
router.put('/profile', authMiddleware, uploadFile.single('avatar') ,profileValidations , userController.updateProfile);

// Logout
router.get('/logout/', userController.logout);


module.exports = router;