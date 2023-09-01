import { json, type RequestHandler } from '@sveltejs/kit';
import loader from 'prismarine-chat';

export const POST: RequestHandler = async ({request}) => {
    const {text, version} = await request.json()
    const result = loader(version).fromNotch(text).toHTML()
    return json({result: result})
};