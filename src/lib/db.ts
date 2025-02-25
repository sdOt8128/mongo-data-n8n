import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;

console.log('MONGODB_URI raw value:', JSON.stringify(process.env.MONGODB_URI));

if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in .env');
}

console.log('Mongodb URI (sanitized):', MONGODB_URI.replace(/:.*@/, ':****@'));

let cachedConnection: typeof mongoose | null = null;

export async function getDb() {
    if (cachedConnection && mongoose.connection.readyState === 1) {
      console.log('Reusing MongoDB connection, state:', mongoose.connection.readyState);
      return cachedConnection;
    }
  
    console.log('Connecting to MongoDB, state:', mongoose.connection.readyState);
    cachedConnection = await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, 
    });
    console.log('MongoDB connected, state:', mongoose.connection.readyState);
    return cachedConnection;
}

export default mongoose.connection;