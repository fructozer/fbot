import type { PageLoad } from './$types';
import { BotManager } from './script/bots';
import { CookieHandler } from './script/cookie.handler';
export const ssr = false;

export const load: PageLoad = (async ({data}) => {
    const cookie = new CookieHandler(data.cookie_id)
    const manager = new BotManager(cookie)
    return manager.getData()
}) satisfies PageLoad;