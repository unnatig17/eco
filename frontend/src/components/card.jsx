import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export default function Card({ to = "#", title, desc, icon = "🌿" }) {
  return (
    <Link to={to} className="card">
      <div className="card-header">
        <span className="card-icon">{icon}</span>
        <h3 className="card-title">{title}</h3>
      </div>
      <p className="card-desc">{desc}</p>
    </Link>
  );
}
