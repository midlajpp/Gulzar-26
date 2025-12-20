import express from "express";
import Gallery from "../models/Gallery.js";
import upload from "../config/multer.js";

const router = express.Router();

// GET all gallery images (latest first)
router.get("/", async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST add gallery image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const imageUrl = req.file ? req.file.path : "";

    const gallery = new Gallery({
      image: imageUrl,
    });

    await gallery.save();
    res.json({ message: "Gallery image added" });
  } catch (error) {
    console.error("ADD GALLERY ERROR:", error);
    res.status(500).json({ message: "Gallery add failed" });
  }
});

// DELETE gallery image
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Gallery.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("DELETE GALLERY ERROR:", error);
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;
