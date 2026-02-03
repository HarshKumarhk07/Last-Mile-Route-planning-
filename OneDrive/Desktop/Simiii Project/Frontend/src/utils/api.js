import axios from "axios";

// Create an Axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
});

export default api;
