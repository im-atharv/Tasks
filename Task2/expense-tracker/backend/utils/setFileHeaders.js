// Function to set appropriate response headers for file downloads
const setFileHeaders = (res, type, filename) => {
  // Define headers for each supported file type
  const headersMap = {
    pdf: {
      "Content-Type": "application/pdf", 
      "Content-Disposition": `attachment; filename="${filename}.pdf"`, // Forces download with specified filename
    },
    excel: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", 
      "Content-Disposition": `attachment; filename="${filename}.xlsx"`, // Forces download with specified filename
    },
  };

  // Retrieve the headers for the given file type
  const headers = headersMap[type];

  // If the type is invalid, throw an error
  if (!headers) throw new Error("Invalid file type for headers");

  // Set each header on the response object
  Object.entries(headers).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
};

// Export the function to be used in routes
module.exports = setFileHeaders;
