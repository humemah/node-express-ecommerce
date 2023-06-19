const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.post("/user-registration", userController.registerUser);
router.post("/login-user", userController.loginUser);
router.get("/profile", userController.authenticateToken, (req, res) => {
  // Handle the profile route logic here
  // Access the authenticated user information using req.user
  // Return the user profile information in the response
});

module.exports = router;
