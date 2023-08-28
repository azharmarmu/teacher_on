const Memory = require('../models/memory');
const nodemailer = require('nodemailer');

// Logic for adding a new memory
exports.addMemory = async (req, res) => {
  try {
    const newMemory = new Memory(req.body);
    await newMemory.save();
    res.status(201).json({ message: 'Memory added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the memory' });
  }
};

// Logic for editing a memory
exports.editMemory = async (req, res) => {
  try {
    const updatedMemory = await Memory.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Memory updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the memory' });
  }
};

// Logic for listing memories
exports.listMemories = async (req, res) => {
  try {
    const memories = await Memory.find().sort({ eventDate: 1 });
    res.json(memories);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching memories' });
  }
};

// Logic for sending a daily email
exports.sendDailyEmail = async () => {
  try {
    const memoryToSend = await Memory.findOne({ sent: false }).sort({ eventDate: 1 });
    if (memoryToSend) {
      // Send the email using nodemailer
      const transporter = nodemailer.createTransport({
        // Configure your email service here
      });

      const mailOptions = {
        from: 'your@example.com',
        to: 'recipient@example.com',
        subject: memoryToSend.title,
        text: memoryToSend.description,
      };

      await transporter.sendMail(mailOptions);

      // Update the memory as sent
      memoryToSend.sent = true;
      await memoryToSend.save();
    }
  } catch (error) {
    console.error('An error occurred while sending the daily email:', error);
  }
};
