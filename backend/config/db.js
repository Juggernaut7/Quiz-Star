const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  const connectWithRetry = async (retries = 5, delay = 5000) => {
    try {
      const conn = await mongoose.connect(uri, options);
      console.log(`🟢 MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
      console.error(`❌ MongoDB connection failed. Retries left: ${retries}. Error: ${err.message}`);
      if (retries > 0) {
        console.log(`🔄 Retrying in ${delay / 1000}s...`);
        setTimeout(() => connectWithRetry(retries - 1, delay), delay);
      } else {
        console.error('🚨 All retries exhausted. Exiting.');
        process.exit(1);
      }
    }
  };

  connectWithRetry();
};

module.exports = connectDB;
