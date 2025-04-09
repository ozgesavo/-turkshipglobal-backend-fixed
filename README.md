# TurkShipGlobal Backend Deployment

This directory contains the backend code for the TurkShipGlobal dropshipping platform.

## Deployment Instructions for Render

1. Create a new Web Service on Render
2. Use the following settings:
   - Name: turkshipglobal-backend
   - Environment: Node
   - Build Command: npm install
   - Start Command: node server.js
3. Add the following environment variables:
   - NODE_ENV: production
   - PORT: 5000
   - JWT_SECRET: turkshipglobal_secret_key_2025 (use a secure random string in production)
   - JWT_EXPIRE: 30d
   - MONGODB_URI: (your MongoDB Atlas connection string)
   - SHOPIFY_API_KEY: (your Shopify API key)
   - SHOPIFY_API_SECRET: (your Shopify API secret)

## Important Notes

- Make sure to replace the placeholder values in the environment variables with your actual credentials
- The MongoDB connection string should be from your MongoDB Atlas account
- The backend will be accessible at https://turkshipglobal-backend.onrender.com
