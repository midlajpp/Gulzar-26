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
          <a href="https://wa.me/919999999999" target="_blank">
            <i className="fab fa-whatsapp"></i>
          </a>
          <a href="https://youtube.com" target="_blank">
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
