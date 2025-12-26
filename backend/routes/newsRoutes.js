import express from "express";
import News from "../models/News.js";
import upload from "../config/multer.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all news (oldest first)
router.get("/", async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: 1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST add news with image
router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageUrl = req.file ? req.file.path : "";

    const news = new News({
      title,
      description,
      image: imageUrl,
    });

    await news.save();
    res.json({ message: "News added with image" });
  } catch (error) {
    console.error("ADD NEWS ERROR:", error);
    res.status(500).json({ message: "News add failed" });
  }
});

// DELETE news (Admin)
router.delete("/:id", protect, async (req, res) => {
  try {
    const deleted = await News.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "News not found" });
    }

    res.json({ message: "News deleted successfully" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;
