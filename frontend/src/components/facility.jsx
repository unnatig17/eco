import React, { useState } from 'react';

const sections = [
  { key: 'home', label: 'Home' },
  { key: 'processing-records', label: 'Processing Records' },
  { key: 'waste-received', label: 'Waste Received' },
  { key: 'reports', label: 'Reports' }
];

// Green color palette
const palette = {
  dark: '#14532d',
  medium: '#22c55e',
  light: '#bbf7d0',
  accent: '#4ade80',
  navActive: '#166534',
  navInactive: '#bbf7d0'
};

function Facility() {
  const [currentSection, setCurrentSection] = useState(sections[0].key);

  return (
    <div style={{ backgroundColor: palette.light, minHeight: '100vh', fontFamily: 'Roboto, Arial, sans-serif' }}>
      {/* Header Navigation */}
      <header style={{
        backgroundColor: palette.dark,
        padding: '16px 0',
        color: 'white'
      }}>
        <nav style={{ display: 'flex', justifyContent: 'center', gap: '32px' }}>
          {sections.map(section => (
            <button
              key={section.key}
              style={{
                backgroundColor: currentSection === section.key ? palette.navActive : palette.navInactive,
                border: 'none',
                borderRadius: '8px',
                color: palette.dark,
                padding: '12px 24px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
              onClick={() => setCurrentSection(section.key)}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main style={{ padding: '32px', maxWidth: '900px', margin: '24px auto', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 2px 16px rgba(34,197,94,0.12)' }}>
        {currentSection === 'home' && (
          <section>
            <h2 style={{ color: palette.medium }}>Home</h2>
            <p>Welcome to the facility dashboard home page.</p>
          </section>
        )}
        {currentSection === 'processing-records' && (
          <section>
            <h2 style={{ color: palette.medium }}>Processing Records</h2>
            <p>View and manage all processing batch records here.</p>
          </section>
        )}
        {currentSection === 'waste-received' && (
          <section>
            <h2 style={{ color: palette.medium }}>Waste Received</h2>
            <p>Details about incoming waste received by the facility.</p>
          </section>
        )}
        {currentSection === 'reports' && (
          <section>
            <h2 style={{ color: palette.medium }}>Reports</h2>
            <p>Generate and review reports on facility operations.</p>
          </section>
        )}
      </main>
    </div>
  );
}

export default Facility;
