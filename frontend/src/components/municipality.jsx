// src/pages/municipality.jsx
import React, { useEffect, useState } from "react";
import useCsvData from "../hooks/useCsvData";
import "./municipality.css";
import Tables from "../components/Tables";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

const sections = [
  { key: "dump-locations", label: "Dump Locations" },
  { key: "waste-collection", label: "Waste Collection" },
  { key: "map", label: "Map" },
  { key: "reports", label: "Reports" },
  { key: "issues", label: "Reported Issues" },   // <-- ADD THIS
];

export default function Municipality() {
  const { data: dumpData, loading: loadingDump } =
    useCsvData("dumplocation.csv");
  const { data: wasteData, loading: loadingWaste } =
    useCsvData("wastecollection.csv");
  const { data: processingData, loading: loadingProcessing } =
    useCsvData("processing.csv");
  const { data: issuesData, loading: loadingIssues } =
    useCsvData("issues.csv");


  const [currentSection, setCurrentSection] = useState(sections[0].key);
  const [issueRows, setIssueRows] = useState([]);

  const [dumpRows, setDumpRows] = useState([]);
  const [wasteRows, setWasteRows] = useState([]);

  useEffect(() => {
    setDumpRows(dumpData);
  }, [dumpData]);

  useEffect(() => {
    setWasteRows(wasteData);
  }, [wasteData]);

  useEffect(() => {
    setIssueRows(issuesData);
  }, [issuesData]);

  if (loadingDump || loadingWaste || loadingProcessing || loadingIssues) {
    return <p>Loading...</p>;
  }


  // ---------- DUMP LOCATIONS CRUD ----------
  const handleAddDump = () => {
    const dump_location_id =
      window.prompt("Dump Location ID:") || Date.now().toString();
    const location_name =
      window.prompt("Location Name:") || "New Dump Location";
    const address = window.prompt("Address:") || "";
    const latitude = window.prompt("Latitude:") || "";
    const longitude = window.prompt("Longitude:") || "";
    const area_id = window.prompt("Area ID (optional):") || "";

    const newRow = {
      dump_location_id,
      location_name,
      address,
      latitude,
      longitude,
      area_id,
    };
    setDumpRows((prev) => [...prev, newRow]);
  };

  const handleEditDump = (row) => {
    const dump_location_id =
      window.prompt("Dump Location ID:", row.dump_location_id) ||
      row.dump_location_id;
    const location_name =
      window.prompt("Location Name:", row.location_name) ||
      row.location_name;
    const address =
      window.prompt("Address:", row.address || "") || row.address;
    const latitude =
      window.prompt("Latitude:", row.latitude || "") || row.latitude;
    const longitude =
      window.prompt("Longitude:", row.longitude || "") || row.longitude;
    const area_id =
      window.prompt("Area ID:", row.area_id || "") || row.area_id;

    setDumpRows((prev) =>
      prev.map((r) =>
        r.dump_location_id === row.dump_location_id
          ? {
              ...r,
              dump_location_id,
              location_name,
              address,
              latitude,
              longitude,
              area_id,
            }
          : r
      )
    );
  };

  const handleDeleteDump = (row) => {
    if (
      !window.confirm(
        `Delete dump location "${row.location_name}" (${row.dump_location_id})?`
      )
    )
      return;
    setDumpRows((prev) =>
      prev.filter((r) => r.dump_location_id !== row.dump_location_id)
    );
  };

  // ---------- WASTE COLLECTION CRUD ----------
  const handleAddWaste = () => {
    const collection_id =
      window.prompt("Collection ID:") || Date.now().toString();
    const date = window.prompt("Date (YYYY-MM-DD):") || "";
    const dump_location_id = window.prompt("Dump Location ID:") || "";
    const truck_id = window.prompt("Truck ID:") || "";
    const waste_collector = window.prompt("Waste Collector:") || "";
    const waste_quantity_kg =
      window.prompt("Waste Quantity (kg):") || "0";
    const remarks = window.prompt("Remarks (optional):") || "";

    const newRow = {
      collection_id,
      date,
      dump_location_id,
      truck_id,
      waste_collector,
      waste_quantity_kg,
      remarks,
    };

    setWasteRows((prev) => [...prev, newRow]);
  };

  const handleEditWaste = (row) => {
    const collection_id =
      window.prompt("Collection ID:", row.collection_id) ||
      row.collection_id;
    const date = window.prompt("Date (YYYY-MM-DD):", row.date) || row.date;
    const dump_location_id =
      window.prompt("Dump Location ID:", row.dump_location_id) ||
      row.dump_location_id;
    const truck_id =
      window.prompt("Truck ID:", row.truck_id || "") || row.truck_id;
    const waste_collector =
      window.prompt("Waste Collector:", row.waste_collector || "") ||
      row.waste_collector;
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
          ? {
              ...r,
              collection_id,
              date,
              dump_location_id,
              truck_id,
              waste_collector,
              waste_quantity_kg,
              remarks,
            }
          : r
      )
    );
  };

  const handleDeleteWaste = (row) => {
    if (!window.confirm(`Delete collection ${row.collection_id}?`)) return;
    setWasteRows((prev) =>
      prev.filter((r) => r.collection_id !== row.collection_id)
    );
  };

  

  // ---------- MAP ----------
  const defaultCenter =
    dumpRows.length > 0
      ? {
          lat: Number(dumpRows[0].latitude) || 30.345,
          lng: Number(dumpRows[0].longitude) || 78.029,
        }
      : { lat: 30.345, lng: 78.029 };

  // ---------- REPORTS (simple summary) ----------
  const totalWasteKg = wasteRows.reduce(
    (sum, r) => sum + Number(r.waste_quantity_kg || 0),
    0
  );
  const totalCollections = wasteRows.length;
  const totalCompostKg = processingData.reduce(
    (sum, r) => sum + Number(r.compost_generated_kg || 0),
    0
  );

  // ---------- ISSUES CRUD ----------
