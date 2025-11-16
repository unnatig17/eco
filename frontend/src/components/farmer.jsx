import React, { useState } from 'react';

const sections = [
  { key: 'home', label: 'Home' },
  { key: 'compost-availability', label: 'Compost Availability' },
  { key: 'purchase-history', label: 'Purchase History' },
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

function Farmer() {
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
            <p>Welcome to your farmer dashboard homepage.</p>
          </section>
        )}
        {currentSection === 'compost-availability' && (
          <section>
            <h2 style={{ color: palette.medium }}>Compost Availability</h2>
            <p>Check current compost stock and access purchase options here.</p>
          </section>
        )}
        {currentSection === 'purchase-history' && (
          <section>
            <h2 style={{ color: palette.medium }}>Purchase History</h2>
            <p>Review records of your compost purchases.</p>
          </section>
        )}
        {currentSection === 'awareness' && (
          <section>
            <h2 style={{ color: palette.medium }}>Awareness</h2>
            <p>Explore educational resources and news about composting.</p>
          </section>
        )}
      </main>
    </div>
  );
}

export default Farmer;
