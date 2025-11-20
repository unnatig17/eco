import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Municipality from "./components/municipality";
import Home from "./components/home";
import User from "./components/user";
import Farmer from "./components/farmer";
import Facility from "./components/facility";
import Settings from "./components/settings";
import Reports from "./components/reports";
import Login from "./components/login";
import Collections from "./components/collections";
import AreaPage from "./pages/AreaPage";
import AreaForm from "./components/Area/AreaForm";
import AreaList from "./components/Area/AreaList";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/municipality" element={<Municipality />} />
          <Route path="/user" element={<User />} />
          <Route path="/farmer" element={<Farmer />} />
          <Route path="/facility" element={<Facility />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/areas" element={<AreaPage />} />
          <Route path="/areas/new" element={<AreaForm onSubmit={() => {}} onCancel={() => {}} />} />
          <Route path="/areas/list" element={<AreaList data={[]} onEdit={() => {}} onDelete={() => {}} />} /> 

        </Routes>
      </div>
    </BrowserRouter>
  );
}

