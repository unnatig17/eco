import React, { useEffect, useState } from "react";
import axios from "axios";
import Tables from "../components/Tables";

export default function Area() {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/areas")
      .then((res) => setAreas(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Tables
      title="Areas"
      data={areas}
      columns={[
        { label: "Area ID", accessor: "area_id" },
        { label: "Name", accessor: "name" },
        { label: "Description", accessor: "description" }
      ]}
    />
  );
}
