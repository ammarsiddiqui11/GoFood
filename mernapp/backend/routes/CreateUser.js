const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwtsecret = "ammarsiddiqui121#"
router.post(
  "/createuser",
  [
    body("email").isEmail().withMessage("Enter a valid email address"),
    body("name").isLength({ min: 5 }).withMessage("Name should be at least 5 characters long"),
    body("password").isLength({ min: 5 }).withMessage("Password should be at least 5 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10)
    let secpassword = await bcrypt.hash(req.body.password,salt)

    try {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpassword,
        location: req.body.location,
      });
      res.json({ success: true });
      
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);


router.post(
    "/loginuser",
    [
        body("email").isEmail().withMessage("Enter a valid email address"),
        body("password").isLength({ min: 5 }).withMessage("Password should be at least 5 characters long"),
      ],
    async (req, res) => {
     let email = req.body.email;
     const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
      try {
        let userData = await User.findOne({email});
        if(!userData){
            return res.status(400).json({ errors: "try with correct credentials" });
        }
        const pwdcompare = await bcrypt.compare(req.body.password,userData.password)
       if(!pwdcompare){
        return res.status(400).json({ errors: "try with correct credentials" });
       }
       const data ={
        user:{
            id:userData.id
        }
       }
       const authToken = jwt.sign(data,jwtsecret)
       return res.json({ success: true,authToken:authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Server error" });
      }
    }
  );

module.exports = router;
