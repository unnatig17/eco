import { BrowserRouter, Routes, Route } from "react-router-dom";

import Municipality from "./components/municipality";
import Home from "./components/home";
import User from "./components/user";
import Farmer from "./components/farmer";
import Facility from "./components/facility";
import Settings from "./components/settings";
import Reports from "./components/reports";
import Login from "./components/login";
import Collections from "./components/collections";

import AreaPage from "./pages/Area";
import DumpLocationPage from "./pages/DumpLocations.jsx";
import ProcessingPage from "./pages/Processing";
import CompostPage from "./pages/Compost";
import IssuesPage from "./pages/Issues";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>

          {/* MAIN ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/municipality" element={<Municipality />} />
          <Route path="/user" element={<User />} />
          <Route path="/farmer" element={<Farmer />} />
          <Route path="/facility" element={<Facility />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/collections" element={<Collections />} />

          {/* NEW PROPER CRUD ROUTES */}
          <Route path="/areas" element={<AreaPage />} />
          <Route path="/dumps" element={<DumpLocationPage />} />
          <Route path="/processing" element={<ProcessingPage />} />
          <Route path="/compost" element={<CompostPage />} />
          <Route path="/issues" element={<IssuesPage />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}
