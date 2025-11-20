import React, { useState, useMemo } from "react";
import "./Tables.css";

function Tables({
  title,
  columns,
  data,
  filterOptions = null,   // [{label:"Area 1", value:"1"}, ...]
  filterLabel = "Filter",
  onAdd = null            // Optional "+ Add" button callback
}) {

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(30);  // Default 20,30,45,60
  const [page, setPage] = useState(1);

  // ---------------- FILTER + SEARCH ----------------
  const filteredData = useMemo(() => {
    let temp = data;

    // Filter
    if (filter !== "all") {
      temp = temp.filter(row =>
        Object.values(row).some(v => String(v).toLowerCase() === String(filter).toLowerCase())
      );
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      temp = temp.filter(row =>
        Object.values(row).some(v => String(v).toLowerCase().includes(q))
      );
    }

    return temp;
  }, [data, filter, search]);

  // ---------------- PAGINATION ----------------
  const totalPages = Math.max(1, Math.ceil(filteredData.length / entries));
  const currentPage = Math.min(page, totalPages);

  const startIndex = (currentPage - 1) * entries;
  const endIndex = startIndex + entries;

  const pageData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="table-card">

      {/* ----- HEADER ----- */}
      <div className="table-card-header">
        <h2 className="table-title">{title}</h2>

        <div className="table-header-actions">

          {/* Filter dropdown (optional) */}
          {filterOptions && (
            <select
              className="filter-select"
              value={filter}
              onChange={e => {
                setFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="all">All {filterLabel}</option>
              {filterOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}

          {/* Add button (optional) */}
          {onAdd && (
            <button className="add-btn" onClick={onAdd}>
              + Add
            </button>
          )}
        </div>
      </div>

      {/* ----- TOP CONTROLS ----- */}
      <div className="table-controls">
        <div className="show-entries">
          <span>Show</span>
          <select
            value={entries}
            onChange={(e) => {
              setEntries(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value={30}>30</option>
            <option value={45}>45</option>
            <option value={60}>60</option>
          </select>
          <span>entries</span>
        </div>

        <div className="search-box">
          <span>Search:</span>
          <input
            className="search-input"
            type="text"
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search..."
          />
        </div>
      </div>

      {/* ----- TABLE ----- */}
      <table className="green-table">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.accessor}>{col.label}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {pageData.length === 0 && (
            <tr>
              <td colSpan={columns.length + 1} className="no-data">
                No entries found
              </td>
            </tr>
          )}

          {pageData.map((row, idx) => (
            <tr key={idx}>
              {columns.map(col => (
                <td key={col.accessor}>
                  {row[col.accessor]}
                </td>
              ))}

              <td className="actions-col">
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ----- FOOTER ----- */}
      <div className="table-footer">

        <div className="entries-info">
          {filteredData.length === 0
            ? "Showing 0 entries"
            : `Showing ${startIndex + 1} to ${Math.min(endIndex, filteredData.length)} of ${filteredData.length} entries`}
        </div>

        <div className="pagination">
          <button
            className="page-btn"
            disabled={currentPage === 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              className={`page-btn ${p === currentPage ? "active" : ""}`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}

          <button
            className="page-btn"
            disabled={currentPage === totalPages}
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
}

export default Tables;
