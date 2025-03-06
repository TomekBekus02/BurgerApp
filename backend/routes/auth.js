const express = require('express')
const router = express.Router();

const authControllers = require('../controllers/authController');

router.post('/login', authControllers.loginUser);
router.post('/logout', authControllers.logoutUser);
router.post('/signup', authControllers.signupUser);

module.exports = router;