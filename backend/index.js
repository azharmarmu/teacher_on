const app = require('./app');
const mongoose = require('mongoose');
const cron = require('node-cron');
const { transporter } = require('./services/emailService');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/memories';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Start the Express server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Schedule daily emails
cron.schedule('0 0 * * *', async () => {
  // Implement email sending logic here
});