const handleAddIssue = () => {
  const issue_id = window.prompt("Issue ID:") || Date.now().toString();
  const user_id = window.prompt("User ID:") || "";
  const dump_location_id = window.prompt("Dump Location ID:") || "";
  const description = window.prompt("Description:") || "";
  const status = window.prompt("Status (pending/resolved):") || "pending";
  const date = window.prompt("Date (YYYY-MM-DD):") || "";

  const newRow = {
    issue_id,
    user_id,
    dump_location_id,
    description,
    status,
    date,
  };

  setIssueRows((prev) => [...prev, newRow]);
};

const handleEditIssue = (row) => {
  const issue_id = window.prompt("Issue ID:", row.issue_id) || row.issue_id;
  const user_id = window.prompt("User ID:", row.user_id) || row.user_id;
  const dump_location_id =
    window.prompt("Dump Location ID:", row.dump_location_id) ||
    row.dump_location_id;
  const description =
    window.prompt("Description:", row.description) || row.description;
  const status =
    window.prompt("Status:", row.status) || row.status;
  const date = window.prompt("Date:", row.date) || row.date;

  setIssueRows((prev) =>
    prev.map((r) =>
      r.issue_id === row.issue_id
        ? {
            issue_id,
            user_id,
            dump_location_id,
            description,
            status,
            date,
          }
        : r
    )
  );
};

const handleDeleteIssue = (row) => {
  if (!window.confirm(`Delete issue ${row.issue_id}?`)) return;
  setIssueRows((prev) => prev.filter((r) => r.issue_id !== row.issue_id));
};


  return (
    <div className="muni-page">
      {/* Top Navigation */}
      <header className="muni-nav">
        {sections.map((section) => (
          <button
            key={section.key}
            className={`muni-btn ${
              currentSection === section.key ? "active" : ""
            }`}
            onClick={() => setCurrentSection(section.key)}
          >
            {section.label}
          </button>
        ))}
      </header>

      <main className="muni-main">
        {/* DUMP LOCATIONS CRUD */}
        {currentSection === "dump-locations" && (
          <Tables
            title="Dump Locations"
            data={dumpRows}
            columns={[
              { label: "ID", accessor: "dump_location_id" },
              { label: "Name", accessor: "location_name" },
              { label: "Address", accessor: "address" },
              { label: "Latitude", accessor: "latitude" },
              { label: "Longitude", accessor: "longitude" },
              { label: "Area ID", accessor: "area_id" },
            ]}
            filterOptions={null}
            onAdd={handleAddDump}
            onEdit={handleEditDump}
            onDelete={handleDeleteDump}
          />
        )}

        {/* WASTE COLLECTION CRUD */}
        {currentSection === "waste-collection" && (
  <Tables
    title="Waste Collection"
    data={wasteRows}
    columns={[
      { label: "ID", accessor: "waste_collection_id" },
      { label: "Notes", accessor: "notes" },
      { label: "Quantity (kg)", accessor: "quantity_kg" },
      { label: "Date", accessor: "collection_date" },
      { label: "Dump ID", accessor: "dump_location_id" },
    ]}
    filterOptions={null}
    onAdd={handleAddWaste}
    onEdit={handleEditWaste}
    onDelete={handleDeleteWaste}
  />
)}


        {/* MAP */}
        {currentSection === "map" && (
          <div className="muni-card">
            <h2 className="muni-card-title">Dump Locations Map</h2>
            <APIProvider apiKey="AIzaSyCgRe6EhS4nAqM0LKQFHUiG2w9d1p-cQ7A">
              <Map
                id="municipality-map"
                defaultCenter={defaultCenter}
                defaultZoom={11}
                className="map-container"
              >
                {dumpRows.map((d) => {
                  const lat = Number(d.latitude);
                  const lng = Number(d.longitude);
                  if (Number.isNaN(lat) || Number.isNaN(lng)) return null;
                  return (
                    <Marker
                      key={d.dump_location_id}
                      position={{ lat, lng }}
                      title={d.location_name}
                    />
                  );
                })}
              </Map>
            </APIProvider>
          </div>
        )}

        {/* REPORTS */}
        {currentSection === "reports" && (
          <div className="muni-card">
            <h2 className="muni-card-title">Reports</h2>
            <div className="reports-grid">
              <div className="report-card">
                <h3>Total Waste Collected</h3>
                <p>{totalWasteKg} kg</p>
                <small>{totalCollections} collection records</small>
              </div>
              <div className="report-card">
                <h3>Total Compost Generated</h3>
                <p>{totalCompostKg} kg</p>
                <small>From processing.csv</small>
              </div>
            </div>
            <p>More detailed analytics can be added later.</p>
          </div>
        )}

        {/* REPORTED ISSUES */}
{currentSection === "issues" && (
  <Tables
    title="Reported Issues"
    data={issueRows}
    columns={[
      { label: "Issue ID", accessor: "issue_id" },
      { label: "User ID", accessor: "user_id" },
      { label: "Dump ID", accessor: "dump_location_id" },
      { label: "Description", accessor: "description" },
      { label: "Status", accessor: "status" },
      { label: "Date", accessor: "date" },
    ]}
    filterOptions={null}
    onAdd={handleAddIssue}
    onEdit={handleEditIssue}
    onDelete={handleDeleteIssue}
  />
)}

      </main>
    </div>
  );
}
