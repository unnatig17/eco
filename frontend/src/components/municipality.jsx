import React, { useState } from 'react';
import { useEffect } from "react";
import useCsvData from "../hooks/useCsvData";
import "./municipality.css";
import Tables from "../components/Tables";
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { getAreas, createArea, updateArea, deleteArea } from "../services/areaService";

const position = { lat: 30.345, lng: 78.029 };
              
const sections = [
  { key: 'dump-locations', label: 'Dump Locations' },
  { key: 'waste-collection', label: 'Waste Collection' },
  { key: 'map', label: 'Map' },
  { key: 'reports', label: 'Reports' },
  { key: 'issues', label: 'Reported Issues' }   
];

function Municipality() {

  // hooks to load CSV data
  const { data: dump, loading: loadingd } = useCsvData("dumplocation.csv");
  const { data: waste, loading: loadingw } = useCsvData("wastecollection.csv");
  const { data: issues } = useCsvData("issues.csv");
  const [areas, setAreas] = useState([]);

  const [currentSection, setCurrentSection] = useState(sections[0].key);

   const load = () => {
      getAreas().then(res => setAreas(res.data));
    };
  

  const handleDelete = (id) => {
      deleteArea(id).then(load);
    };

  // DUMP TABLE STATE
  const [dumpFilter, setDumpFilter] = useState("all");
  const [dumpSearch, setDumpSearch] = useState("");
  const [dumpEntries, setDumpEntries] = useState(10);
  const [dumpPage, setDumpPage] = useState(1);

  // WASTE TABLE STATE
  const [wasteFilter, setWasteFilter] = useState("all");
  const [wasteSearch, setWasteSearch] = useState("");
  const [wasteEntries, setWasteEntries] = useState(10);
  const [wastePage, setWastePage] = useState(1);

  if (loadingd || loadingw) return <p>Loading...</p>;

  /* DUMP DATA */
  const filteredDump = dump
    .filter(item => dumpFilter === "all" ? true : item.area_id == dumpFilter)
    .filter(item => {
      const q = dumpSearch.toLowerCase();
      return (
        !dumpSearch.trim() ||
        String(item.location_name || "").toLowerCase().includes(q) ||
        String(item.address || "").toLowerCase().includes(q) ||
        String(item.area_id || "").toLowerCase().includes(q)
      );
    });

  const dumpTotalPages = Math.max(1, Math.ceil(filteredDump.length / dumpEntries));
  const dumpStartIndex = (dumpPage - 1) * dumpEntries;
  const dumpPageData = filteredDump.slice(dumpStartIndex, dumpStartIndex + dumpEntries);

  /* WASTE DATA */
  const filteredWaste = waste
    .filter(item => wasteFilter === "all" ? true : item.dump_location_id == wasteFilter)
    .filter(item => {
      const q = wasteSearch.toLowerCase();
      return (
        !wasteSearch.trim() ||
        String(item.notes || "").toLowerCase().includes(q) ||
        String(item.dump_location_id || "").toLowerCase().includes(q)
      );
    });

  const wasteTotalPages = Math.max(1, Math.ceil(filteredWaste.length / wasteEntries));
  const wasteStartIndex = (wastePage - 1) * wasteEntries;
  const wastePageData = filteredWaste.slice(wasteStartIndex, wasteStartIndex + wasteEntries);

  return (
    <div className="muni-page">

      {/* Top Navigation */}
      <header className="muni-nav">
        {sections.map(section => (
          <button
            key={section.key}
            className={`muni-btn ${currentSection === section.key ? "active" : ""}`}
            onClick={() => setCurrentSection(section.key)}
          >
            {section.label}
          </button>
        ))}
      </header>

      <main className="muni-main">

        {/* DUMP LOCATIONS */}
        {currentSection === 'dump-locations' && (
          <Tables
            title="Dump Locations"
            data={dump}
            columns={[
              { label: "ID", accessor: "dump_location_id" },
              { label: "Name", accessor: "location_name" },
              { label: "Address", accessor: "address" },
              { label: "Latitude", accessor: "latitude" },
              { label: "Longitude", accessor: "longitude" },
              { label: "Area", accessor: "area_id" }
            ]}
            filterLabel="Area"
            filterOptions={[...new Set(dump.map(d => d.area_id))].map(a => ({
              label: `Area ${a}`,
              value: a
            }))}
          />
        )}

        {/* WASTE COLLECTION */}
        {currentSection === 'waste-collection' && (
          <Tables
            title="Waste Collection"
            data={waste}
            columns={[
              { label: "ID", accessor: "waste_collection_id" },
              { label: "Notes", accessor: "notes" },
              { label: "Quantity (kg)", accessor: "quantity_kg" },
              { label: "Date", accessor: "collection_date" },
              { label: "Dump ID", accessor: "dump_location_id" }
            ]}
            filterLabel="Dump Location"
            filterOptions={[...new Set(waste.map(w => w.dump_location_id))].map(id => ({
              label: `Dump ${id}`,
              value: id
            }))}
          />
        )}

        {/* MAP */}
        {currentSection === 'map' && (
          <div className="muni-card">
            <h2 className="muni-card-title">Map</h2>

            <APIProvider apiKey="<api-key>">
              <Map
                id="municipality-map"
                defaultCenter={position}
                defaultZoom={10}
                className="map-container"
              >
                <Marker position={position} title={'My Marker'} />
              </Map>
            </APIProvider>
          </div>
        )}

        {/* REPORTS */}
        {currentSection === 'reports' && (
          <div className="muni-card">
            <h2 className="muni-card-title">Reports</h2>
            <p>Analytics coming soon...</p>
          </div>
        )}

        {/* REPORTED ISSUES */}
        {currentSection === "issues" && (
          <Tables
            title="Reported Issues"
            data={issues}
            columns={[
              { label: "Issue ID", accessor: "id" },
              { label: "Issue", accessor: "issue_text" },
              { label: "Date", accessor: "date" }
            ]}
          />
        )}

      </main>
    </div>
  );
}

export default Municipality;
