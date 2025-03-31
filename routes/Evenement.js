const express = require('express');
const router = express.Router();
const { Evenement } = require('../models');

// GET : Récupérer tous les événements
router.get("/", async (req, res) => {
  try {
    const evenements = await Evenement.findAll();
    res.status(200).json(evenements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET : Récupérer un événement par ID
router.get("/:id", async (req, res) => {
  try {
    const evenement = await Evenement.findByPk(req.params.id);
    if (!evenement) {
      return res.status(404).json({ error: "Événement non trouvé" });
    }
    res.status(200).json(evenement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST : Ajouter un événement
router.post("/", async (req, res) => {
  try {
    const { Nom, description, dateDebut, dateFin } = req.body;

    if (!Nom) {
      return res.status(400).json({ error: "Le nom de l'événement est requis" });
    }

    const evenement = await Evenement.create({
      Nom,
      description,
      dateDebut,
      dateFin
    });

    res.status(201).json(evenement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE : Supprimer un événement par ID
router.delete("/del/:id", async (req, res) => {
  try {
    const evenement = await Evenement.findByPk(req.params.id);
    if (!evenement) {
      return res.status(404).json({ error: "Événement non trouvé" });
    }
    await evenement.destroy();
    res.status(200).json({ message: "Événement supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
