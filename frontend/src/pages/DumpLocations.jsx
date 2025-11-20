import React, { useEffect, useState } from "react";
import axios from "axios";
import Tables from "../components/Tables";

export default function DumpLocationPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/dump-locations")
      .then((res) => setRows(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleAdd = async () => {
    const location_name = window.prompt("Enter Location Name:");
    if (!location_name) return;

    const area_id = window.prompt("Area ID (optional):");
    const address = window.prompt("Address:") || "";
    const latitude = window.prompt("Latitude:") || "";
    const longitude = window.prompt("Longitude:") || "";

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/dump-locations",
        {
          area_id: area_id ? Number(area_id) : null,
          location_name,
          address,
          latitude: latitude ? Number(latitude) : null,
          longitude: longitude ? Number(longitude) : null,
        }
      );

      setRows((prev) => [...prev, res.data]);
    } catch (e) {
      console.error("Add error:", e);
    }
  };

  const handleEdit = async (row) => {
    const area_id =
      window.prompt("Area ID:", row.area_id || "") || row.area_id;
    const location_name =
      window.prompt("Name:", row.location_name) ||
      row.location_name;
    const address =
      window.prompt("Address:", row.address || "") ||
      row.address;
    const latitude =
      window.prompt("Latitude:", row.latitude || "") ||
      row.latitude;
    const longitude =
      window.prompt("Longitude:", row.longitude || "") ||
      row.longitude;

    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/dump-locations/${row.dump_location_id}`,
        {
          area_id,
          location_name,
          address,
          latitude,
          longitude,
        }
      );

      setRows((prev) =>
        prev.map((r) =>
          r.dump_location_id === row.dump_location_id
            ? res.data
            : r
        )
      );
    } catch (e) {
      console.error("Edit error:", e);
    }
  };

  const handleDelete = async (row) => {
    if (!window.confirm(`Delete dump location ${row.dump_location_id}?`))
      return;

    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/dump-locations/${row.dump_location_id}`
      );
      setRows((prev) =>
        prev.filter(
          (r) => r.dump_location_id !== row.dump_location_id
        )
      );
    } catch (e) {
      console.error("Delete error:", e);
    }
  };

  return (
    <div className="page-wrapper">
      <Tables
        title="Dump Locations"
        columns={[
          { label: "ID", accessor: "dump_location_id" },
          { label: "Area ID", accessor: "area_id" },
          { label: "Name", accessor: "location_name" },
          { label: "Address", accessor: "address" },
          { label: "Latitude", accessor: "latitude" },
          { label: "Longitude", accessor: "longitude" },
        ]}
        data={rows}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
