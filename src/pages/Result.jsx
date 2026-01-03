import { useEffect, useState } from "react";
import "../styles/resultPage.css";

const TEAM_COLORS = {
  BUKHARASTEP: "#4169E1",
  MISRAPEX: "#CC7722",
  RAZIFLOW: "#820000",
};

export default function Result() {
  const [category, setCategory] = useState("");
  const [programs, setPrograms] = useState([]);
  const [program, setProgram] = useState("");
  const [result, setResult] = useState(null);

  /* -------- LOAD PUBLISHED PROGRAMS (CATEGORY BASED) -------- */
  const loadPrograms = async (selectedCategory) => {
    const res = await fetch(
      `https://icslifefest.in/api/results/published-programs?category=${selectedCategory}`
    );
    const data = await res.json();
    setPrograms(data);
  };

  /* -------- LOAD RESULT -------- */
  useEffect(() => {
    if (!category || !program) return;

    fetch(
      `https://icslifefest.in/api/results/public?category=${category}&program=${program}`
    )
      .then((res) => res.json())
      .then((data) => setResult(data));
  }, [category, program]);

  const cardStyle = (teamName) => ({
    background: TEAM_COLORS[teamName] || "#333",
  });

  return (
    <section className="result-page">
      <div className="result-header">
        <h1>Results</h1>
      </div>

      <div className="result-selectors">
        {/* CATEGORY SELECT */}
        <select
          onChange={(e) => {
            const selectedCategory = e.target.value;
            setCategory(selectedCategory);
            setProgram("");
            setResult(null);
            setPrograms([]);

            if (selectedCategory) {
              loadPrograms(selectedCategory);
            }
          }}
        >
          <option value="">Select Category</option>
          <option>Sub Junior</option>
          <option>Junior</option>
          <option>Senior</option>
          <option>General</option>
          <option>Group</option>
        </select>

        {/* PROGRAM SELECT – ONLY PUBLISHED RESULTS */}
        {category && programs.length > 0 && (
          <select
            onChange={(e) => {
              setProgram(e.target.value);
              setResult(null);
            }}
          >
            <option value="">Select Program</option>
            {programs.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        )}
      </div>

      {/* NO RESULT MESSAGE */}
      {category && programs.length === 0 && (
        <p style={{ color: "#888", marginTop: "20px" }}>
          No results published for this category yet.
        </p>
      )}

      {/* RESULT CARDS */}
      {result && result.first?.participant && (
        <div className="result-cards">
          {result.first?.participant && (
            <div
              className="result-card"
              style={cardStyle(result.first.participant.team?.name)}
            >
              <span className="prize">First Prize</span>
              <h3>{result.first.participant.name.toUpperCase()}</h3>
              <p>{result.first.participant.team?.name?.toUpperCase()}</p>
            </div>
          )}

          {result.second?.participant && (
            <div
              className="result-card"
              style={cardStyle(result.second.participant.team?.name)}
            >
              <span className="prize">Second Prize</span>
              <h3>{result.second.participant.name.toUpperCase()}</h3>
              <p>{result.first.participant.team?.name?.toUpperCase()}</p>
            </div>
          )}

          {result.third?.participant && (
            <div
              className="result-card"
              style={cardStyle(result.third.participant.team?.name)}
            >
              <span className="prize">Third Prize</span>
              <h3>{result.third.participant.name.toUpperCase()}</h3>
              <p>{result.first.participant.team?.name?.toUpperCase()}</p>
            </div>
          )}

          {result.poster && (
            <a href={result.poster} className="download-btn" download>
              Download E-Poster
            </a>
          )}
        </div>
      )}
    </section>
  );
}
