import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import fs from "fs";

dotenv.config();

// Load JSON secara biasa
const employeeSeed = JSON.parse(fs.readFileSync("./seeds/employeeSeed.json", "utf-8"));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

const seedEmployees = async () => {
  try {
    await User.deleteMany({});
    console.log("Existing employees removed");

    const inserted = await User.insertMany(employeeSeed);
    console.log(`Inserted ${inserted.length} employees`);

    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

const main = async () => {
  await connectDB();
  await seedEmployees();
};

main();
