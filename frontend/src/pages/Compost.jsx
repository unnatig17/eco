import React, { useEffect, useState } from "react";
import axios from "axios";
import Tables from "../components/Tables";

export default function CompostPage() {
  const [rows, setRows] = useState([]);

  // LOAD
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/compost")
      .then((res) => setRows(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // CREATE
  const handleAdd = async () => {
    const area_id = window.prompt("Area ID (optional):");

    const compost_type = window.prompt("Compost Type:");
    if (!compost_type) return;

    const quantity_kg = window.prompt("Quantity (KG):") || "0";
    const price_per_kg = window.prompt("Price Per KG:") || "0";

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/compost", {
        area_id: area_id ? Number(area_id) : null,
        compost_type,
        quantity_kg: Number(quantity_kg),
        price_per_kg: Number(price_per_kg),
      });

      setRows((p) => [...p, res.data]);
    } catch (e) {
      console.error("Add error:", e);
    }
  };

  // UPDATE
  const handleEdit = async (row) => {
    const area_id = window.prompt("Area ID:", row.area_id) || row.area_id;
    const compost_type =
      window.prompt("Type:", row.compost_type) || row.compost_type;
    const quantity_kg =
      window.prompt("Quantity:", row.quantity_kg) || row.quantity_kg;
    const price_per_kg =
      window.prompt("Price:", row.price_per_kg) || row.price_per_kg;

    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/compost/${row.compost_id}`,
        {
          area_id,
          compost_type,
          quantity_kg,
          price_per_kg,
        }
      );

      setRows((prev) =>
        prev.map((r) => (r.compost_id === row.compost_id ? res.data : r))
      );
    } catch (e) {
      console.error("Edit error:", e);
    }
  };

  // DELETE
  const handleDelete = async (row) => {
    if (!window.confirm(`Delete compost entry ${row.compost_id}?`)) return;

    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/compost/${row.compost_id}`
      );
      setRows((prev) =>
        prev.filter((r) => r.compost_id !== row.compost_id)
      );
    } catch (e) {
      console.error("Delete error:", e);
    }
  };

  return (
    <div className="page-wrapper">
      <Tables
        title="Compost Availability"
        columns={[
          { label: "ID", accessor: "compost_id" },
          { label: "Area ID", accessor: "area_id" },
          { label: "Type", accessor: "compost_type" },
          { label: "Quantity (KG)", accessor: "quantity_kg" },
          { label: "Price/KG", accessor: "price_per_kg" },
        ]}
        data={rows}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
