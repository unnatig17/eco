import React, { useState } from "react";
import "./awareness.css";

const awarenessData = [
  {
    id: 1,
    title: "Why Waste Segregation Matters",
    category: "Segregation",
    description: "Learn why dividing wet, dry, and hazardous waste is crucial.",
    video: "https://www.youtube.com/embed/0ZiD_Lb3Tm0"
  },
  {
    id: 2,
    title: "Basics of Composting at Home",
    category: "Composting",
    description: "Simple steps to start composting organic waste.",
    video: "https://www.youtube.com/embed/egyNJ7xPyoQ"
  },
  {
    id: 3,
    title: "How Recycling Actually Works",
    category: "Recycling",
    description: "A short explanation of the recycling process.",
    video: "https://www.youtube.com/embed/zO3jFKiqmHo"
  },
  {
    id: 4,
    title: "Health Risks of Open Dumping",
    category: "Health",
    description: "Understand the effects of unmanaged waste.",
    video: "https://www.youtube.com/embed/bssbqueTr3E"
  }
];


export default function Awareness() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = awarenessData.filter(item => {
    const matchesCategory =
      category === "All" || item.category === category;

    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="aware-section">
      <h2 className="aware-title">Awareness & Education</h2>

      {/* Search & Filter */}
      <div className="aware-controls">
        <input
          type="text"
          placeholder="Search topics..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="aware-search"
        />

        <select
          className="aware-filter"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Topics</option>
          <option value="Segregation">Segregation</option>
          <option value="Composting">Composting</option>
          <option value="Recycling">Recycling</option>
          <option value="Health">Health</option>
        </select>
      </div>

      {/* Content Cards */}
      <div className="aware-grid">
        {filtered.map((item) => (
          <div key={item.id} className="aware-card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>

            <iframe
              width="100%"
              height="180"
              src={item.video}
              title={item.title}
              style={{ borderRadius: "10px", border: "none" }}
            ></iframe>

            <span className="aware-tag">{item.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
