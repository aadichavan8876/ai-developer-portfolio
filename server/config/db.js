const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aditya_portfolio', {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB Warning] Could not connect to local MongoDB. Running with memory fallback cache. (${error.message})`);
  }
};

module.exports = connectDB;
