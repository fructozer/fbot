import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import { err } from "../ultility";
import BotManager from './bot.handler';
import { port } from './config';

export class BotSockets{
    sections: Map<string, BotManager>;
    io: Server;
    constructor(){
        this.sections = new Map()
        this.io = initializeIO(port)
        createhandler(this)
    }
    /** @returns null if section is null */
    getSection(username: string){
        if (username==null) {
            err("BotSockets.getSection(null) => Cant get section if username is null")
            return null
        }
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
    return io;
}
function createhandler(sockets: BotSockets){
    const io = sockets.io;
    io.on('connection' , socket=>{
        //@ts-ignore
        socket.join(socket.handshake.query.name)
    })
}


