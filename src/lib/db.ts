import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in .env');
}

console.log("Mongodb URI: " + MONGODB_URI);

let cachedConnection: typeof mongoose | null = null;

export async function getDb() {
    if (cachedConnection && mongoose.connection.readyState === 1) {
      console.log('Reusing MongoDB connection, state:', mongoose.connection.readyState);
      return cachedConnection;
    }
  
    console.log('Connecting to MongoDB, state:', mongoose.connection.readyState);
    cachedConnection = await mongoose.connect(MONGODB_URI, {
      // Optional: Tweak for serverless
      bufferCommands: false, // Avoid buffering if disconnected
      serverSelectionTimeoutMS: 5000, // Fail fast if no server
    });
    console.log('MongoDB connected, state:', mongoose.connection.readyState);
    return cachedConnection;
}

export default mongoose.connection;