import React, { useState } from 'react';
import useCsvData from "../hooks/useCsvData";
import "./collections.css";

const sections = [
  { key: 'home', label: 'Home' },
  { key: 'assigned-dumps', label: 'Assigned Dumps' },
  { key: 'daily-collection', label: 'Daily Collection' },
  { key: 'history', label: 'History' }
];

function Collections() {
  const {data, loading} = useCsvData("dumplocation.csv");
  const [currentSection, setCurrentSection] = useState(sections[0].key);

  return (
  <div className="collections-page">

    {/* Header Navigation */}
    <header className="collections-header">
      <nav className="collections-nav">
        {sections.map(section => (
          <button
            key={section.key}
            className={`collections-btn ${currentSection === section.key ? "active" : ""}`}
            onClick={() => setCurrentSection(section.key)}
          >
            {section.label}
          </button>
        ))}
      </nav>
    </header>

    {/* Main Content */}
    <main className="collections-main">

      {currentSection === 'home' && (
        <section>
          <h2 className="collections-title">Home</h2>
          <p>Welcome to the collections dashboard home.</p>
        </section>
      )}

      {currentSection === 'assigned-dumps' && (
        <section>
          <h2 className="collections-title">Assigned Dumps</h2>
          <p>View dumps assigned for collection here.</p>
        </section>
      )}

      {currentSection === 'daily-collection' && (
        <section>
          <h2 className="collections-title">Daily Collection</h2>
          <p>Manage or see summaries of collections done daily.</p>
        </section>
      )}

      {currentSection === 'history' && (
        <section>
          <h2 className="collections-title">History</h2>
          <p>Review past collection records and history.</p>
        </section>
      )}

    </main>
  </div>
);

}

export default Collections;
