import type { PageServerLoad } from './$types';
import Data from '$lib/models/Data';
import type { LeanDataType } from '$lib/models/Data';
import db from '$lib/db';


interface DataItem {
  id: number;
  name: string;
  value: number;
  createdAt: Date;
  updatedAt: Date;
}

export const load: PageServerLoad = async () => {
    console.log('Page load started, DB state:', db.readyState);
    try {
      const rawData = await Data.find().lean() as unknown as LeanDataType[];
      const data: DataItem[] = rawData.map(item => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      }));
      console.log('Data fetched:', data);
      return { data };
    } catch (error) {
      console.error('Error loading data:', error);
      return { data: [], error: 'Failed to load data from MongoDB' };
    }
  };