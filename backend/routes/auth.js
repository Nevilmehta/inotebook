const express = require('express');
const router = express.Router();
const User= require("../models/User");
const bcrypt= require('bcryptjs')
const { body, validationResult } = require('express-validator');
const JWT_SECRET = 'n#v!l!s@goodb$y'
var jwt = require('jsonwebtoken')

// create a user using: POST "/api/auth/createuser". No login required
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min : 3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({ min: 5 }),
],async(req, res)=>{
    //errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        //check existed already
        
    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({error: "Sorry a user with this email exists"})
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
    const data ={
        user:{
            id: user.id
        }
    }
    const authtoken = jwt.sign(data, JWT_SECRET)

    // res.json(user)
    res.json({authtoken})
    } catch (error) {
            console.error(error.message);
            res.status(500).send("some error occured")
    }
})

module.exports = router