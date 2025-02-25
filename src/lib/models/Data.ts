import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({}, { strict: false });
const Data = mongoose.models.Data || mongoose.model('Data', DataSchema, 'data');

export default Data;