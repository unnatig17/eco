// src/pages/farmer.jsx
import React, { useState } from "react";
import useCsvData from "../hooks/useCsvData";
import Tables from "../components/Tables";
import "./farmer.css";
import Awareness from "../components/awareness.jsx";

const sections = [
  { key: "compost-availability", label: "Availability" },
  { key: "purchase-history", label: "Purchase History" },
  { key: "awareness", label: "Awareness" },
];

export default function Farmer() {
  const { data: processing, loading: loadingProcessing } =
    useCsvData("processing.csv");
  const { data: sales, loading: loadingSales } =
    useCsvData("sales.csv");
  const [currentSection, setCurrentSection] = useState(sections[0].key);

  if (loadingProcessing || loadingSales) return <p>Loading...</p>;

  return (
    <div className="farmer-page">
      {/* Header Navigation */}
      <header className="farmer-header">
        <nav className="farmer-nav">
          {sections.map((section) => (
            <button
              key={section.key}
              className={`nav-btn ${
                currentSection === section.key ? "active" : ""
              }`}
              onClick={() => setCurrentSection(section.key)}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main className="farmer-main">
        {/* COMPOST AVAILABILITY – read only */}
        {currentSection === "compost-availability" && (
          <Tables
            title="Compost Availability"
            data={processing}
            columns={[
              { label: "Waste Type", accessor: "waste_type" },
              {
                label: "Waste Processed (kg)",
                accessor: "waste_processed_kg",
              },
              {
                label: "Compost Generated (kg)",
                accessor: "compost_generated_kg",
              },
              { label: "Processing Date", accessor: "processing_date" },
            ]}
            filterOptions={null}
            onAdd={null}
            onEdit={null}
            onDelete={null}
          />
        )}

        {/* PURCHASE HISTORY – read only */}
        {currentSection === "purchase-history" && (
          <Tables
            title="Purchase History"
            data={sales}
            columns={[
              {
                label: "Compost Quantity (kg)",
                accessor: "compost_quantity_kg",
              },
              { label: "Amount Paid", accessor: "amount_paid" },
              { label: "Payment Method", accessor: "payment_method" },
              { label: "Date", accessor: "date" },
            ]}
            filterOptions={null}
            onAdd={null}
            onEdit={null}
            onDelete={null}
          />
        )}

        {/* AWARENESS */}
        {currentSection === "awareness" && <Awareness />}
      </main>
    </div>
  );
}
