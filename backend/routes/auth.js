const express = require('express')
const router = express.Router();
const { body } = require('express-validator');
const User = require('../models/user');

const authControllers = require('../controllers/authController');

router.post('/login', authControllers.loginUser);
router.post(
    '/signup', 
    [
        body('userEmail')
            .isEmail()
            .withMessage('Please provide correct email.')
            .custom(async (value) => {
                const userDoc = await User.findOne({email: value});
                if(userDoc){
                    throw new Error("User with this email already exist")
                }       
        }),
        body('userPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('userName').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'), 
        body('userConfirmPassword').custom((value, { req }) => {
            if(value !== req.body.userPassword){
                throw new Error('Passwords have to match!')
            }
            return true
        }),
    ],
    authControllers.signupUser
);
router.delete('/logout', authControllers.logoutUser);

module.exports = router;