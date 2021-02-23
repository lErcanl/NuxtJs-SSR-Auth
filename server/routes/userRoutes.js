const express =require('express')
const userController = require('../controller/userController')
const authController = require('../controller/authController')

const router = express.Router();


router.post('/signup',authController.signup);
router.post('/login', authController.login);
router.get('/',userController.getAlllUsers);
router.get('/LoggedIn',authController.isLoggedIn)
router.get('/logout',authController.logout);
router.get('/me',authController.protect,userController.getMe,userController.getUser);
router.get('/getMusics',userController.getArrays)
router.get('/getAllUser',userController.getAlllUsers)

module.exports=router;