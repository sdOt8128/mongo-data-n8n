import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import Data from '$lib/models/Data';
import db from '$lib/db';

console.log('API endpoint loaded');

interface CsvData {
    id: number;
    name: string;
    value: number;
}

export const POST: RequestHandler = async ({ request }) => {
    try {
      console.log('POST request received, connection state:', db.readyState);
      const csvData: CsvData[] = await request.json();
      console.log('Received data:', csvData);
      await Data.insertMany(csvData);
      return json({ message: 'Data saved successfully' }, { status: 201 });
    } catch (error) {
      console.error('Error saving data:', error);
      return json({ error: 'Failed to save data' }, { status: 500 });
    }
  };