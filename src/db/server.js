import mongoose from "mongoose";

const { DB_HOST } = process.env;

const connectDB = async () => {
  try {
    console.log("MONGODB_URI:", DB_HOST);
    await mongoose.connect(DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
