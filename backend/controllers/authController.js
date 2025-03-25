require('dotenv').config();
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const { validationResult } = require('express-validator');


exports.loginUser = (req, res) => {
    try {
        const email = req.body.userEmail;
        const password = req.body.userPassword;

        User.findOne({email: email})
            .then(user => {
                if(!user){
                    return res.status(409).json({message: "Wrong email or password"});
                }
                bcryptjs.compare(password, user.password)
                .then(doMatch => {
                    if(doMatch){
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            const SECRET_KEY = process.env.JWT_SECRET;
                            const token = jwt.sign(
                                { userName: user.userName, role: user.role, userId: user._id }, 
                                SECRET_KEY,
                                { expiresIn: '1h' }
                            );
                            let cartQuantity = 0;
                            let cartTotalPrice = 0;
                            for (item of user.cart.items){
                                cartQuantity += item.quantity
                                cartTotalPrice += item.itemCartPrice * item.quantity
                            }
                            res.json({ token, cart: user.cart, cartQuantity, cartTotalPrice })

                        })
                    }
                    return res.status(409).json({message: "Wrong email or password"});
                })
                .catch(err => {
                    console.log(err);
                })
            })
            .catch(err => {
                console.log(err);
            })
    } catch (error) {
        console.log(error);
    }
}

exports.signupUser = async (req, res) => {
    const userName = req.body.userName;
    const email = req.body.userEmail;
    const password = req.body.userPassword;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const errorMessages = {};
        errors.array().forEach(error => {
            if (error.path === 'userName') {
                errorMessages.userName = error.msg;
            } else if (error.path === 'userEmail') {
                errorMessages.userEmail = error.msg;
            } else if (error.path === 'userPassword') {
                errorMessages.userPassword = error.msg;
            } else if (error.path === 'userConfirmPassword') {
                errorMessages.userConfirmPassword = error.msg;
            }
        })
        return res.status(422).json(errorMessages);
    }
    try {
        bcryptjs
        .hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                userName: userName,
                email: email,
                password: hashedPassword,
                cart: { item: [] },
                role: "user"
            })
                return user.save();
        })
        .then(user => {
            return res.status(200).json(user);
        })
        .catch(err=>{
            console.log(err);
        })
    } catch (error) {
        console.log(error);
    }
}

exports.logoutUser = (req, res) => {
    try {
        req.session.destroy(err => {
            res.status(200).json({message: "succesfuly logout"});
        })
    } catch (error) {
        console.log(error);
    }
}