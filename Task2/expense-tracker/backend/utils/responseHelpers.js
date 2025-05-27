// Utility for setting headers and sending responses

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

const sendSuccess = (res, buffer) => {
    return res.status(200).send(buffer);
};

const handleError = (res, error) => {
    if (error.code === "VALIDATION_ERROR") {
        return res.status(400).json({ error: error.message || "Invalid data format" });
    }

    if (error.code === "GENERATION_ERROR") {
        return res.status(500).json({ error: "Failed to generate file" });
    }

    // default fallback
    return res.status(500).json({ error: "An unknown error occurred" });
};

module.exports = {
    setFileHeaders,
    sendSuccess,
    handleError,
};
