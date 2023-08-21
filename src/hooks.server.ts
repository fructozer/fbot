import { BotSockets } from '$lib/socket/socket.server';
import { log } from '$lib/ultility';

const botSockets = new BotSockets()
log("Bot's socket manager was created.")




/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const manager = botSockets.getSection("funayd")!
  manager.host = "funayd-test.serv.nu"
  // manager.start()
  log("Call handler")
  return await resolve(event)
}

/** @type {import('@sveltejs/kit').HandleFetch} */
export async function handleFetch({ event, request, fetch }) {
  log("Call handler fetch")
  return fetch(request)
}