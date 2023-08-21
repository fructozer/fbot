import * as mineflayer from "mineflayer"
import * as pf from "mineflayer-pathfinder"
import type { Server } from "socket.io"
import { Vec3 } from "vec3"
import { events } from "./config"

export default class BotManager{
    bot: mineflayer.Bot|null
    host: string
    port: number
    username: string
    reject: string
    io: Server

    constructor(flayer:string, io: Server){
        this.username = flayer
        this.bot = null
        this.host = 'example.com'
        this.port = 25565
        this.io = io;
        this.reject = ''
    }

    get client(){
        if (this.bot==null) return null;
        return this.bot._client;
    }
    get socket(){
        if (this.client==null) return null;
        return this.client.socket;
    }
    get isOnline(){
        return this.socket!=null && this.socket.writable;
    }
    get location(){
        if (!this.isOnline) return new Vec3(0,0,0)
        return this.bot?.entity.position;
    }
    get health(){
        if (!this.isOnline) return 0;
        return this.bot?.health;
    }
    get food(){
        if (!this.isOnline) return 0;
        return this.bot?.food;
    }

    /** @returns {Promise<boolean>}*/
    async start(){
        let target = this.bot = mineflayer.createBot({
            username: this.username,
            host: this.host,
            port: this.port
        })
        for (const e of events) target.on(e, (...args: any): void=>{
            this.io.to(this.username).emit(e, ...args)
        })
        return new Promise(resolve=>{
            const success = async ()=>{
                target.loadPlugin(pf.pathfinder)
                target.off("end",failed)
                await this.bot?.waitForTicks(1)
                resolve(true)
            }
            const failed = (reason: string)=>{
                target.off("login",success)
                resolve(false)
            }
            target.once("login", success)
            target.once("end", failed)
        })
    }

    goto(x: number, y: number, z: number){
        if (!this.isOnline) return new Promise((e)=>{});
        return this.bot?.pathfinder.goto(new pf.goals.GoalBlock(x,y,z))
    }
    
    chat(message: string){
        if (!this.isOnline) return;
        this.bot?.chat(message);
    }

}