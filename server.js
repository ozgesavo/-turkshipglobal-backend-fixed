require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');

// Import routes
const supplierRoutes = require('./src/routes/supplierRoutes');
const productRoutes = require('./src/routes/productRoutes');
const dropshipperRoutes = require('./src/routes/dropshipperRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const inventoryRoutes = require('./src/routes/inventoryRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
const employeeRoutes = require('./src/routes/employeeRoutes');
const sourcingAgentRoutes = require('./src/routes/sourcingAgentRoutes');
const shippingRoutes = require('./src/routes/shippingRoutes');
const variationRoutes = require('./src/routes/variationRoutes');

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

// API routes
app.use('/api/suppliers', supplierRoutes);
app.use('/api/products', productRoutes);
app.use('/api/dropshippers', dropshipperRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/sourcing-agents', sourcingAgentRoutes);
app.use('/api/shipping', shippingRoutes);
app.use('/api/variations', variationRoutes);

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
