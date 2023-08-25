import { browser } from '$app/environment';
import type { PageLoad } from './$types';
import { BotManager } from './script/bots';
export const ssr = false;

export const load = (async () => { 
    if (!browser) return {}
    const manager = new BotManager()
    return manager.getData()
}) satisfies PageLoad;