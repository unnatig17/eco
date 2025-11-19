import { useEffect, useState } from "react";
import AreaList from "../components/Area/AreaForm"
import AreaForm from "../components/Area/AreaForm";
import { getAreas, createArea, updateArea, deleteArea } from "../services/areaService";

export default function AreaPage() {
  const [areas, setAreas] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => {
    getAreas().then(res => setAreas(res.data));
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = (data) => {
    createArea(data).then(load);
    setShowForm(false);
  };

  const handleUpdate = (data) => {
    updateArea(editing.id, data).then(load);
    setEditing(null);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    deleteArea(id).then(load);
  };

  return (
    <div>
      <h2>Area Management</h2>

      <button onClick={() => {
        setShowForm(true);
        setEditing(null);
      }}>
        + Add New Area
      </button>

      {showForm && (
        <AreaForm
          initialData={editing}
          onSubmit={editing ? handleUpdate : handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}

      <AreaList
        data={areas}
        onEdit={(area) => {
          setEditing(area);
          setShowForm(true);
        }}
        onDelete={handleDelete}
      />
    </div>
  );
}
