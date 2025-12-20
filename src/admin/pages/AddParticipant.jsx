import { useEffect, useState } from "react";
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
    const res = await fetch("http://localhost:5000/api/participants/all");
    const data = await res.json();
    setParticipants(data);
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

    const url = editId
      ? `http://localhost:5000/api/participants/${editId}`
      : "http://localhost:5000/api/participants/add";

    const method = editId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, category, teamName }),
    });

    setName("");
    setCategory("");
    setTeamName("");
    setEditId(null);
    setLoading(false);

    loadParticipants();
  };

  return (
    <>
      <div className="admin-page">
        <BackButton />
        <div className="admin-form">
          <h1>Add Participant</h1>

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
                    (p) => !filterCategory || p.category === filterCategory
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

                            await fetch(
                              `http://localhost:5000/api/participants/${p._id}`,
                              { method: "DELETE" }
                            );

                            loadParticipants();
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
