// src/pages/facility.jsx
import React, { useEffect, useState } from "react";
import useCsvData from "../hooks/useCsvData";
import Tables from "../components/Tables";
import "./facility.css";

const sections = [
  { key: "home", label: "Home" },
  { key: "processing-records", label: "Processing Records" },
  { key: "waste-received", label: "Waste Received" },
  { key: "reports", label: "Reports" },
];

export default function Facility() {
  const { data: processing, loading: loadingProcessing } =
    useCsvData("processing.csv");
  const { data: waste, loading: loadingWaste } =
    useCsvData("wastecollection.csv");

  const [currentSection, setCurrentSection] = useState(sections[0].key);

  const [processingRows, setProcessingRows] = useState([]);

  useEffect(() => {
    setProcessingRows(processing);
  }, [processing]);

  if (loadingProcessing || loadingWaste) return <p>Loading...</p>;

  // ---------- PROCESSING CRUD ----------
  const handleAddProcessing = () => {
    const processing_id = Date.now().toString();
    const waste_type = window.prompt("Waste Type:") || "";
    const waste_received_kg =
      window.prompt("Waste Received (kg):") || "0";
    const waste_processed_kg =
      window.prompt("Waste Processed (kg):") || "0";
    const compost_generated_kg =
      window.prompt("Compost Generated (kg):") || "0";
    const moisture_level =
      window.prompt("Moisture Level (%):") || "";
    const ph_level = window.prompt("pH Level:") || "";
    const remarks = window.prompt("Remarks (optional):") || "";

    const newRow = {
      processing_id,
      waste_type,
      waste_received_kg,
      waste_processed_kg,
      compost_generated_kg,
      moisture_level,
      ph_level,
      remarks,
    };

    setProcessingRows((prev) => [...prev, newRow]);
  };

  const handleEditProcessing = (row) => {
    const waste_type =
      window.prompt("Waste Type:", row.waste_type || "") ||
      row.waste_type;
    const waste_received_kg =
      window.prompt(
        "Waste Received (kg):",
        row.waste_received_kg || ""
      ) || row.waste_received_kg;
    const waste_processed_kg =
      window.prompt(
        "Waste Processed (kg):",
        row.waste_processed_kg || ""
      ) || row.waste_processed_kg;
    const compost_generated_kg =
      window.prompt(
        "Compost Generated (kg):",
        row.compost_generated_kg || ""
      ) || row.compost_generated_kg;
    const moisture_level =
      window.prompt(
        "Moisture Level (%):",
        row.moisture_level || ""
      ) || row.moisture_level;
    const ph_level =
      window.prompt("pH Level:", row.ph_level || "") || row.ph_level;
    const remarks =
      window.prompt("Remarks:", row.remarks || "") || row.remarks;

    setProcessingRows((prev) =>
      prev.map((r) =>
        r.processing_id === row.processing_id
          ? {
              ...r,
              waste_type,
              waste_received_kg,
              waste_processed_kg,
              compost_generated_kg,
              moisture_level,
              ph_level,
              remarks,
            }
          : r
      )
    );
  };

  const handleDeleteProcessing = (row) => {
    if (!window.confirm(`Delete processing record ${row.processing_id}?`))
      return;
    setProcessingRows((prev) =>
      prev.filter((r) => r.processing_id !== row.processing_id)
    );
  };

  // quick stats
  const totalReceived = processingRows.reduce(
    (s, r) => s + Number(r.waste_received_kg || 0),
    0
  );
  const totalCompost = processingRows.reduce(
    (s, r) => s + Number(r.compost_generated_kg || 0),
    0
  );

  return (
    <div className="facility-page">
      {/* Header Navigation */}
      <header className="facility-header">
        <nav className="facility-nav">
          {sections.map((section) => (
            <button
              key={section.key}
              className={`facility-btn ${
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
      <main className="facility-main">
        {/* HOME */}
        {currentSection === "home" && (
          <section className="facility-home">
            <h2 className="facility-title">Welcome Facility Manager 🏭</h2>
            <p className="facility-subtitle">
              Overview of compost processing & incoming waste today.
            </p>

            <div className="facility-card">
              <h3>Today's Snapshot</h3>
              <ul>
                <li>
                  <strong>Total Waste Received:</strong> {totalReceived} kg
                </li>
                <li>
                  <strong>Total Compost Generated:</strong>{" "}
                  {totalCompost} kg
                </li>
                <li>
                  <strong>Processing Batches:</strong>{" "}
                  {processingRows.length}
                </li>
              </ul>
            </div>

            <div className="facility-card">
              <h3>Recent Processing Batches</h3>
              {processingRows.slice(-5).reverse().map((item) => (
                <div
                  key={item.processing_id}
                  className="facility-item"
                >
                  <strong>Batch #{item.processing_id}</strong>
                  <br />
                  <span>
                    Type: {item.waste_type} <br />
                    Processed: {item.waste_processed_kg} kg | Compost:{" "}
                    {item.compost_generated_kg} kg
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROCESSING RECORDS – CRUD */}
        {currentSection === "processing-records" && (
          <Tables
            title="Processing Records"
            data={processingRows}
            columns={[
              { label: "ID", accessor: "processing_id" },
              { label: "Waste Type", accessor: "waste_type" },
              {
                label: "Waste Received (kg)",
                accessor: "waste_received_kg",
              },
              {
                label: "Waste Processed (kg)",
                accessor: "waste_processed_kg",
              },
              {
                label: "Compost Generated (kg)",
                accessor: "compost_generated_kg",
              },
              { label: "Moisture Level", accessor: "moisture_level" },
              { label: "pH Level", accessor: "ph_level" },
              { label: "Remarks", accessor: "remarks" },
            ]}
            filterOptions={null}
            onAdd={handleAddProcessing}
            onEdit={handleEditProcessing}
            onDelete={handleDeleteProcessing}
          />
        )}

        {/* WASTE RECEIVED – read only */}
        {currentSection === "waste-received" && (
          <Tables
            title="Waste Received"
            data={waste}
            columns={[
              {
                label: "Waste Quantity (kg)",
                accessor: "waste_quantity_kg",
              },
              { label: "Dump Location ID", accessor: "dump_location_id" },
              { label: "Date", accessor: "date" },
            ]}
            filterOptions={null}
            onAdd={null}
            onEdit={null}
            onDelete={null}
          />
        )}

        {/* REPORTS */}
        {currentSection === "reports" && (
          <section>
            <h2 className="facility-title">Reports</h2>
            <p>Custom facility analytics can be added here later.</p>
          </section>
        )}
      </main>
    </div>
  );
}
