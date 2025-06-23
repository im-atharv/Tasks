import axios from "./axiosInstance";

// Download export file (PDF or Excel)
export const downloadExportFile = async (type, payload) => {
  const res = await axios.post(`/export?type=${type}`, payload, {
    responseType: "blob", // Ensure file blob is returned
  });

  const blob = new Blob([res.data], { type: res.headers["content-type"] });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = `expenses_export.${type === "pdf" ? "pdf" : "xlsx"}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};
