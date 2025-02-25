import { json, text } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { getDb } from '$lib/db';
import mongoose from 'mongoose';
// @ts-ignore
import Papa from 'papaparse';

console.log('API endpoint loaded');

const Data = mongoose.model('Data', new mongoose.Schema({}, { strict:false }), 'data');

export const OPTIONS: RequestHandler = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};

export const POST: RequestHandler = async ({ request }) => {
  await getDb();
  console.log('API endpoint loaded, connection state:', mongoose.connection.readyState);

  try {
    const contentType = request.headers.get('Content-Type')?.toLowerCase() || '';
    let dataToInsert;

    if (contentType.includes('application/json')) {
      dataToInsert = await request.json();
      if (!Array.isArray(dataToInsert)) {
        throw new Error('JSON data must be an array');
      }
    } else if (contentType.includes('text/csv') || contentType.includes('application/octet-stream')) {
      const rawCsv = await request.text();
      dataToInsert = Papa.parse(rawCsv, {
        header: true, // Use first row as keys
        skipEmptyLines: true, // Ignore empty lines
        transform: (value, field) => {
          // Auto-convert numeric strings to numbers
          return isNaN(Number(value)) ? value : Number(value);
        },
      }).data;
      if (!Array.isArray(dataToInsert) || dataToInsert.length === 0) {
        throw new Error('Failed to parse CSV or empty data');
      }
    } else {
      throw new Error(`Unsupported Content-Type: ${contentType}`);
    }

    console.log('Received data:', dataToInsert);
    await Data.insertMany(dataToInsert);
    return json(
      { message: 'Data saved successfully' },
      {
        status: 201,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error saving data:', error);
    if (error instanceof Error) {
      return json(
        { error: error.message || 'Failed to save data' },
        {
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }
      );
    } else {
      console.error('Unexpected error:', error);
      return json(
        { error: 'An unexpected error occurred' },
        {
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }
      );
    }
  }
}