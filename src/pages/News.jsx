import "../styles/page.css";
import "../styles/news.css";
import "../styles/newsPage.css";
import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard.jsx";

export default function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/news")
      .then((res) => res.json())
      .then((data) => setNews(data));
  }, []);

  return (
    <section className="news-page">
      {/* HEADER */}
      <div className="news-header">
        <h1>News & Updates</h1>
        <p>Latest announcements from Gulzar Fest</p>
      </div>

      {/* NEWS LIST (FROM ADMIN / DB) */}
      <div className="news-grid">
        {news.length === 0 && (
          <p style={{ textAlign: "center", color: "#999" }}>
            No news updates available
          </p>
        )}

        {news.map((item) => (
          <NewsCard key={item._id} data={item} />
        ))}
      </div>
    </section>
  );
}
