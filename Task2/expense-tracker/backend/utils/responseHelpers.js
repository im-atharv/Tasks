const sendSuccess = (res, buffer) => {
  return res.status(200).send(buffer);
};

const handleError = (res, error) => {
  //Client Side error invalid data sent
  if (error.code === "VALIDATION_ERROR") {
    return res.status(400).json({ error: error.message || "Invalid data format" });
  }

  //Server side error in file generation
  if (error.code === "GENERATION_ERROR") {
    return res.status(500).json({ error: "Failed to generate file" });
  }

  // default fallback
  return res.status(500).json({ error: "An unknown error occurred" });
};

module.exports = {
  sendSuccess,
  handleError,
};
