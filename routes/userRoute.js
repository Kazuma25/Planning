const express = require('express');
const router = express.Router();
const { User } = require('../models');

// GET : Récupérer tout les User
router.get("/", async (req, res) => {
    try {
      const user = await User.findAll();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

// GET : Récupérer un User by id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.status(200).json(User);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



//POST : Ajouter une Adresse
router.post("/", async (req, res) => {
  try {
    const { idAdresse, numRue, nomRue, commune } = req.body;

    if (!idPracticiens || !dateDebut || !dateFin) {
      return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    const rdv = await PrendreRdv.create({
      idAdresse,
      numRue,
      nomRue,
      commune,
    });

    res.status(201).json(rdv);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
    
// DELETE : Supprimer un Adresse par ID
router.delete("/del/:id", async (req, res) => {
    try {
      const adresse = await Adresse.findByPk(req.params.id);
      if (!adresse) {
        return res.status(404).json({ error: "Adresse non trouvé" });
      }
      await adresse.destroy();
      res.status(200).json({ message: "Adresse supprimé" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

module.exports = router;