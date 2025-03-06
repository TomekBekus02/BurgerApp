const express = require('express')
const router = express.Router();

const authControllers = require('../controllers/authController');

router.post('/login', authControllers.loginUser);
router.post('/signup', authControllers.signupUser);
router.delete('/logout', authControllers.logoutUser);

module.exports = router;