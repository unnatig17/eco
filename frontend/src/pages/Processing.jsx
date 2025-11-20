import React, { useEffect, useState } from "react";
import axios from "axios";
import Tables from "../components/Tables";

export default function ProcessingPage() {
  const [rows, setRows] = useState([]);

  // LOAD
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/processing")
      .then((res) => setRows(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // CREATE
  const handleAdd = async () => {
    const waste_classification_id = window.prompt("Enter Waste Classification ID:");
    if (!waste_classification_id) return;

    const processing_method = window.prompt("Enter Method:") || "";
    if (!processing_method) return;

    const processing_description =
      window.prompt("Enter Description (optional):") || "";

    const cost = window.prompt("Enter Cost:") || "0";

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/processing", {
        waste_classification_id: Number(waste_classification_id),
        processing_method,
        processing_description,
        cost: Number(cost),
      });

      setRows((p) => [...p, res.data]);
    } catch (e) {
      console.error("Add error:", e);
    }
  };

  // UPDATE
  const handleEdit = async (row) => {
    const waste_classification_id =
      window.prompt("Waste Classification ID:", row.waste_classification_id) ||
      row.waste_classification_id;

    const processing_method =
      window.prompt("Method:", row.processing_method) ||
      row.processing_method;

    const processing_description =
      window.prompt("Description:", row.processing_description || "") ||
      row.processing_description;

    const cost = window.prompt("Cost:", row.cost) || row.cost;

    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/processing/${row.processing_id}`,
        {
          waste_classification_id: Number(waste_classification_id),
          processing_method,
          processing_description,
          cost: Number(cost),
        }
      );

      setRows((prev) =>
        prev.map((r) =>
          r.processing_id === row.processing_id ? res.data : r
        )
      );
    } catch (e) {
      console.error("Edit error:", e);
    }
  };

  // DELETE
  const handleDelete = async (row) => {
    if (!window.confirm(`Delete processing entry ${row.processing_id}?`)) return;

    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/processing/${row.processing_id}`
      );
      setRows((prev) =>
        prev.filter((r) => r.processing_id !== row.processing_id)
      );
    } catch (e) {
      console.error("Delete error:", e);
    }
  };

  return (
    <div className="page-wrapper">
      <Tables
        title="Processing"
        columns={[
          { label: "ID", accessor: "processing_id" },
          { label: "Waste Class ID", accessor: "waste_classification_id" },
          { label: "Method", accessor: "processing_method" },
          { label: "Description", accessor: "processing_description" },
          { label: "Cost", accessor: "cost" },
        ]}
        data={rows}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
