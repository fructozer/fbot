import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import BotManager from './bot.handler';
import { port } from './config';
import * as socketClient from "socket.io-client";

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

// check if port is available
function checkPort(port: number, callback: ()=>void){
    const server = http.createServer();
    server.listen(port);
    server.on('error', (err: any)=>{})
    server.on('listening', ()=>{
        server.close();
        callback();
    })
}


function initializeIO(port: number){
    const app = express();
    const server = http.createServer(app);
    const io = new Server(server)
    const temp = socketClient.io(`http://localhost:${port}`)
    const start = ()=>{
        server.listen(port, () => {
            console.log(`Socket is listening`);
            temp.disconnect()
        })
    }
    temp.on("connection", async ()=>{
        await temp.emitWithAck("shutdown")
        console.log("Socket shutdown")
        if (!server.listening) start()
    })
    checkPort(port, start)
    io.on("shutdown", (callback)=>{
        server.close()
        console.log("Socket is closed")
        callback()
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
            if (typeof m != 'function') {
                console.log(`Cant not execute ${method} because method not found ${m}`)
                return
            }
            if (m instanceof asyncFunc)
            callback(await Reflect.apply(m, s, arg))
            else
            callback(Reflect.apply(m, s, arg))
        })
    })
}


