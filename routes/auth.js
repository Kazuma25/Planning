const bcrypt = require('bcrypt');
const config = require('../config/jwt-config');
const { User } = require('../models');
const jwtUtils = require('../utils/jwt.utils');
const express = require('express');
const router = express.Router();
// ... Fonctions affichées dans prochaines slides

const register = async (req, res, next) => {
    try {
    const { password, email, nom, prenom, adresse } = req.body;
    if (await User.findOne({where: {email: email}})) {
    return res.status(400).json({ message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, config.SALT_ROUNDS);
    const newUser = User.create({
    password: hashedPassword,
    email,
    nom,
    prenom,
    adresse
    });
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({
    message: 'User registered successfully',
    user: userWithoutPassword
    });
    } catch (error) {
    next(error);
    }
};

const login = async (req, res, next) => {
    try {
    const { email, password } = req.body;
    const user = await User.findOne({where: {email: email}});
    if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
    return res.status(401).json({ message: 'Invalid credentials' });
    }
    const accessToken = jwtUtils.generateAccessToken(user);
    res.json({
    message: 'Login successful',
    accessToken,
    });
    } catch (error) {
    next(error);
    }
};

// Auth routes
router.post('/register', register);
router.post('/login', login);
module.exports = router;
