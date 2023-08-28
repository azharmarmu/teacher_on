const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const memoryController = require('./controllers/memoryController');
const memoryRoutes = require('./routes/memoryRoutes');

const app = express();

// Parse incoming JSON data
app.use(bodyParser.json());

// Set up database connection (replace placeholders with actual values)
mongoose.connect('mongodb://localhost:27017/memories_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Use memory routes
app.use('/api/memories', memoryRoutes);

// Schedule daily email sending at 8:00 AM
cron.schedule('0 8 * * *', memoryController.sendDailyEmail);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
