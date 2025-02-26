import type { PageServerLoad } from './$types';
import { getDb } from '$lib/db';
import mongoose from 'mongoose';
import Data from '$lib/models/Data';

export const load: PageServerLoad = async () => {
  console.time('db-connect');
  await getDb();
  console.timeEnd('db-connect');

  console.log('Page load started, DB state:', mongoose.connection.readyState);
  try {
    console.time('query');
    const rawData = await Data.find()
      .select('-_id -__v')
      .lean(); // Returns plain JS objects
    console.timeEnd('query');

    const data = rawData;

    console.log('Data fetched:', data.length, 'items');
    return { data };
  } catch (error) {
    console.error('Error loading data:', error);
    return { data: [], error: 'Failed to load data from MongoDB' };
  }
};