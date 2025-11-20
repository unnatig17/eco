import { useEffect, useState } from "react";
import "./areaForm.css";

export default function AreaForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState({ name: "", description: "" });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form
      className="area-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
    >
      <input
        name="name"
        placeholder="Area Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
      />

      <div className="form-actions">
        <button type="submit" className="save-btn">
          {initialData ? "Update" : "Create"}
        </button>

        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
