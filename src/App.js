import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Municipality from "./components/municipality";
import Home from "./components/home";
import User from "./components/user";
import Farmer from "./components/farmer";
import Facility from "./components/facility";
import Settings from "./components/settings";
import Reports from "./components/reports";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/municipality" element={<Municipality />} />
          <Route path="/user" element={<User />} />
          <Route path="/farmer" element={<Farmer />} />
          <Route path="/facility" element={<Facility />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/reports" element={<Reports />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

