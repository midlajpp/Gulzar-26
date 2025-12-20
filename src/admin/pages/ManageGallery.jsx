import { useEffect, useState } from "react";
import "../styles/admin.css";
import BackButton from "../components/BackButton";

export default function ManageGallery() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);

  const fetchImages = async () => {
    const res = await fetch("http://localhost:5000/api/gallery");
    const data = await res.json();
    setImages(data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const uploadImage = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://localhost:5000/api/gallery", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setFile(null);

      // 🔥 force fresh fetch from DB
      const fresh = await fetch("http://localhost:5000/api/gallery");
      const data = await fresh.json();
      setImages(data);
    } else {
      alert("Upload failed");
    }
  };

  const deleteImage = async (id) => {
    if (!window.confirm("Delete image?")) return;

    await fetch(`http://localhost:5000/api/gallery/${id}`, {
      method: "DELETE",
    });

    setImages((prev) => prev.filter((img) => img._id !== id));
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
