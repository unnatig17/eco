import React, { useState } from 'react';
import useCsvData from "../hooks/useCsvData";
import Tables from "../components/Tables";  
import "./farmer.css";
import Awareness from "../components/awareness.jsx"; 

const sections = [
  { key: 'compost-availability', label: 'Compost Availability' },
  { key: 'purchase-history', label: 'Purchase History' },
  { key: 'awareness', label: 'Awareness' }
];

function Farmer() {
  const { data: processing, loading: loadingProcessing } = useCsvData("processing.csv");
  const { data: sales, loading: loadingSales } = useCsvData("sales.csv");

  const [currentSection, setCurrentSection] = useState(sections[0].key);

  if (loadingProcessing || loadingSales) return <p>Loading...</p>;

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

        {/* COMPOST AVAILABILITY (processing.csv) */}
        {currentSection === 'compost-availability' && (
  <Tables
    title="Compost Availability"
    data={processing}
    columns={[
      { label: "Processing ID", accessor: "processing_id" },
      { label: "Waste Classification ID", accessor: "waste_classification_id" },
      { label: "Method", accessor: "processing_method" },
      { label: "Description", accessor: "processing_description" },
      { label: "Cost", accessor: "cost" }
    ]}
    filterOptions={null}
    onAdd={null}
  />
)}


        {/* PURCHASE HISTORY (sales.csv) */}
        {currentSection === 'purchase-history' && (
  <Tables
    title="Purchase History"
    data={sales}
    columns={[
      { label: "Sale ID", accessor: "sale_id" },
      { label: "Processing ID", accessor: "processing_id" },
      { label: "Date", accessor: "sale_date" },
      { label: "Quantity (kg)", accessor: "quantity_kg" },
      { label: "Price", accessor: "price" },
      { label: "Notes", accessor: "notes" }
    ]}
    filterOptions={null}
    onAdd={null}
  />
)}


        {/* AWARENESS */}
          {currentSection === 'awareness' && <Awareness />}

      </main>
    </div>
  );
}

export default Farmer;
