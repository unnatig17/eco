import React, { useState } from 'react';
import { useEffect } from "react";
import useCsvData from "../hooks/useCsvData";
import "./municipality.css";
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { getAreas, createArea, updateArea, deleteArea } from "../services/areaService";
import onDelete from '../components/Area/AreaList';
const position = { lat: 30.345, lng: 78.029 };

const sections = [
  { key: 'dump-locations', label: 'Dump Locations' },
  { key: 'waste-collection', label: 'Waste Collection' },
  { key: 'map', label: 'Map' },
  { key: 'reports', label: 'Reports' }
];

function Municipality() {
  const { data: dump, loading: loadingd } = useCsvData("dumplocation.csv");
  const { data: waste, loading: loadingw } = useCsvData("wastecollection.csv");

  const [areas, setAreas] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [currentSection, setCurrentSection] = useState(sections[0].key);

   const load = () => {
      getAreas().then(res => setAreas(res.data));
    };
  
    // useEffect(() => {
    //   load();
    // }, []);

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

  /* --------- DUMP DATA DERIVED ---------- */
  const filteredDump = dump
    .filter(item => dumpFilter === "all" ? true : item.area_id == dumpFilter)
    .filter(item => {
      if (!dumpSearch.trim()) return true;
      const q = dumpSearch.toLowerCase();
      return (
        String(item.location_name || "").toLowerCase().includes(q) ||
        String(item.address || "").toLowerCase().includes(q) ||
        String(item.area_id || "").toLowerCase().includes(q)
      );
    });

  const dumpTotalPages = Math.max(1, Math.ceil(filteredDump.length / dumpEntries));
  const dumpCurrentPage = Math.min(dumpPage, dumpTotalPages);
  const dumpStartIndex = (dumpCurrentPage - 1) * dumpEntries;
  const dumpEndIndex = dumpStartIndex + dumpEntries;
  const dumpPageData = filteredDump.slice(dumpStartIndex, dumpEndIndex);

  /* --------- WASTE DATA DERIVED ---------- */
  const filteredWaste = waste
    .filter(item => wasteFilter === "all" ? true : item.dump_location_id == wasteFilter)
    .filter(item => {
      if (!wasteSearch.trim()) return true;
      const q = wasteSearch.toLowerCase();
      return (
        String(item.notes || "").toLowerCase().includes(q) ||
        String(item.dump_location_id || "").toLowerCase().includes(q)
      );
    });

  const wasteTotalPages = Math.max(1, Math.ceil(filteredWaste.length / wasteEntries));
  const wasteCurrentPage = Math.min(wastePage, wasteTotalPages);
  const wasteStartIndex = (wasteCurrentPage - 1) * wasteEntries;
  const wasteEndIndex = wasteStartIndex + wasteEntries;
  const wastePageData = filteredWaste.slice(wasteStartIndex, wasteEndIndex);

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

        {/* ---------------- DUMP LOCATIONS ---------------- */}
        {currentSection === 'dump-locations' && (
          <div className="muni-card">

            <div className="muni-card-header">
              <h2 className="muni-card-title">Dump Locations</h2>

              <div className="header-actions">
                <select
                  className="filter-select"
                  value={dumpFilter}
                  onChange={(e) => {
                    setDumpFilter(e.target.value);
                    setDumpPage(1);
                  }}
                >
                  <option value="all">All Areas</option>
                  {[...new Set(dump.map(item => item.area_id))].map(area => (
                    <option key={area} value={area}>Area {area}</option>
                  ))}
                </select>

                <button className="add-btn" onClick={() => {
        window.location.href = '/areas';
      }}>+ Add</button>
              </div>
            </div>

            {/* Top controls (Show entries & Search) */}
            <div className="table-controls">
              <div className="show-entries">
                <span>Show</span>
                <select
                  value={dumpEntries}
                  onChange={(e) => {
                    setDumpEntries(Number(e.target.value));
                    setDumpPage(1);
                  }}
                >
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={45}>45</option>
                  <option value={60}>60</option>
                </select>
                <span>entries</span>
              </div>

              <div className="search-box">
                <span>Search:</span>
                <input
                  className="search-input"
                  type="text"
                  value={dumpSearch}
                  onChange={(e) => {
                    setDumpSearch(e.target.value);
                    setDumpPage(1);
                  }}
                  placeholder="Search locations..."
                />
              </div>
            </div>

            <table className="muni-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th>Area</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {dumpPageData.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.dump_location_id}</td>
                    <td>{item.location_name}</td>
                    <td>{item.address}</td>
                    <td>{item.latitude}</td>
                    <td>{item.longitude}</td>
                    <td>{item.area_id}</td>
                    <td className="actions-col">
                      <button className="edit-btn" onClick={()=>{}}>Edit</button>
                      <button className="delete-btn" onClick={handleDelete}>Delete</button>
                    </td>
                  </tr>
                ))}

                {dumpPageData.length === 0 && (
                  <tr>
                    <td colSpan="7" className="no-data">No entries found</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Bottom pagination */}
            <div className="table-footer">
              <div className="entries-info">
                {filteredDump.length === 0
                  ? "Showing 0 entries"
                  : `Showing ${dumpStartIndex + 1} to ${Math.min(dumpEndIndex, filteredDump.length)} of ${filteredDump.length} entries`}
              </div>

              <div className="pagination">
                <button
                  className="page-btn"
                  disabled={dumpCurrentPage === 1}
                  onClick={() => setDumpPage(prev => Math.max(1, prev - 1))}
                >
                  Previous
                </button>

                {Array.from({ length: dumpTotalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    className={`page-btn ${page === dumpCurrentPage ? "active" : ""}`}
                    onClick={() => setDumpPage(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  className="page-btn"
                  disabled={dumpCurrentPage === dumpTotalPages}
                  onClick={() => setDumpPage(prev => Math.min(dumpTotalPages, prev + 1))}
                >
                  Next
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ---------------- WASTE COLLECTION ---------------- */}
        {currentSection === 'waste-collection' && (
          <div className="muni-card">

            <div className="muni-card-header">
              <h2 className="muni-card-title">Waste Collection</h2>

              <div className="header-actions">
                <select
                  className="filter-select"
                  value={wasteFilter}
                  onChange={(e) => {
                    setWasteFilter(e.target.value);
                    setWastePage(1);
                  }}
                >
                  <option value="all">All Dumps</option>
                  {[...new Set(waste.map(item => item.dump_location_id))].map(loc => (
                    <option key={loc} value={loc}>Dump ID {loc}</option>
                  ))}
                </select>

                <button className="add-btn">+ Add</button>
              </div>
            </div>

            <div className="table-controls">
              <div className="show-entries">
                <span>Show</span>
                <select
                  value={wasteEntries}
                  onChange={(e) => {
                    setWasteEntries(Number(e.target.value));
                    setWastePage(1);
                  }}
                >
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={45}>45</option>
                  <option value={60}>60</option>
                </select>
                <span>entries</span>
              </div>

              <div className="search-box">
                <span>Search:</span>
                <input
                  className="search-input"
                  type="text"
                  value={wasteSearch}
                  onChange={(e) => {
                    setWasteSearch(e.target.value);
                    setWastePage(1);
                  }}
                  placeholder="Search notes / dump ID..."
                />
              </div>
            </div>

            <table className="muni-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Notes</th>
                  <th>Qty (kg)</th>
                  <th>Date</th>
                  <th>Dump Location</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {wastePageData.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.waste_collection_id}</td>
                    <td>{item.notes}</td>
                    <td>{item.quantity_kg}</td>
                    <td>{item.collection_date}</td>
                    <td>{item.dump_location_id}</td>
                    <td className="actions-col">
                      <button className="edit-btn">Edit</button>
                      <button className="delete-btn" onClick={() => onDelete(item.idx)}>Delete</button>
                    </td>
                  </tr>
                ))}

                {wastePageData.length === 0 && (
                  <tr>
                    <td colSpan="6" className="no-data">No entries found</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="table-footer">
              <div className="entries-info">
                {filteredWaste.length === 0
                  ? "Showing 0 entries"
                  : `Showing ${wasteStartIndex + 1} to ${Math.min(wasteEndIndex, filteredWaste.length)} of ${filteredWaste.length} entries`}
              </div>

              <div className="pagination">
                <button
                  className="page-btn"
                  disabled={wasteCurrentPage === 1}
                  onClick={() => setWastePage(prev => Math.max(1, prev - 1))}
                >
                  Previous
                </button>

                {Array.from({ length: wasteTotalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    className={`page-btn ${page === wasteCurrentPage ? "active" : ""}`}
                    onClick={() => setWastePage(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  className="page-btn"
                  disabled={wasteCurrentPage === wasteTotalPages}
                  onClick={() => setWastePage(prev => Math.min(wasteTotalPages, prev + 1))}
                >
                  Next
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ---------------- MAP ---------------- */}
        {currentSection === 'map' && (
          <div className="muni-card">
            <h2 className="muni-card-title">Map</h2>

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
          </div>
        )}

        {/* ---------------- REPORTS ---------------- */}
        {currentSection === 'reports' && (
          <div className="muni-card">
            <h2 className="muni-card-title">Reports</h2>
            <p>Analytics coming soon...</p>
          </div>
        )}

      </main>
    </div>
  );
}

export default Municipality;