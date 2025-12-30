import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Brand */}
        <div className="footer-brand">
          <h3>GULZAR 2025</h3>
          <p>ICS Academy, Manhappatta</p>
        </div>

        {/* Links */}
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/news">News</a>
          <a href="/gallery">Gallery</a>
          <a href="/result">Result</a>
        </div>

        {/* Social Media */}
        <div className="footer-social">
          <a href="https://www.instagram.com/zain_ics_academy_" target="_blank">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://facebook.com" target="_blank">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://whatsapp.com/channel/0029Vb64Q617j6g9lhsRUD0d"
            target="_blank"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
          <a
            href="https://youtube.com/@zainstudentsassembly?si=l34h3iKImE2MmFjn"
            target="_blank"
          >
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>

      <div className="footer-copy">
        <p>© 2025 Gulzar Fest. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
