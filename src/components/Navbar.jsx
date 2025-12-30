import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-inner">
        {/* Logo */}
        <div className="nav-logo">
          <img src="/gulzar.svg" alt="Gulzar Logo" />
        </div>

        {/* Hamburger */}
        <div className="nav-hamburger" onClick={() => setOpen(!open)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Desktop Menu */}
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/news">News</Link>
          </li>
          <li>
            <Link to="/gallery">Gallery</Link>
          </li>
          <li>
            <Link to="/result">Result</Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link to="/about" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link to="/news" onClick={() => setOpen(false)}>
            News
          </Link>
          <Link to="/gallery" onClick={() => setOpen(false)}>
            Gallery
          </Link>
          <Link to="/result" onClick={() => setOpen(false)}>
            Result
          </Link>
        </div>
      )}
    </nav>
  );
}
