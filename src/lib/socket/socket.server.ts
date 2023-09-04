import http from 'http';
import express from 'express';
import { Server, Socket } from 'socket.io';
import BotManager from './bot.handler';
import { port } from './config';
import * as socketClient from "socket.io-client";   
import { getData, setData } from './database';

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
    const io = new Server(server, {cookie: {
        name: "fbot-socket"
    }})
    const temp = socketClient.connect(`http://localhost:${port}`, {query:{name:"api-server-checker"}})
    const start = ()=>{
        server.listen(port, () => {
            temp.disconnect()
        })
    }
    temp.once("connection", async ()=>{
        await temp.emitWithAck("shutdown")
        if (!server.listening) start()
    })
    checkPort(port, start)
    return {io: io, server: server};
}
const asyncFunc = (async ()=>{}).constructor
function createhandler(sockets: BotSockets){
    const io = sockets.io;

    // bot handler
    io.on('connection', socket=>{
        //@ts-ignore
        let name: string = socket.handshake.query.name
        if (name == undefined || name == null) return
        if (name.startsWith('api-')) {
            api_handler(socket)
            return
        }
        socket.join(name)
        socket.emit("connection")
        // socket.on("disconnect", ()=>{console.log(name+" listener is disconnected")})        
        // console.log(name+" listener is connected") 

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

        socket.on("shutdown", async (callback)=>{
            sockets.server.close()
            callback()
        })
    }
    
    
    )
    // api handler
    function api_handler(socket: Socket){
        let name = socket.handshake.query.name
        if (name==undefined) return
        name = name.toString()
        if (!name.startsWith('api-')) return
        if (name == 'api-cookie') {
            let id = socket.handshake.query.id
            if (id == undefined) return
            socket.on("get-data", async (attr: string, callback)=>{
                // @ts-ignore
                const result: string =  await getData(id, attr)
                if (callback!=null) callback(result);
            })
            socket.on("set-data", async (attr: string, value: string)=>{
                console.log("set-data "+attr+" to "+value)
                // @ts-ignore
                setData(id, attr, value)
            })
        }
    }
}


