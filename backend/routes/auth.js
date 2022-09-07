const express = require('express');
const router = express.Router();
const User= require("../models/User");
const bcrypt= require('bcryptjs')
const { body, validationResult } = require('express-validator');
const JWT_SECRET = 'n#v!l!s@goodb$y'
var jwt = require('jsonwebtoken')
var fetchuser = require('../middleware/fetchuser')

//ROUTE 1: create a user using: POST "/api/auth/createuser". No login required
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min : 3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({ min: 5 }),
],async(req, res)=>{
    let success = false;
    //errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        //check existed already
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({success, error: "Sorry a user with this email exists"})
        }

        //hashing methods
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);

        //create a new user
        user= await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        const payload ={
            user:{
                id: user.id
            }
        }
        //jwt authtoken
        const authtoken = jwt.sign(payload, JWT_SECRET)

        success = true
        // res.json(user)
        res.json({success,authtoken})
        } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

//ROUTE 2: authentic a user using: POST "/api/auth/login". No login required
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password can not be blank').exists(),
],async(req, res)=>{

    //errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try {
        let success = false;
        let user = await User.findOne({email});
        if(!user){
            success= false;
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            success= false;
            return res.status(400).json({success,error: "Please try to login with correct credentials"});
        }

        const payload ={
            user:{
                id: user.id
            }
        }

        //JWT authentication
        const authtoken = jwt.sign(payload, JWT_SECRET)
        success = true;
        res.json({success, authtoken})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error")
    }
})




//ROUTE 2: get login user details: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async(req, res)=>{

    try {
        userId= req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error")
    }
})

module.exports = router
