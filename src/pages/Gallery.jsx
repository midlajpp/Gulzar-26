import { useEffect, useState } from "react";

import "../styles/galleryPage.css";

export default function Gallery() {
  const handleDownload = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();

    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = blobUrl;
    a.download = "gulzar-gallery.jpg";
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(blobUrl);
  };

  const [images, setImages] = useState([]);

  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    fetch("https://icslifefest.in/api/gallery")
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, []);

  return (
    <section className="gallery-page">
      {/* Header */}
      <div className="gallery-header">
        <h1>Gallery</h1>
        <p>Moments from Gulzar Fest</p>
      </div>
      {/* Grid */}
      <div className="gallery-grid">
        {images.map((item) => (
          <div key={item._id} className="gallery-item">
            <img src={item.image} alt="Gulzar Fest" />

            {/* Hover overlay with download */}

            <div className="gallery-overlay">
              <button
                className="hover-download"
                title="Download image"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload(item.image);
                }}
              >
                DOWNLOAD
              </button>
            </div>

            {/* Click image → modal */}
            <div
              className="gallery-click"
              onClick={() => setSelectedImg(item.image)}
            ></div>
          </div>
        ))}
      </div>
    </section>
  );
}
