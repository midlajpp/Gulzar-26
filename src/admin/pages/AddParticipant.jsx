import { useEffect, useState } from "react";
import API from "../../api/axios";
import BackButton from "../components/BackButton";

import "../styles/admin.css";

export default function AddParticipant() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [teamName, setTeamName] = useState("");
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterTeam, setFilterTeam] = useState("");

  // load participants list
  const loadParticipants = async () => {
    try {
      const { data } = await API.get("/participants/all");
      setParticipants(data);
    } catch (err) {
      console.error("Fetch participants error:", err);
    }
  };

  useEffect(() => {
    loadParticipants();
  }, []);

  const saveParticipant = async () => {
    if (!name || !category || !teamName) {
      alert("All fields required");
      return;
    }

    setLoading(true);

    try {
      if (editId) {
        await API.put(`/participants/${editId}`, { name, category, teamName });
      } else {
        await API.post("/participants/add", { name, category, teamName });
      }

      setName("");
      setCategory("");
      setTeamName("");
      setEditId(null);
      loadParticipants();
    } catch (err) {
      alert(err.response?.data?.message || "Save participant failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="admin-page">
        <BackButton />
        <h1>Add Participant</h1>
        <div className="admin-form">
          <input
            type="text"
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option>Sub Junior</option>
            <option>Junior</option>
            <option>Senior</option>
            <option>General</option>
            <option>Group</option>
          </select>

          <select
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          >
            <option value="">Select Team</option>
            <option value="BUKHARASTEP">BUKHARASTEP</option>
            <option value="MISRAPEX">MISRAPEX</option>
            <option value="RAZIFLOW">RAZIFLOW</option>
          </select>

          <button onClick={saveParticipant} disabled={loading}>
            {loading ? "Saving..." : "Add Participant"}
          </button>

          {/* PARTICIPANT LIST */}
          <h3 style={{ marginTop: "30px" }}>Participants List</h3>
          <br />
          <div className="result-input-row">
            <select onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="">All Categories</option>
              <option>Sub Junior</option>
              <option>Junior</option>
              <option>Senior</option>
            </select>

            <select onChange={(e) => setFilterTeam(e.target.value)}>
              <option value="">All Teams</option>
              <option>BUKHARASTEP</option>
              <option>MISRAPEX</option>
              <option>RAZIFLOW</option>
            </select>
          </div>

          {participants.length === 0 ? (
            <p>No participants added yet.</p>
          ) : (
            <table style={{ width: "100%", marginTop: "10px" }}>
              <thead>
                <tr>
                  <th align="left">Name</th>
                  <th align="left">Category</th>
                  <th align="left">Team</th>
                </tr>
              </thead>
              <tbody>
                {participants
                  .filter(
                    (p) =>
                      !filterCategory || p.category?.includes(filterCategory)
                  )
                  .filter((p) => !filterTeam || p.team.name === filterTeam)
                  .map((p) => (
                    <tr key={p._id}>
                      <td>{p.name}</td>
                      <td>{p.category}</td>
                      <td>{p.team?.name}</td>

                      <td>
                        {/* EDIT BUTTON */}
                        <button
                          onClick={() => {
                            setEditId(p._id);
                            setName(p.name);
                            setCategory(p.category);
                            setTeamName(p.team?.name);
                          }}
                        >
                          Edit
                        </button>

                        {/* DELETE BUTTON */}
                        <button
                          style={{
                            marginLeft: "8px",
                            background: "#c0392b",
                            color: "#fff",
                          }}
                          onClick={async () => {
                            if (!window.confirm("Delete this participant?"))
                              return;

                            try {
                              await API.delete(`/participants/${p._id}`);
                              loadParticipants();
                            } catch (err) {
                              alert(
                                err.response?.data?.message || "Delete failed"
                              );
                            }
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
