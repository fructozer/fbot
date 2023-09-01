import { BotSockets } from '$lib/socket/socket.server';

const botSockets = new BotSockets();

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  return await resolve(event)
}
