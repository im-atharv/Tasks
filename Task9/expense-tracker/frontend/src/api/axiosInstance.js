// src/api/axiosInstance.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true, // ✅ ensures cookies are sent
});

export default instance;
