import React, { useState } from 'react';
import useCsvData from "../hooks/useCsvData";
import "./facility.css";

const sections = [
  { key: 'home', label: 'Home' },
  { key: 'processing-records', label: 'Processing Records' },
  { key: 'waste-received', label: 'Waste Received' },
  { key: 'reports', label: 'Reports' }
];

function Facility() {
  const {data , loading: loadingd} = useCsvData("farmer.csv");
  
  const [currentSection, setCurrentSection] = useState(sections[0].key);
  if(loadingd) return <p>Loading...</p>;
  
  return (
  <div className="facility-page">

    {/* Header Navigation */}
    <header className="facility-header">
      <nav className="facility-nav">
        {sections.map(section => (
          <button
            key={section.key}
            className={`facility-btn ${currentSection === section.key ? "active" : ""}`}
            onClick={() => setCurrentSection(section.key)}
          >
            {section.label}
          </button>
        ))}
      </nav>
    </header>

    {/* Main Content */}
    <main className="facility-main">

      {currentSection === 'home' && (
        <section>
          <h2 className="facility-title">Home</h2>
          <p>Welcome to the facility dashboard home page.</p>
        </section>
      )}

      {currentSection === 'processing-records' && (
        <section>
          <h2 className="facility-title">Processing Records</h2>
          <p>View and manage all processing batch records here.</p>
        </section>
      )}

      {currentSection === 'waste-received' && (
        <section>
          <h2 className="facility-title">Waste Received</h2>
          <p>Details about incoming waste received by the facility.</p>
        </section>
      )}

      {currentSection === 'reports' && (
        <section>
          <h2 className="facility-title">Reports</h2>
          <p>Generate and review reports on facility operations.</p>
        </section>
      )}

    </main>

  </div>
);
}

export default Facility;
