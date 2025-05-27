const setFileHeaders = (res, type, filename) => {
  const headersMap = {
    pdf: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}.pdf"`,
    },
    excel: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${filename}.xlsx"`,
    },
  };

  const headers = headersMap[type];

  if (!headers) throw new Error("Invalid file type for headers");

  Object.entries(headers).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
};

export default setFileHeaders;