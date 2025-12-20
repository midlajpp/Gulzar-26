import express from "express";
import Participant from "../models/Participant.js";
import Result from "../models/Result.js";
import upload from "../config/multer.js";

const router = express.Router();

/* ----------------------------------
   GET PARTICIPANTS (CATEGORY-BASED)
-----------------------------------*/
router.get("/participants", async (req, res) => {
  const { categories: category } = req.query;

  const participants = await Participant.find({ categories: category });
  res.json(participants);
});

/* ----------------------------------
   SAVE / UPDATE RESULT
-----------------------------------*/
router.post("/save", upload.single("poster"), async (req, res) => {
  try {
    const { category, program, first, second, third } = req.body;
    const posterUrl = req.file ? req.file.path : "";

    let result = await Result.findOne({ category, program });

    const data = {
      category,
      program,
      first: { participant: first },
      second: { participant: second },
      third: { participant: third },
    };

    if (posterUrl) data.poster = posterUrl;

    if (result) {
      await Result.updateOne({ category, program }, data);
    } else {
      await Result.create(data);
    }

    res.json({ message: "Result saved successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ----------------------------------
   GET RESULT (PUBLIC)
-----------------------------------*/
router.get("/public", async (req, res) => {
  try {
    const { category, program } = req.query;

    const result = await Result.findOne({ category, program })
      .populate("first.participant")
      .populate("second.participant")
      .populate("third.participant");

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ----------------------------------
   GET ALL RESULTS (ADMIN)
-----------------------------------*/
router.get("/all", async (req, res) => {
  try {
    const results = await Result.find()
      .populate("first.participant")
      .populate("second.participant")
      .populate("third.participant")
      .sort({ createdAt: -1 });

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/* ----------------------------------
   DELETE RESULT (ADMIN)
-----------------------------------*/
router.delete("/:id", async (req, res) => {
  try {
    await Result.findByIdAndDelete(req.params.id);
    res.json({ message: "Result deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/* ----------------------------------
   GET PUBLISHED PROGRAMS (PUBLIC)
   category base
-----------------------------------*/
router.get("/published-programs", async (req, res) => {
  try {
    const { category } = req.query;

    const results = await Result.find({ category }).select("program");

    const programs = [...new Set(results.map((r) => r.program))];

    res.json(programs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
