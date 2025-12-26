import { useEffect, useState } from "react";
import API from "../../api/axios";
import "../styles/admin.css";
import BackButton from "../components/BackButton";

const CATEGORY_PROGRAMS = {
  "Sub Junior": [
    "ELOCUTION-MAL",
    "ELOCUTION-ENG",
    "MADH SONG",
    "MAPPILA PATTU",
    "READING ENG",
    "NEWS READING-MAL",
    "QUIZ",
    "MATHS TRICK",
    "ESSAY-MAL",
    "ESSAY-ENG",
    "STORY WRITING MAL",
    "STORY WRITING ENG",
    "VERSIFICATION-MAL",
    "TRANSLATION ENG-MAL",
    "BOOK TEST",
    "PENCIL DRAWING",
    "WATER COLOUR",
    "TENSE CONVERSION",
    "REPORT MAKING",
    "CALLIGRAPHY",
    "PRACTICAL USAGE ENG",
    "CAPTION WRITING",
    "SOCIAL TWEET",
  ],
  Junior: [
    "QUIRATH",
    "ELOCUTION-MAL",
    "ELOCUTION-ENG",
    "MADH SONG",
    "READING-ENG",
    "THADREES",
    "QUIZ",
    "ESSAY-MAL",
    "ESSAY-ENG",
    "PENCIL DRAWING",
    "ESSAY-ARA",
    "STORY WRITING-MAL",
    "STORY WRITING-ENG",
    "VERSIFICATION-MAL",
    "VERSIFICATION-ENG",
    "CAPTION WRITING",
    "TRANSLATION ENG-MAL",
    "BOOK TEST",
    "TENSE CONVERSION",
    "REPORT MAKING",
    "FEATURE WRITING",
    "SOCIAL TWEET",
    "HAIKU KAVITHA",
    "CALLIGRAPHY",
    "PRACTICAL USAGE ENG",
    "SLOGEN WRITING",
    "SUBTITLE & TRANSLATION",
  ],
  Senior: [
    "QUIRATH",
    "HIFZ",
    "QUIZ",
    "ELOCUTION-MAL",
    "ELOCUTION-ENG",
    "QUTHUBA COMPETITION",
    "QURAN PRABASHANAM",
    "THADREES",
    "ESSAY-MAL",
    "ESSAY-ENG",
    "ESSAY-ARA",
    "STORY WRITING-MAL",
    "STORY WRITING-ENG",
    "VERSIFICATION-MAL",
    "VERSIFICATION-ENG",
    "CAPTION WRITING",
    "TRANSLATION ENG-MAL",
    "BOOK TEST",
    "TENSE CONVERSION",
    "REPORT MAKING",
    "FEATURE WRITING",
    "SOCIAL TWEET",
    "HAIKU KAVITHA",
    "CALLIGRAPHY",
    "PRACTICAL USAGE ENG",
    "SLOGEN WRITING",
    "SUBTITLE & TRANSLATION",
    "DIGITAL ILLUSTRATION",
  ],
  General: [
    "MAPPILAPPATTU KHISSA",
    "INSTANT TALK",
    "MATHRBHASHA",
    "NEWS READING-ARB",
    "INTERVIEW-ENG",
    "PPT PRESENTATION",
    "DEVOTIONAL SONG",
    "NASWEEHA",
    "KAVITHA ASWADANAM",
    "LINGUISTIC DARS",
    "HAMD URDU",
    "POSTER DESIGNING",
    "MAPPILAPPATTU WRITING",
    "MADH SONG WRITING",
    "SIXTH SENSE",
    "LETTER DAWA",
    "E-POSTER",
    "PHOTOGRAPHY",
    "BLURB WRITING",
    "SURVEY TOOL",
    "CHUMAREZHUTHU",
    "SOCIAL STORY",
    "REEL MAKING",
  ],
  Group: [
    "GROUP SONG CATEGORY A",
    "GROUP SONG CATEGORY B",
    "MALAPPATTU",
    "QAWALI",
    "DIALOGUE-ENG",
    "DIALOGUE-ARB",
    "PRESS MEET",
    "HUBBUL HABEEB",
    "JURIS TALK",
    "REVOLUTIONARY SONG",
    "LIVE PODCAST",
    "PICTURE MAGAZINE",
    "STORY MAKING",
    "LANGUAGE GAME",
    "SPOT MAGAZINE - SUB-JUNIOR",
    "SPOT MAGAZINE - JUNIOR",
    "SPOT MAGAZINE - SENIOR",
    "COLLAGE",
  ],
};

