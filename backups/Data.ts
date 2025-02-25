import mongoose, { Schema, model, Document } from 'mongoose';

interface IData extends Document {
  id: number;
  name: string;
  value: number;
  createdAt: Date;
  updatedAt: Date;
}

const dataSchema: Schema = new Schema<IData>(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    value: { type: Number, required: true },
  },
  { timestamps: true }
);

const DataModel = mongoose.models.Data || model<IData>('Data', dataSchema);
export default DataModel;

export type LeanDataType = {
  id: number;
  name: string;
  value: number;
  createdAt: Date;
  updatedAt: Date;
  _id?: string; // Optional MongoDB _id
  __v?: number; // Optional version key
};