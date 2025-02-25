import db from '$lib/db';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  console.log('Server hook running, DB state:', db.readyState);
  return await resolve(event);
};