import { BotSockets } from '$lib/socket/socket.server';
import { log } from '$lib/ultility';

const botSockets = new BotSockets();


/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  log("Call handler")
  return await resolve(event)
}
