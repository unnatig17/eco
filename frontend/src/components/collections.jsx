// src/pages/collections.jsx
import React, { useEffect, useState } from "react";
import useCsvData from "../hooks/useCsvData";
import Tables from "../components/Tables";
import "./collections.css";

const sections = [
  { key: "assigned-dumps", label: "Assigned Dumps" },
  { key: "daily-collection", label: "Daily Collection" },
  { key: "history", label: "History" },
];

export default function Collections() {
  const { data: dumplocations, loading: loadDump } =
    useCsvData("dumplocation.csv");
  const { data: waste, loading: loadWaste } =
    useCsvData("wastecollection.csv");

  const [currentSection, setCurrentSection] = useState(sections[0].key);
  const [wasteRows, setWasteRows] = useState([]);

  useEffect(() => {
    setWasteRows(waste);
  }, [waste]);

  if (loadDump || loadWaste) return <p>Loading...</p>;

  // DAILY COLLECTION – create + limited update, NO delete
  const handleAddCollection = () => {
    const collection_id = Date.now().toString();
    const date = window.prompt("Date (YYYY-MM-DD):") || "";
    const dump_location_id = window.prompt("Dump Location ID:") || "";
    const truck_id = window.prompt("Truck ID:") || "";
    const waste_quantity_kg =
      window.prompt("Waste Quantity (kg):") || "0";
    const remarks = window.prompt("Remarks (optional):") || "";

    const newRow = {
      collection_id,
      date,
      dump_location_id,
      truck_id,
      waste_quantity_kg,
      remarks,
    };

    setWasteRows((prev) => [...prev, newRow]);
  };

  // limited update: only quantity + remarks
  const handleEditCollection = (row) => {
    const waste_quantity_kg =
      window.prompt(
        "Waste Quantity (kg):",
        row.waste_quantity_kg || ""
      ) || row.waste_quantity_kg;
    const remarks =
      window.prompt("Remarks:", row.remarks || "") || row.remarks;

    setWasteRows((prev) =>
      prev.map((r) =>
        r.collection_id === row.collection_id
          ? { ...r, waste_quantity_kg, remarks }
          : r
      )
    );
  };

  return (
    <div className="collections-page">
      {/* Header */}
      <header className="collections-header">
        <nav className="collections-nav">
          {sections.map((section) => (
            <button
              key={section.key}
              className={`collections-btn ${
                currentSection === section.key ? "active" : ""
              }`}
              onClick={() => setCurrentSection(section.key)}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Main */}
      <main className="collections-main">
        {/* ASSIGNED DUMPS – read only */}
        {currentSection === "assigned-dumps" && (
          <Tables
            title="Assigned Dumps"
            data={dumplocations}
            columns={[
              { label: "Dump ID", accessor: "dump_location_id" },
              { label: "Location Name", accessor: "location_name" },
              { label: "Address", accessor: "address" },
              { label: "Latitude", accessor: "latitude" },
              { label: "Longitude", accessor: "longitude" },
              { label: "Area ID", accessor: "area_id" },
            ]}
            filterOptions={null}
            onAdd={null}
            onEdit={null}
            onDelete={null}
          />
        )}

        {/* DAILY COLLECTION – create + limited update */}
        {currentSection === "daily-collection" && (
          <Tables
            title="Daily Collection"
            data={wasteRows}
            columns={[
              { label: "Collection ID", accessor: "collection_id" },
              { label: "Date", accessor: "date" },
              { label: "Dump Location ID", accessor: "dump_location_id" },
              { label: "Truck ID", accessor: "truck_id" },
              {
                label: "Waste Quantity (kg)",
                accessor: "waste_quantity_kg",
              },
              { label: "Remarks", accessor: "remarks" },
            ]}
            filterOptions={null}
            onAdd={handleAddCollection}
            onEdit={handleEditCollection}
            // ❌ no delete for collection team
            onDelete={null}
          />
        )}

        {/* HISTORY – read only, same data */}
        {currentSection === "history" && (
          <Tables
            title="Collection History"
            data={wasteRows}
            columns={[
              { label: "Collection ID", accessor: "collection_id" },
              { label: "Date", accessor: "date" },
              { label: "Dump Location ID", accessor: "dump_location_id" },
              { label: "Truck ID", accessor: "truck_id" },
              {
                label: "Waste Quantity (kg)",
                accessor: "waste_quantity_kg",
              },
              { label: "Remarks", accessor: "remarks" },
            ]}
            filterOptions={null}
            onAdd={null}
            onEdit={null}
            onDelete={null}
          />
        )}
      </main>
    </div>
  );
}