export default function ManageResults() {
  const [category, setCategory] = useState("");
  const [program, setProgram] = useState("");
  const [participants, setParticipants] = useState([]);

  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");
  const [poster, setPoster] = useState(null);

  const [results, setResults] = useState([]);
  const [editResultId, setEditResultId] = useState(null);

  /* -------- LOAD PARTICIPANTS -------- */
  useEffect(() => {
    if (!category) return;
    API.get(`/results/participants?category=${category}`)
      .then((res) => setParticipants(res.data))
      .catch((err) => console.error("Fetch participants error:", err));
  }, [category]);

  /* -------- LOAD ALL RESULTS -------- */
  const loadResults = async () => {
    try {
      const { data } = await API.get("/results/all");
      setResults(data);
    } catch (err) {
      console.error("Fetch results error:", err);
    }
  };

  useEffect(() => {
    loadResults();
  }, []);

  /* -------- SAVE / UPDATE RESULT -------- */
  const saveResult = async () => {
    const formData = new FormData();
    formData.append("category", category);
    formData.append("program", program);
    formData.append("first", first);
    formData.append("second", second);
    formData.append("third", third);
    if (poster) formData.append("poster", poster);

    try {
      await API.post("/results/save", formData);
      setEditResultId(null);
      loadResults();
      alert("Result saved");
    } catch (err) {
      alert(err.response?.data?.message || "Save result failed");
    }
  };

  /* -------- DELETE RESULT (FIXED & WORKING) -------- */
  const deleteResult = async (id) => {
    if (!window.confirm("Delete this result?")) return;

    try {
      await API.delete(`/results/${id}`);
      loadResults();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="admin-page">
      <BackButton />

      {/* ================= FORM ================= */}
      <div className="admin-form">
        <h2>{editResultId ? "✏️ Edit Result" : "Manage Results"}</h2>

        <select
          value={category}
          disabled={editResultId}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {Object.keys(CATEGORY_PROGRAMS).map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        {category && (
          <select
            value={program}
            disabled={editResultId}
            onChange={(e) => setProgram(e.target.value)}
          >
            <option value="">Select Program</option>
            {(CATEGORY_PROGRAMS[category] || []).map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        )}

        {program && (
          <>
            <select value={first} onChange={(e) => setFirst(e.target.value)}>
              <option value="">1st Place</option>
              {participants.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name} ({p.team.name})
                </option>
              ))}
            </select>

            <select value={second} onChange={(e) => setSecond(e.target.value)}>
              <option value="">2nd Place</option>
              {participants
                .filter((p) => p._id !== first)
                .map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name} ({p.team.name})
                  </option>
                ))}
            </select>

            <select value={third} onChange={(e) => setThird(e.target.value)}>
              <option value="">3rd Place</option>
              {participants
                .filter((p) => p._id !== first && p._id !== second)
                .map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name} ({p.team.name})
                  </option>
                ))}
            </select>

            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => setPoster(e.target.files[0])}
            />

            <button type="button" onClick={saveResult} disabled={!first}>
              {editResultId ? "Update Result" : "Save Result"}
            </button>
          </>
        )}
      </div>

      {/* ================= RESULT LIST ================= */}
      <div className="admin-list">
        <h3>Saved Results</h3>

        {results.length === 0 ? (
          <p className="placeholder">No results added yet.</p>
        ) : (
          results.map((r) => (
            <div key={r._id} className="admin-list-item">
              <div>
                <h3>
                  {r.category} – {r.program}
                </h3>
                <p>
                  🥇 {r.first?.participant?.name || "-"} <br />
                  🥈 {r.second?.participant?.name || "-"} <br />
                  🥉 {r.third?.participant?.name || "-"}
                </p>
              </div>

              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                {/* EDIT BUTTON – STYLE PRESERVED */}
                <button
                  type="button"
                  onClick={() => {
                    setEditResultId(r._id);
                    setCategory(r.category);
                    setProgram(r.program);
                    setFirst(r.first?.participant?._id || "");
                    setSecond(r.second?.participant?._id || "");
                    setThird(r.third?.participant?._id || "");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  disabled={editResultId === r._id}
                  style={{
                    background: editResultId === r._id ? "#4CAF50" : "#ffb347",
                    color: "#000",
                    borderRadius: "20px",
                    padding: "6px 14px",
                    border: "none",
                    cursor: editResultId === r._id ? "default" : "pointer",
                    fontWeight: "bold",
                  }}
                >
                  {editResultId === r._id ? "Editing…" : "Edit"}
                </button>

                {/* DELETE BUTTON – NOW WORKING */}
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => deleteResult(r._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
