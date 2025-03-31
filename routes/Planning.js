const express = require('express');
const router = express.Router();
const { Planning } = require('../models');

// GET : Récupérer tous les plannings
router.get("/", async (req, res) => {
  try {
    const plannings = await Planning.findAll();
    res.status(200).json(plannings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET : Récupérer un planning par idUtilisateur et idEvent (clé composite)
router.get("/:idUtilisateur/:idEvent", async (req, res) => {
  try {
    const { idUtilisateur, idEvent } = req.params;

    const planning = await Planning.findOne({
      where: { idUtilisateur, idEvent }
    });

    if (!planning) {
      return res.status(404).json({ error: "Planning non trouvé" });
    }

    res.status(200).json(planning);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST : Ajouter un planning
router.post("/", async (req, res) => {
  try {
    const { idUtilisateur, idEvent, nom } = req.body;

    if (!idUtilisateur || !idEvent) {
      return res.status(400).json({ error: "idUtilisateur et idEvent sont requis" });
    }

    const planning = await Planning.create({ idUtilisateur, idEvent, nom });
    res.status(201).json(planning);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE : Supprimer un planning par idUtilisateur et idEvent
router.delete("/del/:idUtilisateur/:idEvent", async (req, res) => {
  try {
    const { idUtilisateur, idEvent } = req.params;

    const planning = await Planning.findOne({
      where: { idUtilisateur, idEvent }
    });

    if (!planning) {
      return res.status(404).json({ error: "Planning non trouvé" });
    }

    await planning.destroy();
    res.status(200).json({ message: "Planning supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
