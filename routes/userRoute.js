const express = require('express');
const router = express.Router();
const { User } = require('../models');

// GET : Récupérer tout les User
router.get("/", async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

// GET : Récupérer un User by id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE : Supprimer un User par ID
router.delete("/del/:id", async (req, res) => {
    try {
      const adresse = await Adresse.findByPk(req.params.id);
      if (!adresse) {
        return res.status(404).json({ error: "User non trouvé" });
      }
      await adresse.destroy();
      res.status(200).json({ message: "User supprimé" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

module.exports = router;