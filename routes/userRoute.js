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
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User non trouvée" });
    }
    await user.destroy();
    res.status(200).json({ message: "User supprimée" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH : Modifier le nom ou l'adresse d'un utilisateur
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, adresse } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    if (nom !== undefined) user.nom = nom;
    if (adresse !== undefined) user.adresse = adresse;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;