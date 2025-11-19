export default function AreaList({ data, onEdit, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {data.map(area => (
          <tr key={area.id}>
            <td>{area.id}</td>
            <td>{area.name}</td>
            <td>{area.description}</td>
            <td>
              <button onClick={() => onEdit(area)}>Edit</button>
              <button onClick={() => onDelete(area.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
