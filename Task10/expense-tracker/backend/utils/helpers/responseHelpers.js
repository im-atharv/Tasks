// utils/helpers/responseHelpers.js

export const sendSuccess = (res, data = {}, status = 200, headers = {}) => {
  sendResponse(res, { status, data, headers });
};

export const sendError = (res, error = "Something went wrong", status = 500, headers = {}) => {
  sendResponse(res, { status, error, headers });
};

const sendResponse = (res, { status = 200, data = null, error = null, headers = {} }) => {
  Object.entries(headers).forEach(([key, value]) => res.setHeader(key, value));

  const codeType = Math.floor(status / 100);

  switch (codeType) {
    case 1: return res.status(status).json({ info: data || "Informational response" });
    case 2: return Buffer.isBuffer(data)
      ? res.status(status).send(data)
      : res.status(status).json({ data });
    case 3: return res.redirect(status, typeof data === "string" ? data : "/");
    case 4: return res.status(status).json({ error: error || "Client error occurred" });
    case 5: return res.status(status).json({ error: error || "Internal server error" });
    default: return res.status(500).json({ error: "Unknown status code" });
  }
};
