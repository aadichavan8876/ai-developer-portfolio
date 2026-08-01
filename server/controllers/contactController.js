const Contact = require('../models/Contact');
const { sendEmail } = require('../utils/emailService');

const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and message.' });
    }

    let contactDoc;
    try {
      contactDoc = await Contact.create({ name, email, subject, message });
    } catch (e) {
      contactDoc = { _id: Date.now().toString(), name, email, subject, message, createdAt: new Date() };
    }

    // Trigger email notification
    await sendEmail({ name, email, subject, message }).catch(err => console.log('Email notice:', err.message));

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your message has been received.',
      data: contactDoc
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (error) {
    res.json({ success: true, data: [] });
  }
};

module.exports = { submitContact, getContacts };
