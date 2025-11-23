require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const ratingsRoutes = require('./src/routes/ratings.routes');

const app = express();
app.use(express.json());

// Routes
app.use(ratingsRoutes);

const PORT = process.env.PORT || 3002;

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Gamification Service running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });
