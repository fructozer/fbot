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

    setHost(host: string){
        this.host = host
    }
    getHost(){
        return this.host
    }
    setPort(port: number){
        this.port = port
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
        if (!this.isOnline) return {x:0,y:0,z:0}
        const p = this.bot?.entity.position;
        return {x:p?.x, y:p?.y, z:p?.z}
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
        let target: mineflayer.Bot
        try {
         target = this.bot = mineflayer.createBot({
            username: this.username,
            host: this.host,
            port: this.port
        })
        } catch (e) {return false}
        createMidware(this)
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

    end(){
        if (this.isOnline) this.bot?.end()
    }

    goto(x: number, y: number, z: number){
        if (!this.isOnline) return new Promise((e)=>{});
        return this.bot?.pathfinder.goto(new pf.goals.GoalBlock(x,y,z))
    }
    
    chat(message: string){
        if (!this.isOnline) return;
        this.bot?.chat(message);
    }

    async tabComplete(message: string){
        return await this.bot?.tabComplete(message)
    }

}

function createMidware(manager: BotManager){
    const bot  = manager.bot
    const io   = manager.io
    const name = manager.username
    pass(manager, "login")
    pass(manager, "end")
    pass(manager, "move", manager.location)

    bot?.on('message', (json: ChatMessage, position)=>{
        io.to(name).emit('message', json.toString(), position, json.toHTML())
    })
}
import type { BotEvents } from "mineflayer"
import type { ChatMessage } from "prismarine-chat"
function pass(manager:BotManager, event: keyof BotEvents, ...data:any){
    manager.bot?.on(event, ()=>{manager.io.to(manager.bot!.username).emit(event, ...data)})
}