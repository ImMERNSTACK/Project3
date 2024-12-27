const { validationResult } = require("express-validator");
const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const { where } = require("sequelize");

exports.logout = async (req, res) => {
    try {
        res.clearCookie('token', { httpOnly: true, sameSite: 'strict' });
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({where:{ email }});
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = user.generateAuthToken()
        res.cookie('token', token, { httpOnly: true, sameSite: 'Lax', expires: new Date(Date.now() + 8 * 3600000) });
        res.status(200).json({ message: 'Signed in successfully', user, token });
    } catch (error) {
       return res.status(500).json({ message: 'Server error' });
    }
};

exports.register = async (req, res) => {
    try {
        const { username, email, password,contact } = req.body;
        const preuser = await User.findOne({ where: { email } });
        console.log(preuser);
        if (preuser) { 
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = new User({username, email, password, contact });
        await user.save();
        const token = user.generateAuthToken();
        res.cookie('token', token, { httpOnly: true, sameSite: 'Lax', expires: new Date(Date.now() + 8 * 3600000) });
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error',error });
    }
};

// Update Profile
exports.updateProfile = async (req, res) => {

    const { userId } = req.user;
    console.log('>>>>',userId);
    const { username, email, contact } = req.body;
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(401).json({ error: "Bad request", message: error.array() });
    }
    try {
        const user = await User.findOne({where:{ userId }});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.username = username || user.username;
        user.email = email || user.email;
        user.contact = contact || user.contact;
        await user.save();
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error });
    }
};

exports.getUserById = async (req, res) => {
    const { userId } = req.user;
    console.log(userId);
    try {
        const user = await User.findOne({ where: { userId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }                                                                                       
        res.status(200).json(user);         
    } catch (error) {   
        res.status(500).json({ message: 'Server error', error: error });
    }       
}