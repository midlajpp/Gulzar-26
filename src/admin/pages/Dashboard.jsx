import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin/login");
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card" onClick={() => navigate("/admin/news")}>
          <h3>Manage News</h3>
          <p>Add, edit or delete news & updates</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/gallery")}
        >
          <h3>Manage Gallery</h3>
          <p>Upload and remove gallery images</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/results")}
        >
          <h3>Manage Results</h3>
          <p>Add programs, results & e-posters</p>
        </div>
        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/add-participant")}
        >
          <h3>Add Participant</h3>
          <p>Add, edit or delete participants</p>
        </div>
      </div>
    </div>
  );
}
