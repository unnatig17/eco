import { useEffect, useState } from "react";
import axios from "axios";

export default function useCsvData(endpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/csv?file=${endpoint}`)
      .then(res => setData(res.data))
      .catch(err => console.error("Error:", err))
      .finally(() => setLoading(false));
  }, [endpoint]);

  return { data, loading };
}
