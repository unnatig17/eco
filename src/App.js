// src/App.js
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Card from "./components/card";
import Button from "./components/button";
import { useEffect, useState } from "react";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <header className="p-4 bg-emerald-600 text-white text-xl">EcoTrack</header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/municipality" element={<Municipality />} />
          <Route path="/user" element={<User />} />
          <Route path="/farmer" element={<Farmer />} />
          <Route path="/facility" element={<Facility />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-eco">
      <header className="bg-emerald-600/95 backdrop-blur text-white sticky top-0 z-10 shadow">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-semibold tracking-wide">EcoTrack</div>
          <nav className="hidden sm:flex gap-4 text-emerald-50/90 text-sm">
            <a href="#" className="hover:text-white">Docs</a>
            <a href="#" className="hover:text-white">Support</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-slate-600">Quick access to areas, dumps, collections, and more.</p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <Card to="/municipality" title="Municipalities" desc="Manage areas and dump locations." />
          <Card to="/user" title="Collections" desc="Log daily waste collections." />
          <Card to="/farmer" title="Farmers" desc="Farmer directory and contacts." />
          <Card to="/facility" title="Facilities" desc="Processing facilities overview." />
          <Card to="/reports" title="Reports" desc="Trends and summaries." />
          <Card to="/settings" title="Settings" desc="Configure users and roles." />
        </section>
      </main>

      <footer className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-slate-500">
        Made with <span className="text-emerald-600">♥</span> for cleaner cities
      </footer>
    </div>
  );
}

<>
<Button onClick={() => alert("Saved!")}>Save</Button>
<Button type="submit">Submit</Button>
</>

// Placeholder components; fill with tables/forms next.
function Municipality() {
  const [areas, setAreas] = useState([]);
  const [areaId, setAreaId] = useState("");
  const [dumps, setDumps] = useState([]);

  useEffect(() => { fetch("http://localhost:4000/api/areas").then(r=>r.json()).then(setAreas); }, []);
  useEffect(() => {
    const url = areaId ? `http://localhost:4000/api/dumps?areaId=${areaId}` : "http://localhost:4000/api/dumps";
    fetch(url).then(r=>r.json()).then(setDumps);
  }, [areaId]);

  return (
    <div className="p-6 space-y-4">
      <div className="flex gap-3 items-center">
        <span className="text-sm">Area:</span>
        <select className="border p-2" value={areaId} onChange={e=>setAreaId(e.target.value)}>
          <option value="">All</option>
          {areas.map(a=> <option key={a.areaId} value={a.areaId}>{a.name}</option>)}
        </select>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {dumps.map(d=> <li key={d.dumpLocationId} className="p-4 border rounded">{d.locationName}</li>)}
      </ul>
    </div>
  );
}

function User() {
  const [dumps, setDumps] = useState([]);
  const [classes, setClasses] = useState([]);
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({ dumpLocationId:"", wasteClassificationId:"", collectionDate:"", quantityKg:"" });

  useEffect(() => {
    fetch("http://localhost:4000/api/dumps").then(r=>r.json()).then(setDumps);
    fetch("http://localhost:4000/api/classifications").then(r=>r.json()).then(setClasses);
    fetch("http://localhost:4000/api/collections").then(r=>r.json()).then(setRows);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:4000/api/collections", {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify(form),
    });
    const latest = await fetch("http://localhost:4000/api/collections").then(r=>r.json());
    setRows(latest);
    setForm({ dumpLocationId:"", wasteClassificationId:"", collectionDate:"", quantityKg:"" });
  };

  const onChange = (e)=> setForm(f=>({...f, [e.target.name]: e.target.value}));

  return (
    <div className="p-6 space-y-6">
      <form onSubmit={submit} className="grid gap-3 max-w-xl">
        <select name="dumpLocationId" value={form.dumpLocationId} onChange={onChange} className="border p-2" required>
          <option value="">Select Dump</option>
          {dumps.map(d=> <option key={d.dumpLocationId} value={d.dumpLocationId}>{d.locationName}</option>)}
        </select>
        <select name="wasteClassificationId" value={form.wasteClassificationId} onChange={onChange} className="border p-2" required>
          <option value="">Classification</option>
          {classes.map(c=> <option key={c.wasteClassificationId} value={c.wasteClassificationId}>{c.classificationName}</option>)}
        </select>
        <input type="date" name="collectionDate" value={form.collectionDate} onChange={onChange} className="border p-2" required />
        <input type="number" step="0.01" name="quantityKg" value={form.quantityKg} onChange={onChange} className="border p-2" placeholder="Quantity (kg)" required />
        <button className="bg-emerald-600 text-white px-3 py-2 rounded">Add Collection</button>
      </form>

      <table className="min-w-full border">
        <thead><tr className="bg-gray-100">
          <th className="p-2 border">Date</th>
          <th className="p-2 border">Dump</th>
          <th className="p-2 border">Area</th>
          <th className="p-2 border">Class</th>
          <th className="p-2 border">Qty (kg)</th>
        </tr></thead>
        <tbody>
          {rows.map(r=>(
            <tr key={r.wasteCollectionId}>
              <td className="p-2 border">{r.collectionDate?.slice(0,10)}</td>
              <td className="p-2 border">{r.locationName}</td>
              <td className="p-2 border">{r.areaName}</td>
              <td className="p-2 border">{r.classificationName}</td>
              <td className="p-2 border">{r.quantityKg}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Farmer = () => <div className="p-6">Farmer page</div>;
const Facility = () => <div className="p-6">Processing facility page</div>;
