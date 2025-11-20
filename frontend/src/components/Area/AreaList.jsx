import "./areaList.css";

export default function AreaList({ data, onEdit, onDelete }) {
  return (
    <table className="area-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Created_at</th>
          <th>Updated_at</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {data.map((area) => (
          
          <tr key={area.id}>
            <td>{area.area_id}</td>
            <td>{area.name}</td>
            <td>{area.description}</td>
            <td>{area.created_at}</td>
            <td>{area.updated_at}</td>

            <td className="actions">
              <button className="edit-btn" onClick={() => onEdit(area)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => onDelete(area.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
