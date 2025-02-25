import type { PageServerLoad } from './$types';
import Data from '$lib/models/Data';
import { getDb } from '$lib/db';
import mongoose from 'mongoose';
import type { LeanDataType } from '$lib/models/Data';

interface DataItem {
  id: number;
  name: string;
  value: number;
  createdAt: Date;
  updatedAt: Date;
}

export const load: PageServerLoad = async () => {
  console.time('db-connect');
  await getDb(); // Ensure connection
  console.timeEnd('db-connect');

  console.log('Page load started, DB state:', mongoose.connection.readyState);
  try {
    console.time('query');
    const rawData = await Data.find()
      .limit(10) // Add limit to reduce load
      .lean() as LeanDataType[];
    console.timeEnd('query');

    const data: DataItem[] = rawData.map(item => ({
      id: item.id,
      name: item.name,
      value: item.value,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));
    console.log('Data fetched:', data.length, 'items');
    return { data };
  } catch (error) {
    console.error('Error loading data:', error);
    return { data: [], error: 'Failed to load data from MongoDB' };
  }
};