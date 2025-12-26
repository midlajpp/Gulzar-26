import { useEffect, useState } from "react";
import API from "../../api/axios";
import "../styles/admin.css";
import BackButton from "../components/BackButton";

export default function ManageGallery() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);

  const fetchImages = async () => {
    try {
      const { data } = await API.get("/gallery");
      setImages(data);
    } catch (err) {
      console.error("Fetch gallery error:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const uploadImage = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      await API.post("/gallery", formData);
      setFile(null);
      fetchImages();
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  const deleteImage = async (id) => {
    if (!window.confirm("Delete image?")) return;

    try {
      await API.delete(`/gallery/${id}`);
      setImages((prev) => prev.filter((img) => img._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="admin-page">
      <BackButton />

      <h1>Manage Gallery</h1>

      {/* Upload */}
      <form className="admin-form" onSubmit={uploadImage}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Upload Image</button>
      </form>

      {/* List */}
      <div className="admin-grid">
        {images.map((img) => (
          <div key={img._id} className="admin-thumb">
            <img src={img.image} alt="gallery" />
            <button onClick={() => deleteImage(img._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
