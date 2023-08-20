/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    if (event.url.pathname.startsWith('/custom')) {
      return new Response('custom response');
    }
    
    return await resolve(event);
  }

  /** @type {import('@sveltejs/kit').HandleFetch} */
export async function handleFetch({ event, request, fetch }) {
    return fetch(request);
}