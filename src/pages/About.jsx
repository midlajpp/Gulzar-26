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
          Gulzar, the arts fest of
          <i> ICS Academy, Manhappatta</i>, is a platform for showcasing the
          diverse talents of our students. <br /> We believe that by
          participating in these creative programs, students build the character
          and confidence necessary for a successful future. This year, Gulzar
          ’26 centers on the theme <i> "Defining the Apex," </i> a concept that
          highlights the vital role of hard work, perseverance, and patience in
          reaching the apex of any achievement. Through a series of intellectual
          discussions and artistic competitions, Gulzar ’26 aims to share a
          global message that true greatness is earned through dedication. By
          bridging the intellectual journey of Islamic history with the demands
          of the modern world, the fest serves as a journey to define what it
          truly means to reach the top.
        </p>

        <p></p>
      </div>

      {/* Section 3 – About Institute */}
      <div className="about-section light">
        <h2>About ICS Academy</h2>
        <p>
          <i>ICS Academy</i>, located at{" "}
          <i>Manhappatta, Manjeri, Malappuram, Kerala,</i>
          stands as a platform for holistic education. More than just an
          educational institution, it is a center for cultural and intellectual
          transformation. Founded with the vision of nurturing a generation that
          is both professionally competent and morally upright, the Academy has
          grown into a vast educational ecosystem.We believe that true education
          bridges the gap between the temporal and the spiritual. Our campus
          features a diverse range of institutions, such as the ICS English
          Medium School, ICS Dawa College, and spiritual centers including the
          Masjid and Madrassa. This integrated approach allows thousands of
          students to pursue modern academic excellence while staying deeply
          rooted in Islamic values. With a legacy of excellence, our alumni are
          currently serving in various professional sectors across the globe.
        </p>
      </div>

      {/* FINAL IMAGE SECTION */}

      {/* BROCHURE DOWNLOAD SECTION */}
      <div className="about-brochure">
        <h2>Fest Brochure</h2>
        <p>
          Download the official brochure of Gulzar 2026 for complete details
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
