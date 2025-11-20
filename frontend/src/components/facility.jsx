import React, { useState } from 'react';
import useCsvData from "../hooks/useCsvData";
import Tables from "../components/Tables";     // ⭐ IMPORTANT
import "./facility.css";

const sections = [
  { key: 'home', label: 'Home' },
  { key: 'processing-records', label: 'Processing Records' },
  { key: 'waste-received', label: 'Waste Received' },
  { key: 'reports', label: 'Reports' }
];

function Facility() {

  // ⭐ Load correct CSVs
  const { data: processing, loading: loadingProcessing } = useCsvData("processing.csv");
  const { data: waste, loading: loadingWaste } = useCsvData("wastecollection.csv");

  const [currentSection, setCurrentSection] = useState(sections[0].key);

  if (loadingProcessing || loadingWaste) return <p>Loading...</p>;

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

{/* HOME */}
        {currentSection === "home" && (
  <section className="facility-home">

    <h2 className="facility-title">Welcome Facility Manager 🏭</h2>
    <p className="facility-subtitle">
      Here’s a quick overview of compost processing & incoming waste today.
    </p>

    {/* 1. Today’s Processing Summary */}
    <div className="facility-card">
      <h3>Today's Processing Summary</h3>
      <ul>
        <li><strong>Incoming Waste:</strong> 520 kg</li>
        <li><strong>Organic Waste:</strong> 300 kg</li>
        <li><strong>Recyclables:</strong> 180 kg</li>
        <li><strong>Rejected Waste:</strong> 40 kg</li>
      </ul>
    </div>

    {/* 2. Recent Processing Batches */}
    <div className="facility-card">
      <h3>Recent Processing Batches</h3>

      {processing.slice(-5).reverse().map((item) => (
        <div key={item.processing_id} className="facility-item">
          <strong>Batch #{item.processing_id}</strong><br />
          <span>
            Method: {item.processing_method} <br />
            Output: {item.output_kg || "N/A"} kg Compost
          </span>
        </div>
      ))}
    </div>
  </section>
)}

        {/* PROCESSING RECORDS (CRUD ENABLED) */}
        {currentSection === 'processing-records' && (
          <Tables
            title="Processing Records"
            data={processing}
            columns={[
              { label: "Processing ID", accessor: "processing_id" },
              { label: "Waste Classification ID", accessor: "waste_classification_id" },
              { label: "Method", accessor: "processing_method" },
              { label: "Description", accessor: "processing_description" },
              { label: "Cost", accessor: "cost" }
            ]}
            filterOptions={null}
            onAdd={() => console.log("Add new processing record")}   // CRUD enabled
          />
        )}

        {/* WASTE RECEIVED (READ-ONLY) */}
        {currentSection === 'waste-received' && (
          <Tables
            title="Waste Received"
            data={waste}
            columns={[
              { label: "ID", accessor: "waste_collection_id" },
              { label: "Dump Location ID", accessor: "dump_location_id" },
              { label: "Waste Classification ID", accessor: "waste_classification_id" },
              { label: "Date", accessor: "collection_date" },
              { label: "Quantity (kg)", accessor: "quantity_kg" },
              { label: "Notes", accessor: "notes" }
            ]}
            filterOptions={null}
            onAdd={null}          
          />
        )}

        {/* REPORTS */}
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
