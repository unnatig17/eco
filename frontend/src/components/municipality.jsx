import React, { useState } from 'react';
import useCsvData from "../hooks/useCsvData";
import "./municipality.css";
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
const position = { lat: 30.345, lng: 78.029 };

const sections = [
  { key: 'dump-locations', label: 'Dump Locations' },
  { key: 'waste-collection', label: 'Waste Collection' },
  { key: 'map', label: 'Map' },
  { key: 'reports', label: 'Reports' }
];

function Municipality() {
  const {data: dump, loading: loadingd} = useCsvData("dumplocation.csv");
  const {data: waste, loading: loadingw} = useCsvData("wastecollection.csv");
  
  const [currentSection, setCurrentSection] = useState(sections[0].key);
  
  if(loadingd || loadingw) return <p>Loading...</p>;
  
  return (
  <div className="muni-page">

    {/* Header */}
    <header className="muni-header">
      <nav className="muni-nav">
        {sections.map(section => (
          <button
            key={section.key}
            className={`muni-btn ${currentSection === section.key ? "active" : ""}`}
            onClick={() => setCurrentSection(section.key)}
          >
            {section.label}
          </button>
        ))}
      </nav>
    </header>

    {/* Main Content */}
    <main className="muni-main">

      {currentSection === 'dump-locations' && (
        <section>
          <h2 className="muni-title">Dump Locations</h2>

          <ul>
            {dump.slice(0, 15).map((item, idx) => (
              <li key={idx}>
                {item.dump_location_id} - {item.location_name}: {item.address}
              </li>
            ))}
          </ul>

        </section>
      )}

      {currentSection === 'waste-collection' && (
        <section>
          <h2 className="muni-title">Waste Collection</h2>

          <ul>
            {waste.map((item, idx) => (
              <li key={idx}>
                {item.waste_collection_id} - {item.notes} - {item.quantity_kg}
              </li>
            ))}
          </ul>
        </section>
      )}

      {currentSection === 'map' && (
        <section>
          <h2 className="muni-title">Map</h2>
          <p>Include a map or mapping features relevant to your project.</p>

          <APIProvider googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <Map
              id="municipality-map"
              defaultCenter={position}
              defaultZoom={10}
              className="map-container"
            >
              <AdvancedMarker position={position} title={'My Marker'} />
            </Map>
          </APIProvider>
        </section>
      )}

      {currentSection === 'reports' && (
        <section>
          <h2 className="muni-title">Reports</h2>
          <p>Display reports, analytics, or summaries here.</p>
        </section>
      )}

    </main>

  </div>
);
}

export default Municipality;
