const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.post("/user-registration", userController.registerUser);
router.post("/login-user", userController.loginUser);
router.get("/profile", userController.authenticateToken, (req, res) => {  
});
router.post('/admin/register', userController.registerAdmin);

// Admin Login
router.post('/admin/login', userController.loginAdmin);


module.exports = router;
