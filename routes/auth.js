const router = require('express').Router();
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req,res) => {
    //Register Validation / errors
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //Checking email is registered or not
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');
    //Hashing password for security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //Creating new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    //Success
    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err);
    }
});

router.post('/login', async (req,res) => {
    //Login Validation / errors
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //Checking email if the email is exists
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email is not found, please try again');
    //Checking password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    //assigning the token/ creating the token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});

module.exports = router;