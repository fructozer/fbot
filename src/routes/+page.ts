import type { PageLoad } from './$types';
import ioClient from 'socket.io-client';

export const load = (async () => {
    const ENDPOINT = 'http://localhost:3000';
    // const io = ioClient(ENDPOINT, {query: {name: `funayd`}})
    // io.on("chat", (username, message, )=>{
    //     console.log(message)
    // })
    return {
        success: true
    };
}) satisfies PageLoad;