const express = require('express');
const router = express.Router();
const { Appartenir } = require('../models');

// GET : Récupérer toutes les appartenances
router.get("/", async (req, res) => {
  try {
    const appartenances = await Appartenir.findAll();
    res.status(200).json(appartenances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET : Récupérer une appartenance par idUtilisateur et idEquipe
router.get("/:idUtilisateur/:idEquipe", async (req, res) => {
  try {
    const { idUtilisateur, idEquipe } = req.params;

    const appartenance = await Appartenir.findOne({
      where: { idUtilisateur, idEquipe }
    });

    if (!appartenance) {
      return res.status(404).json({ error: "Appartenance non trouvée" });
    }

    res.status(200).json(appartenance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST : Ajouter une appartenance
router.post("/", async (req, res) => {
  try {
    const { idUtilisateur, idEquipe } = req.body;

    if (!idUtilisateur || !idEquipe) {
      return res.status(400).json({ error: "idUtilisateur et idEquipe sont requis" });
    }

    const appartenance = await Appartenir.create({ idUtilisateur, idEquipe });
    res.status(201).json(appartenance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE : Supprimer une appartenance
router.delete("/del/:idUtilisateur/:idEquipe", async (req, res) => {
  try {
    const { idUtilisateur, idEquipe } = req.params;

    const appartenance = await Appartenir.findOne({
      where: { idUtilisateur, idEquipe }
    });

    if (!appartenance) {
      return res.status(404).json({ error: "Appartenance non trouvée" });
    }

    await appartenance.destroy();
    res.status(200).json({ message: "Appartenance supprimée" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
