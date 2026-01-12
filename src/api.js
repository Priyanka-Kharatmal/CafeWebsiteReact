import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const getMenu = () => api.get("/menu");
export const placeOrder = (data) => api.post("/order", data);
export const makeReservations = (data) => api.post("/reservations", data);

export default api;