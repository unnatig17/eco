import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
  const [section, setSection] = useState("home");

  // Reusable function to render content based on the active section
  const renderSection = () => {
    switch (section) {
      case "home":
        return (
          <>
            <h1>Welcome to EcoTrack</h1>
            <p>Your smart companion for sustainable waste management.</p>

            <div className="home-cards">
              <div className="card">
                <h3>Track Waste</h3>
                <p>View real-time dump locations, collections, and processing updates.</p>
              </div>
              <div className="card">
                <h3>Citizen Support</h3>
                <p>Report issues, raise complaints, and stay informed.</p>
              </div>
              <div className="card">
                <h3>Eco Awareness</h3>
                <p>Learn best practices to reduce, reuse, and recycle.</p>
              </div>
            </div>
          </>
        );

      case "settings":
        return (
          <div className="section-box">
            <h2>Settings</h2>
            <ul>
              <li>🔔 Notification Preferences</li>
              <li>🌗 Theme: Light / Dark</li>
              <li>🌍 Language Selection</li>
            </ul>
          </div>
        );

      case "faq":
        return (
          <div className="section-box">
            <h2>Frequently Asked Questions</h2>

            <p><strong>1. What is EcoTrack?</strong><br />
              A centralized platform to manage city waste efficiently.</p>

            <p><strong>2. Who can use it?</strong><br />
              Citizens, municipal staff, farmers, and facility operators.</p>

            <p><strong>3. What features does it offer?</strong><br />
              Dump locations, waste collection tracking, compost availability, issue reporting, and more.</p>
          </div>
        );

      case "about":
        return (
          <div className="section-box">
            <h2>About EcoTrack</h2>
            <p>
              EcoTrack promotes sustainability and transparency in waste management by
              connecting municipalities, citizens, farmers, and waste facilities.
            </p>
          </div>
        );

      case "docs":
        return (
          <div className="section-box">
            <h2>Documentation</h2>
            <ul>
              <li>📌 Dashboard usage guide</li>
              <li>📌 Role-wise features (Citizen, Municipality, Facility, Farmer)</li>
              <li>📌 CSV-based data architecture</li>
              <li>📌 API endpoints (Laravel backend)</li>
              <li>📌 UI components & forms</li>
            </ul>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="home-page">

      {/* HEADER */}
      <header className="home-header">
        <nav className="home-nav">

          {["home", "settings", "faq", "about", "docs"].map((btn) => (
            <button
              key={btn}
              onClick={() => setSection(btn)}
              className={section === btn ? "active-btn" : ""}
            >
              {btn.charAt(0).toUpperCase() + btn.slice(1)}
            </button>
          ))}

          <Link to="/login" className="login-btn">Login</Link>

        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main className="home-main">{renderSection()}</main>
    </div>
  );
}
