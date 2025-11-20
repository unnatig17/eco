import React, { useState } from 'react';
import useCsvData from "../hooks/useCsvData";
import Tables from "../components/Tables";
import "./collections.css";

const sections = [
  { key: 'assigned-dumps', label: 'Assigned Dumps' },
  { key: 'daily-collection', label: 'Daily Collection' },
  { key: 'history', label: 'History' }
];

function Collections() {

  // Fetch required CSVs
  const { data: dumplocations, loading: loadDump } = useCsvData("dumplocation.csv");
  const { data: waste, loading: loadWaste } = useCsvData("wastecollection.csv");

  const [currentSection, setCurrentSection] = useState(sections[0].key);

  if (loadDump || loadWaste) return <p>Loading...</p>;

  return (
    <div className="collections-page">

      {/* Header */}
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

      {/* Main */}
      <main className="collections-main">

        {/* ASSIGNED DUMPS (READ ONLY) */}
        {currentSection === 'assigned-dumps' && (
          <Tables
            title="Assigned Dumps"
            data={dumplocations}
            columns={[
              { label: "Dump ID", accessor: "dump_location_id" },
              { label: "Location Name", accessor: "location_name" },
              { label: "Address", accessor: "address" },
              { label: "Latitude", accessor: "latitude" },
              { label: "Longitude", accessor: "longitude" },
              { label: "Area ID", accessor: "area_id" }
            ]}
            filterOptions={null}
            onAdd={null} 
          />
        )}

        {/* DAILY COLLECTION (CRUD allowed) */}
        {currentSection === 'daily-collection' && (
          <Tables
            title="Daily Collection"
            data={waste}
            columns={[
              { label: "Collection ID", accessor: "waste_collection_id" },
              { label: "Dump Location ID", accessor: "dump_location_id" },
              { label: "Classification ID", accessor: "waste_classification_id" },
              { label: "Date", accessor: "collection_date" },
              { label: "Quantity (kg)", accessor: "quantity_kg" },
              { label: "Notes", accessor: "notes" }
            ]}
            filterOptions={null}
            onAdd={() => console.log("Add new daily collection")} 
          />
        )}

        {/* HISTORY (READ ONLY) */}
        {currentSection === 'history' && (
          <Tables
            title="Collection History"
            data={waste}
            columns={[
              { label: "Collection ID", accessor: "waste_collection_id" },
              { label: "Dump Location ID", accessor: "dump_location_id" },
              { label: "Classification ID", accessor: "waste_classification_id" },
              { label: "Date", accessor: "collection_date" },
              { label: "Quantity (kg)", accessor: "quantity_kg" },
              { label: "Notes", accessor: "notes" }
            ]}
            filterOptions={null}
            onAdd={null} 
          />
        )}

      </main>
    </div>
  );
}

export default Collections;
