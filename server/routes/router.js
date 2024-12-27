const express = require("express");
const { register, signIn, updateProfile, logout, getUserById } = require("../controller/user.controller");
const { auth } = require("../middleware/auth");
const {body}=require("express-validator");

const router = express.Router();

router.post("/register",body("email").isEmail().withMessage("Invalid Email"),
body("password").isLength({min:5}).withMessage("Password must be atleast 5 characters long"),
body("contact").isLength({min:10}).withMessage("Contact must be atleast 10 characters long"),
body("username").isLength({min:5}).withMessage("Username must be atleast 5 characters long"),
register);
router.post("/signIn", signIn);
router.post("/updateProfile",auth,body("email").isEmail().withMessage("Invalid Email"),
body("contact").isLength({min:10}).withMessage("Contact must be atleast 10 characters long"),
body("username").isLength({min:5}).withMessage("Username must be atleast 5 characters long"),
updateProfile);   
router.post("/logout",auth,logout);
router.post("/get_user",auth,getUserById);


module.exports = router;