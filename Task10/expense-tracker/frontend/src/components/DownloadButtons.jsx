import { downloadExportFile } from "../api/export";
import { FileDown, FileText } from "lucide-react";

const DownloadButtons = ({ summary, expenses }) => {
  const handleDownload = async (type) => {
    try {
      console.log("Downloading:", { summary, expenses });
      await downloadExportFile(type, { summary, expenses });
    } catch (err) {
      alert("Export failed");
      console.error("Export error:", err?.response?.data || err.message);
    }
  };
  
  return (
    <div className="mt-1 text-center space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">
        Download Your Reports
      </h2>

      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => handleDownload("pdf")}
          className="flex items-center gap-2 px-5 py-3 rounded-lg bg-red-600 text-white shadow hover:bg-red-700 transition-all duration-200"
        >
          <FileText size={18} />
          Download PDF
        </button>
        <button
          onClick={() => handleDownload("excel")}
          className="flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-600 text-white shadow hover:bg-blue-700 transition-all duration-200"
        >
          <FileDown size={18} />
          Download Excel
        </button>
      </div>
    </div>
  );
};

export default DownloadButtons;
