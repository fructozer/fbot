import { writable } from 'svelte/store';
import type { PageLoad } from './$types';
import ioClient from 'socket.io-client';

export const load = (async () => {
    const ENDPOINT = 'http://localhost:3000';
    
    
    return {
        success: true,
        x: writable(15),
        y: writable(41),
        z: writable(68)
    };
}) satisfies PageLoad;