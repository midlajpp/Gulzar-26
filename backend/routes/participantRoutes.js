import express from "express";
import Participant from "../models/Participant.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* -------------------------------
   ADD PARTICIPANT (ADMIN)
--------------------------------*/
router.post("/add", protect, async (req, res) => {
  try {
    const { name, category, teamName } = req.body;

    if (!name || !category || !teamName) {
      return res.status(400).json({ message: "All fields required" });
    }

    const participant = await Participant.create({
      name,
      category,
      team: { name: teamName },
    });

    res.json({ message: "Participant added", participant });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/all", protect, async (req, res) => {
  try {
    const participants = await Participant.find().sort({ createdAt: -1 });
    res.json(participants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/* -------------------------------
   DELETE PARTICIPANT
--------------------------------*/
router.delete("/:id", protect, async (req, res) => {
  try {
    await Participant.findByIdAndDelete(req.params.id);
    res.json({ message: "Participant deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/* -------------------------------
   UPDATE PARTICIPANT
--------------------------------*/
router.put("/:id", protect, async (req, res) => {
  try {
    const { name, category, teamName } = req.body;

    await Participant.findByIdAndUpdate(req.params.id, {
      name,
      category,
      team: { name: teamName },
    });

    res.json({ message: "Participant updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
