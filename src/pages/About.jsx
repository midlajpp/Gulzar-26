import "../styles/page.css";
import "../styles/about.css";

export default function About() {
  return (
    <section className="about-page">
      {/* Section 1 – Header */}
      <div className="about-header">
        <h1>About Gulzar</h1>
        <p>ICS Academy, Manhappatta</p>
      </div>

      {/* Section 2 – About Fest */}
      <div className="about-section">
        <h2>What is Gulzar?</h2>
        <p>
          <strong>Gulzar</strong> is the annual students fest of
          <strong> ICS Academy, Manhappatta</strong>. It is a vibrant platform
          where students showcase their talents, creativity, and confidence
          through various cultural, academic, and artistic programs.
        </p>

        <p>
          Gulzar 2025 is themed as <strong>“Defining the Apex”</strong>,
          symbolizing excellence, growth, and the pursuit of the highest
          standards in every field.
        </p>
      </div>

      {/* Section 3 – About Institute */}
      <div className="about-section light">
        <h2>About ICS Academy</h2>
        <p>
          ICS Academy, Manhappatta is a premier institution dedicated to
          nurturing knowledge, values, and skills among students. The academy
          provides an inspiring environment that encourages learning,
          innovation, and holistic development.
        </p>
      </div>

      {/* FINAL IMAGE SECTION */}

      {/* BROCHURE DOWNLOAD SECTION */}
      <div className="about-brochure">
        <h2>Fest Brochure</h2>
        <p>
          Download the official brochure of Gulzar 2025 for complete details
          about programs, schedules, and guidelines.
        </p>

        <a
          href="/brochure/gulzar-2025-brochure.pdf"
          download
          className="brochure-btn"
        >
          Download Brochure
        </a>
      </div>
    </section>
  );
}
