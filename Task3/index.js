// server.js
const express = require('express');
const helmet = require('helmet');

const app = express();
const PORT = 3000;

// Apply Helmet middleware for security
app.use(helmet());

// Sample route
app.get('/', (req, res) => {
  res.send('Backend is running securely!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
