export const sendSuccess = (res, buffer) => {
  return res.status(200).send(buffer);
};

export const handleError = (res, error) => {
  if (error.code === "VALIDATION_ERROR") {
    return res.status(400).json({ error: error.message || "Invalid data format" });
  }

  if (error.code === "GENERATION_ERROR") {
    return res.status(500).json({ error: "Failed to generate file" });
  }

  return res.status(500).json({ error: "An unknown error occurred" });
};