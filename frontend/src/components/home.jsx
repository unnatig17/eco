import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
  const [section, setSection] = useState("home");

  return (
    <div className="home-page">

      {/* HEADER */}
      <header className="home-header">
        <nav className="home-nav">

          <button onClick={() => setSection("home")}>Home</button>
          <button onClick={() => setSection("settings")}>Settings</button>
          <button onClick={() => setSection("faq")}>FAQ</button>
          <button onClick={() => setSection("about")}>About</button>
          <button onClick={() => setSection("docs")}>Documentation</button>

          {/* Login styled exactly like others */}
          <Link to="/login" className="login-btn">Login</Link>

        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main className="home-main">

        {section === "home" && (
          <>
            <h1>Welcome to EcoTrack</h1>
            <p>Smart, efficient & sustainable waste management.</p>
          </>
        )}

        {section === "settings" && <h2>Settings Section</h2>}
        {section === "faq" && <h2>FAQ Section</h2>}
        {section === "about" && <h2>About EcoTrack</h2>}
        {section === "docs" && <h2>Documentation</h2>}

      </main>
    </div>
  );
}
