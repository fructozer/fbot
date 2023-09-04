import { initializeDatabase } from '$lib/socket/database';
import { BotSockets } from '$lib/socket/socket.server';
try {
  const botSockets = new BotSockets();
  initializeDatabase();
} catch (e) {}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  return await resolve(event)
}
