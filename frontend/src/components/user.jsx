import React, { useState } from 'react';
import useCsvData from "../hooks/useCsvData";
import "./user.css";

const sections = [
  { key: 'home', label: 'Home' },
  { key: 'nearby-dumps', label: 'Nearby Dumps' },
  { key: 'map', label: 'Map' },
  { key: 'report-issue', label: 'Report Issue' },
  { key: 'awareness', label: 'Awareness' }
];

function User() {
  const {data, loading} = useCsvData("dumplocation.csv");
  const [currentSection, setCurrentSection] = useState(sections[0].key);

  return (
  <div className="user-page">

    {/* Header Navigation */}
    <header className="user-header">
      <nav className="user-nav">
        {sections.map(section => (
          <button
            key={section.key}
            className={`user-btn ${currentSection === section.key ? "active" : ""}`}
            onClick={() => setCurrentSection(section.key)}
          >
            {section.label}
          </button>
        ))}
      </nav>
    </header>

    {/* Main Content */}
    <main className="user-main">

      {currentSection === 'home' && (
        <section>
          <h2 className="user-title">Home</h2>
          <p>Welcome to the green user dashboard. Add your homepage content here.</p>
        </section>
      )}

      {currentSection === 'nearby-dumps' && (
        <section>
          <h2 className="user-title">Nearby Dumps</h2>
          <p>Show details about nearby dump locations and access information here.</p>
        </section>
      )}

      {currentSection === 'map' && (
        <section>
          <h2 className="user-title">Map</h2>
          <p>Provide interactive maps or directions relevant to waste management.</p>
        </section>
      )}

      {currentSection === 'report-issue' && (
        <section>
          <h2 className="user-title">Report Issue</h2>
          <p>Add forms or information for users to report waste management issues.</p>
        </section>
      )}

      {currentSection === 'awareness' && (
        <section>
          <h2 className="user-title">Awareness</h2>
          <p>Create or link awareness content and educational resources.</p>
        </section>
      )}

    </main>
  </div>
);

}

export default User;
