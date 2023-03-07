const mongoose = require("mongoose");

const connectDB = async () => {
  try {
        await mongoose.connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("DB connect successfully");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = {connectDB}
