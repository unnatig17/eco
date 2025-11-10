import React, { useState } from 'react';

const sections = [
  { key: 'dump-locations', label: 'Dump Locations' },
  { key: 'waste-collection', label: 'Waste Collection' },
  { key: 'map', label: 'Map' },
  { key: 'reports', label: 'Reports' }
];

// Green palette colors
const palette = {
  dark: '#14532d',
  medium: '#22c55e',
  light: '#bbf7d0',
  accent: '#4ade80',
  navActive: '#166534',
  navInactive: '#bbf7d0'
};

function Municipality() {
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
        {currentSection === 'dump-locations' && (
          <section>
            <h2 style={{ color: palette.medium }}>Dump Locations</h2>
            <p>List your dump locations and related info here.</p>
          </section>
        )}
        {currentSection === 'waste-collection' && (
          <section>
            <h2 style={{ color: palette.medium }}>Waste Collection</h2>
            <p>Schedule, status, or process details about waste collection.</p>
          </section>
        )}
        {currentSection === 'map' && (
          <section>
            <h2 style={{ color: palette.medium }}>Map</h2>
            <p>Include a map or mapping features relevant to your project.</p>
          </section>
        )}
        {currentSection === 'reports' && (
          <section>
            <h2 style={{ color: palette.medium }}>Reports</h2>
            <p>Display reports, analytics, or summaries here.</p>
          </section>
        )}
      </main>
    </div>
  );
}

export default Municipality;
