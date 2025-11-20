// src/pages/User.jsx
import React, { useState } from "react";
import useCsvData from "../hooks/useCsvData";
import Tables from "../components/Tables";
import Awareness from "../components/awareness.jsx";
import axios from "axios";
import "./user.css";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

const sections = [
  { key: "home", label: "Home" },
  { key: "nearby-dumps", label: "Nearby Dumps" },
  { key: "map", label: "Map" },
  { key: "report-issue", label: "Report Issue" },
  { key: "awareness", label: "Awareness" },
];

function RecentCollections() {
  const { data: collections, loading } = useCsvData("wastecollection.csv");
  const { data: dumps } = useCsvData("dumplocation.csv");

  if (loading) return <p>Loading recent collections…</p>;

  // join last 5 collections with dump name
  const joined = collections
    .slice(-5)
    .reverse()
    .map((c) => {
      const dump = dumps.find((d) => d.dump_location_id == c.dump_location_id);
      return {
        ...c,
        dump_name: dump ? dump.location_name : "Unknown Dump",
      };
    });

  return (
    <div className="home-card">
      <h3>Recent Waste Collections Near You</h3>
      {joined.map((item) => (
        <div key={item.collection_id} className="home-item">
          <strong>{item.dump_name}</strong>
          <br />
          <span>
            Collected: {item.waste_quantity_kg} kg
            <br />
            Date: {item.date}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function User() {
  const { data: dumps, loading } = useCsvData("dumplocation.csv");

  // report issue
  const [issue, setIssue] = useState("");
  const [message, setMessage] = useState("");
  const [currentSection, setCurrentSection] = useState(sections[0].key);

  async function handleSubmitIssue() {
    if (!issue.trim()) {
      setMessage("Please write an issue before submitting.");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/report-issue", {
        issue_text: issue,
      });
      setMessage("Issue submitted successfully!");
      setIssue("");
    } catch (error) {
      console.error(error);
      setMessage("Error submitting issue.");
    }
  }

  if (loading) return <p>Loading...</p>;

  const defaultCenter =
    dumps.length > 0
      ? {
          lat: Number(dumps[0].latitude) || 30.345,
          lng: Number(dumps[0].longitude) || 78.029,
        }
      : { lat: 30.345, lng: 78.029 };

  return (
    <div className="user-page">
      {/* Header Navigation */}
      <header className="user-header">
        <nav className="user-nav">
          {sections.map((section) => (
            <button
              key={section.key}
              className={`user-btn ${
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
      <main className="user-main">
        {/* HOME */}
        {currentSection === "home" && (
          <section className="user-home">
            <h2 className="user-title">Welcome Citizen 👋</h2>
            <p className="user-subtitle">
              Here’s what’s happening around your area today.
            </p>

            {/* Nearby dumps preview */}
            <div className="home-card">
              <h3>Nearby Dump Locations</h3>
              {dumps.slice(0, 3).map((dump) => (
                <div key={dump.dump_location_id} className="home-item">
                  <strong>{dump.location_name}</strong>
                  <br />
                  <span>{dump.address}</span>
                </div>
              ))}
            </div>

            {/* Recent collections */}
            <RecentCollections />
          </section>
        )}

        {/* NEARBY DUMPS – read only */}
        {currentSection === "nearby-dumps" && (
          <Tables
            title="Nearby Dumps"
            data={dumps}
            columns={[
              { label: "Location Name", accessor: "location_name" },
              { label: "Address", accessor: "address" },
              { label: "Latitude", accessor: "latitude" },
              { label: "Longitude", accessor: "longitude" },
            ]}
            filterOptions={null}
            onAdd={null}
            onEdit={null}
            onDelete={null}
          />
        )}

        {/* MAP – markers from dumplocation.csv */}
        {currentSection === "map" && (
          <div className="muni-card">
            <h2 className="muni-card-title">Nearby Dumps Map</h2>
            <APIProvider apiKey="AIzaSyCgRe6EhS4nAqM0LKQFHUiG2w9d1p-cQ7A">
              <Map
                id="user-map"
                defaultCenter={defaultCenter}
                defaultZoom={11}
                className="map-container"
              >
                {dumps.map((d) => {
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

        {/* REPORT ISSUE */}
        {currentSection === "report-issue" && (
          <section className="user-report">
            <h2 className="user-title">Report an Issue</h2>
            <p>Describe any waste management issue in your area.</p>

            <textarea
              placeholder="Write your issue here..."
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              className="report-box"
            ></textarea>

            <button className="submit-report-btn" onClick={handleSubmitIssue}>
              Submit Issue
            </button>

            {message && <p className="success-msg">{message}</p>}
          </section>
        )}

        {/* AWARENESS */}
        {currentSection === "awareness" && <Awareness />}
      </main>
    </div>
  );
}
