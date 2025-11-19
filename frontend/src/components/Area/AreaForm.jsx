import { useEffect, useState } from "react";

function AreaForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState({ name: "", description: "" });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form
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
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <button type="submit">{initialData ? "Update" : "Create"}</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default AreaForm;