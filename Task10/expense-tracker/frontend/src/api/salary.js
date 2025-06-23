import axios from "./axiosInstance";

// Get current user's salary
export const getSalary = async () => {
  const res = await axios.get("/salary");
  return res.data.data;
};

// Create or update salary
export const updateSalary = async (amount) => {
  const res = await axios.post("/salary", { amount });
  return res.data.data;
};
