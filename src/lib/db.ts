import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("Mongodb URI: " + MONGODB_URI);

if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in .env');
}

mongoose.connect(MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err: Error) => { console.error('MongoDB connection error:', err) });


export default mongoose.connection;