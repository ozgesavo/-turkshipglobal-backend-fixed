require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet({
  contentSecurityPolicy: false,
}));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/turkshipglobal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

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

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Server Error',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
