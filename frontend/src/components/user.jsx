import React, { useState } from 'react';
import useCsvData from "../hooks/useCsvData";

const sections = [
  { key: 'home', label: 'Home' },
  { key: 'nearby-dumps', label: 'Nearby Dumps' },
  { key: 'map', label: 'Map' },
  { key: 'report-issue', label: 'Report Issue' },
  { key: 'awareness', label: 'Awareness' }
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

function User() {
  const {data, loading} = useCsvData("dumplocation.csv");
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
            <p>Welcome to the green user dashboard. Add your homepage content here.</p>
          </section>
        )}
        {currentSection === 'nearby-dumps' && (
          <section>
            <h2 style={{ color: palette.medium }}>Nearby Dumps</h2>
            <p>Show details about nearby dump locations and access information here.</p>
          </section>
        )}
        {currentSection === 'map' && (
          <section>
            <h2 style={{ color: palette.medium }}>Map</h2>
            <p>Provide interactive maps or directions relevant to waste management.</p>
          </section>
        )}
        {currentSection === 'report-issue' && (
          <section>
            <h2 style={{ color: palette.medium }}>Report Issue</h2>
            <p>Add forms or information for users to report waste management issues.</p>
          </section>
        )}
        {currentSection === 'awareness' && (
          <section>
            <h2 style={{ color: palette.medium }}>Awareness</h2>
            <p>Create or link awareness content and educational resources.</p>
          </section>
        )}
      </main>
    </div>
  );
}

export default User;
