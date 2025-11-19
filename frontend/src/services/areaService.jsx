import axios from "axios";

const API = "http://127.0.0.1:8000/api/areas";

export const getAreas = () => axios.get(API);
export const createArea = (data) => axios.post(API, data);
export const updateArea = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteArea = (id) => axios.delete(`${API}/${id}`);
