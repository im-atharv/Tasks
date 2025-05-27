// Import the Express app from the 'app.js' or 'app/index.js' file
const app = require("./app");

// Define the port number on which the server will run
const PORT = 4000;

// Start the server and listen on the specified port
// Once the server is running, log a message to the console
app.listen(PORT, () => {
  console.log(`✅ Expense Tracker Backend running on http://localhost:${PORT}`);
});
