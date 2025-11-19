import React, { useState } from 'react';
import useCsvData from "../hooks/useCsvData";
import "./farmer.css";

const sections = [
  { key: 'home', label: 'Home' },
  { key: 'compost-availability', label: 'Compost Availability' },
  { key: 'purchase-history', label: 'Purchase History' },
  { key: 'awareness', label: 'Awareness' }
];

function Farmer() {
  const {data: sales, loading: loadingd} = useCsvData("sales.csv");
  
  const [currentSection, setCurrentSection] = useState(sections[0].key);
  if(loadingd ) return <p>Loading...</p>;

  return (
  <div className="farmer-page">

    {/* Header Navigation */}
    <header className="farmer-header">
      <nav className="farmer-nav">
        {sections.map(section => (
          <button
            key={section.key}
            className={`nav-btn ${currentSection === section.key ? "active" : ""}`}
            onClick={() => setCurrentSection(section.key)}
          >
            {section.label}
          </button>
        ))}
      </nav>
    </header>

    {/* Main Content */}
    <main className="farmer-main">
      {currentSection === 'home' && (
        <section>
          <h2 className="section-title">Home</h2>
          <p>Welcome to your farmer dashboard homepage.</p>
        </section>
      )}

      {currentSection === 'compost-availability' && (
        <section>
          <h2 className="section-title">Compost Availability</h2>
          <p>Check current compost stock and access purchase options here.</p>
        </section>
      )}

      {currentSection === 'purchase-history' && (
        <section>
          <h2 className="section-title">Purchase History</h2>
          <p>Review records of your compost purchases.</p>
        </section>
      )}

      {currentSection === 'awareness' && (
        <section>
          <h2 className="section-title">Awareness</h2>
          <p>Explore educational resources and news about composting.</p>
        </section>
      )}
    </main>

  </div>
  );
}

export default Farmer;
