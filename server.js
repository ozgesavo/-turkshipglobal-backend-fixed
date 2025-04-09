const express = require('express');
const cors = require('cors');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to TurkShipGlobal API' });
});

// API routes - Basitleştirilmiş
app.get('/api/suppliers', (req, res) => {
  res.json({ message: 'Suppliers API endpoint' });
});

app.get('/api/products', (req, res) => {
  res.json({ message: 'Products API endpoint' });
});

app.get('/api/dropshippers', (req, res) => {
  res.json({ message: 'Dropshippers API endpoint' });
});

app.get('/api/orders', (req, res) => {
  res.json({ message: 'Orders API endpoint' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
