import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import BotManager from './bot.handler';
import { port } from './config';

export class BotSockets{
    sections: Map<string, BotManager>;
    io: Server;
    server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
    constructor(){
        this.sections = new Map()
        let init = initializeIO(port)
        this.io = init.io
        this.server = init.server
        createhandler(this)
    }
    /** @returns null if section is null */
    getSection(username: string){
        if (!this.sections.has(username)) {
            const newSection = new BotManager(username, this.io);
            this.sections.set(username,newSection);
        }
        return this.sections.get(username)!
    }
}

function initializeIO(port: number){
    const app = express();
    const server = http.createServer(app);
    const io = new Server(server)
    server.listen(port, ()=>{
        console.log(`Socket is running on http://localhost:${port}`);
    })
    return {io: io, server: server};
}
const asyncFunc = (async ()=>{}).constructor
function createhandler(sockets: BotSockets){
    const io = sockets.io;
    io.on('connection' , socket=>{
        //@ts-ignore
        let name: string = socket.handshake.query.name
        socket.join(name)
        socket.emit("connection")
        socket.on("disconnect", ()=>{
            console.log(name+" listener is disconnected")
        })        
        console.log(name+" listener is connected ("+io.listenerCount("disconnect")+")") 

        socket.on("get-data", (attribute: (keyof BotManager)[], callback)=>{
            const result:any[] = []
            attribute.forEach(attr => {
                result.push(sockets.getSection(name)[attr])
            });
            if (callback!=null) callback(result)
            else console.log(`Cant not get ${attribute} because callback not found ${callback}}`)
        })
        socket.on("execute", async (method: keyof BotManager, arg: any[], callback)=>{
            const s = sockets.getSection(name)
            const m = s[method]
            if (typeof m != 'function') return
            if (m instanceof asyncFunc)
            callback(await Reflect.apply(m, s, arg))
            else
            callback(Reflect.apply(m, s, arg))
        })
    })
}


