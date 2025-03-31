const express = require('express');
const router = express.Router();
const { Equipe } = require('../models');

// GET : Récupérer toutes les équipes
router.get("/", async (req, res) => {
  try {
    const equipes = await Equipe.findAll();
    res.status(200).json(equipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET : Récupérer une équipe par ID
router.get("/:id", async (req, res) => {
  try {
    const equipe = await Equipe.findByPk(req.params.id);
    if (!equipe) {
      return res.status(404).json({ error: "Équipe non trouvée" });
    }
    res.status(200).json(equipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST : Ajouter une équipe
router.post("/", async (req, res) => {
  try {
    const { nom, idUtilisateur } = req.body;

    if (!idUtilisateur) {
      return res.status(400).json({ error: "idUtilisateur est requis" });
    }

    const equipe = await Equipe.create({ nom, idUtilisateur });
    res.status(201).json(equipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE : Supprimer une équipe par ID
router.delete("/del/:id", async (req, res) => {
  try {
    const equipe = await Equipe.findByPk(req.params.id);
    if (!equipe) {
      return res.status(404).json({ error: "Équipe non trouvée" });
    }
    await equipe.destroy();
    res.status(200).json({ message: "Équipe supprimée" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
