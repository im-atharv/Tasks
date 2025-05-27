const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const exportRoutes = require("./routes/exportRoutes");
const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

//Health Check route
app.get("/", (req, res) => {
  res.send("Expense Tracker Backend is running");
});

app.use("/api/export", exportRoutes);

module.exports = app;
