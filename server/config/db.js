// Modules
const mongoose = require("mongoose");

// Connect to MongoDB
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Db Connection Successful`);
  } catch (error) {
    console.log(`Error connecting to db`, error.message);
  }
};

module.exports = dbConnect;
