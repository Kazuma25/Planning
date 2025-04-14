const bcrypt = require("bcrypt");
const config = require("../config/jwt-config");
const { User } = require("../models");
const jwtUtils = require("../utils/jwt.utils");
const express = require("express");
const router = express.Router();

const register = async (req, res, next) => {
  try {
    const { password_field, email, nom, prenom, adresse } = req.body;
    if (await User.findOne({ where: { email: email } })) {
      return res.status(400).json({ message: "Email already exists" });
    }
    console.log(password_field);
    const hashedPassword = await bcrypt.hash(password_field, 10);
    const newUser = User.create({
      password_field: hashedPassword,
      email,
      nom,
      prenom,
      adresse,
    });
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({
      message: "User registered successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password_field } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password_field, user.dataValues.password_field);
    console.log(user.dataValues)
    console.log(req.body)
    if (!validPassword) {
      return res.status(401).json({ message: user.password_field });
    }
    const accessToken = jwtUtils.generateAccessToken(user);
    res.json({
      message: "Login successful",
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

// Auth routes
router.post("/register", register);
router.post("/login", login);

module.exports = router;
