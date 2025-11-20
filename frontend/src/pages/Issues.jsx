import React, { useEffect, useState } from "react";
import axios from "axios";
import Tables from "../components/Tables";

export default function IssuesPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/issues")
      .then((res) => setRows(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleAdd = async () => {
    const area_id = window.prompt("Area ID (optional):");
    const category = window.prompt("Category:") || "";
    const description = window.prompt("Description:");
    if (!description) return;

    const reported_by =
      window.prompt("Reported by (optional):") || "";
    const location = window.prompt("Location:") || "";

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/issues",
        {
          area_id: area_id ? Number(area_id) : null,
          category,
          description,
          reported_by,
          location,
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
    const category =
      window.prompt("Category:", row.category || "") ||
      row.category;
    const description =
      window.prompt("Description:", row.description) ||
      row.description;
    const status =
      window.prompt("Status:", row.status || "open") ||
      row.status;
    const reported_by =
      window.prompt("Reported by:", row.reported_by || "") ||
      row.reported_by;
    const location =
      window.prompt("Location:", row.location || "") ||
      row.location;

    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/issues/${row.issue_id}`,
        {
          area_id,
          category,
          description,
          status,
          reported_by,
          location,
        }
      );

      setRows((prev) =>
        prev.map((r) =>
          r.issue_id === row.issue_id ? res.data : r
        )
      );
    } catch (e) {
      console.error("Edit error:", e);
    }
  };

  const handleDelete = async (row) => {
    if (!window.confirm(`Delete issue ${row.issue_id}?`)) return;

    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/issues/${row.issue_id}`
      );
      setRows((prev) =>
        prev.filter((r) => r.issue_id !== row.issue_id)
      );
    } catch (e) {
      console.error("Delete error:", e);
    }
  };

  return (
    <div className="page-wrapper">
      <Tables
        title="Issues"
        columns={[
          { label: "ID", accessor: "issue_id" },
          { label: "Area ID", accessor: "area_id" },
          { label: "Category", accessor: "category" },
          { label: "Description", accessor: "description" },
          { label: "Status", accessor: "status" },
          { label: "Reported By", accessor: "reported_by" },
          { label: "Location", accessor: "location" },
        ]}
        data={rows}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
