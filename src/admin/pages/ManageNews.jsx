import { useEffect, useState } from "react";
import "../styles/admin.css";
import BackButton from "../components/BackButton";

export default function ManageNews() {
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch all news
  const fetchNews = async () => {
    const res = await fetch("http://localhost:5000/api/news");
    const data = await res.json();
    setNews(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // 🔹 Add news
  const addNews = async (e) => {
    e.preventDefault();
    if (!title || !desc) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", desc);
    if (image) formData.append("image", image);

    await fetch("http://localhost:5000/api/news", {
      method: "POST",
      body: formData,
    });
    setTitle("");
    setDesc("");
    setImage(null);
    fetchNews(); // refresh list
  };

  // 🔹 Delete news
  const deleteNews = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    const res = await fetch(`http://localhost:5000/api/news/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      // 🔥 DB delete success → now update UI
      setNews((prev) => prev.filter((n) => n._id !== id));
    } else {
      alert("Delete failed");
    }
  };

  return (
    <div className="admin-page">
      <BackButton />

      <h1>Manage News</h1>

      {/* ADD FORM */}
      <form className="admin-form" onSubmit={addNews}>
        <input
          type="text"
          placeholder="News Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="News Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit">Add News</button>
      </form>

      {/* LIST */}
      <div className="admin-list">
        {loading && <p className="placeholder">Loading news...</p>}

        {!loading && news.length === 0 && (
          <p className="placeholder">No news added yet</p>
        )}

        {news.map((item) => (
          <div key={item._id} className="admin-list-item">
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>

            <button className="delete-btn" onClick={() => deleteNews(item._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
