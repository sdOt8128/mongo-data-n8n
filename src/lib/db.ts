import mongoose from "mongoose";
// import 'dotenv/config';


const MONGODB_URI: string = "mongodb+srv://seanrogers:x7KEpVS9Bmq4s8wr@cluster0.ipnjx.mongodb.net/n8n?retryWrites=true&w=majority&appName=Cluster0";
console.log("Mongodb URI: " + MONGODB_URI);
//process.env.MONGODB_URI || 'mongodb://localhost:27017/sveltekit-app';


if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in .env');
}

//if (!mongoose.connection.readyState) {
    mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err: Error) => { console.error('MongoDB connection error:', err) });


export default mongoose.connection;