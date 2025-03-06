const User = require('../models/user');
const bcryptjs = require('bcryptjs');

exports.loginUser = (req, res, next) => {
    try {
        const email = req.body.userEmail;
        const password = req.body.userPassword;

        console.log("email " + email + " password " + password);
        User.findOne({email: email})
            .then(user => {
                if(!user){
                    console.log("Wrong email or password");
                    return res.status(409).json({message: "Wrong email or password"});
                }
                bcryptjs.compare(password, user.password)
                .then(doMatch => {
                    if(doMatch){
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            if(email=="admin@admin.com"){
                                console.log("login in sucess as Admin");
                                res.status(200).json({
                                    message: `Logged in sucessfuly as Admin`, 
                                    role: 'Admin',
                                    userName: 'Admin'
                                });
                            }else{
                                console.log(`login in sucess as ${user.userName}`);
                                res.status(200).json({
                                    message: `Logged in sucessfuly as ${user.userName}`, 
                                    role: 'User',
                                    userName: user.userName
                                });
                            }
                        })
                    }
                    console.log("Wrong email or password");
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

exports.signupUser = async (req, res, next) => {
    const userName = req.body.userName;
    const email = req.body.userEmail;
    const password = req.body.userPassword;
    
    console.log("email " + email + " password " + password);
    try {
        User.findOne({email: email})
        .then(userDoc => {
            if(userDoc){
                console.log("User with this email already exist");
                return res.status(409).json({message: "User with this email already exist"});
            }
            console.log("useDoc: " + userDoc);
            return bcryptjs
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
        }).catch(err=>{
            console.log(err);
        })
    } catch (error) {
        console.log(error);
    }
}

exports.logoutUser = (req, res, next) => {
    try {
        req.session.destroy(err => {
            console.log(err);
            res.status(200).json({message: "succesfuly logout"});
        })
    } catch (error) {
        console.log(error);
    }
}