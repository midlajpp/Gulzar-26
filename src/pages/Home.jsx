import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/home.css";
import NewsCard from "../components/NewsCard";
import Counter from "../components/Counter";

export default function Home() {
  const [galleryPreview, setGalleryPreview] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        // 🔥 last 4 images only
        const lastFour = data.slice(-4);
        setGalleryPreview(lastFour);
      });
  }, []);

  const [latestNews, setLatestNews] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/news")
      .then((res) => res.json())
      .then((data) => {
        // 🔥 last 3 news only
        const lastThree = data.slice(-3);
        setLatestNews(lastThree);
      });
  }, []);
  return (
    <>
      {/* HERO SECTION */}

      <section className="hero">
        <img src="/hero.png" alt="Gulzar Fest" className="hero-bg" />
        <div className="hero-overlay"></div>

        {/* Text content */}
        <div className="hero-content">
          <h1>GULZAR 2026</h1>
          <div className="hero-line"></div>
          <p>DEFINING THE APEX</p>
        </div>
      </section>

      {/* SECTION 2 – ABOUT FEST */}

      <section className="home-about">
        {/* <h2>About Gulzar</h2> */}

        <p>
          “ Gulzar is the journey before the summit <br /> where effort becomes
          identity and discipline defines success.”
        </p>
      </section>

      <section className="home-stats">
        <div className="stat-card">
          <h3>
            <Counter end={3} />
          </h3>
          <p>Days</p>
        </div>

        <div className="stat-card">
          <h3>
            <Counter end={180} />+
          </h3>
          <p>Participants</p>
        </div>

        <div className="stat-card">
          <h3>
            <Counter end={3} />
          </h3>
          <p>Stages</p>
        </div>

        <div className="stat-card">
          <h3>
            <Counter end={130} />+
          </h3>
          <p>Programs</p>
        </div>
      </section>

      {/* SECTION 3 – NEWS & UPDATES PREVIEW */}

      <section className="home-news">
        <h2>News & Updates</h2>

        <div className="preview-grid home-news-grid">
          {latestNews.map((item) => (
            <div className="home-news-card" key={item._id}>
              <NewsCard data={item} />
            </div>
          ))}
        </div>

        <Link to="/news" className="view-all-btn">
          View All Updates
        </Link>
      </section>

      {/* SECTION 4 – GALLERY PREVIEW */}

      <section className="home-gallery">
        <h2>Gallery</h2>

        <div className="gallery-preview">
          {galleryPreview.map((item) => (
            <div key={item._id} className="gallery-box">
              <img src={item.image} alt="Gulzar Fest" />
              <div className="gallery-overlay">
                <span></span>
              </div>
            </div>
          ))}
        </div>

        <Link to="/gallery" className="view-all-btn">
          View Full Gallery
        </Link>
      </section>
    </>
  );
}
